import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { createDmiiClient, type WordParadigm } from '../api/dmiiClient'

import ViewCardHeader from '../components/ViewCardHeader'

import {
  emptyAnswers,
  fields,
  type ConjugationKey,
  type Tense,
  type Verb,
  verbLemmas,
} from '../data/verbs'
import verbCache from '../data/verbCache.json'

import { readCacheFromStorage, writeCacheToStorage } from '../utils/localStorageCache'
import { checkAnswers } from '../utils/answerCheck'
import ErrorBanner from '../components/ErrorBanner'


const CACHE_STORAGE_KEY = 'dmiiVerbCache'

const TENSE_LABELS: Record<Tense, string> = {
  present: 'Present indicative',
  past: 'Past indicative',
}

const getCacheKey = (lemma: string, tense: Tense) => `${lemma}:${tense}`

const extractIndicative = (paradigm: WordParadigm, tense: Tense) => {

  const forms = paradigm.bmyndir ?? paradigm.beygingarmyndir ?? []
  const tenseTag = tense === 'present' ? 'NT' : 'ÞT'
  const answers: Record<ConjugationKey, string> = {
    '1P-ET': '',
    '2P-ET': '',
    '3P-ET': '',
    '1P-FT': '',
    '2P-FT': '',
    '3P-FT': '',
  }

  // g = grammatical info (e.g., "GM-FH-NT-1P-ET"), b = formatted string (e.g., "ber")
  // reference: https://bin.arnastofnun.is/DMII/LTdata/tagset/
  forms.forEach(({ g, b }) => {

    const parts = g.split('-');

    /**
     * GM - germynd (active voice)
     * FH - framsöguháttur (indicative mood)
     * NT/ÞT - nútíð/þátíð (present/past tense)
     */
    if (!parts.includes('GM') || !parts.includes('FH') || !parts.includes(tenseTag)) {
      return;
    }

    // find person perspective tags (e.g., "1P", "2P", "3P")
    const person = parts.find((part) => part.endsWith('P'));

    /**
     * ET - eintala (singular)
     * FT - fleirtala (plural)
     */
    const number = parts.find((part) => part === 'ET' || part === 'FT');

    if (!person || !number) {
      return;
    }

    answers[`${person}-${number}` as ConjugationKey] = b.trim();
  });

  const hasAll = Object.values(answers).every((value) => value.length > 0);
  if (!hasAll) {
    return null;
  }

  return {
    infinitive: paradigm.ord,
    answers
  };
}

export default function VerbConjugator() {

  const cacheRef = useRef<Record<string, Verb>>(
    (verbCache as Record<string, Verb>) ?? {},
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [tense, setTense] = useState<Tense>('present');
  const [answers, setAnswers] = useState(emptyAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentVerb, setCurrentVerb] = useState<Verb | null>(() => {
    const initialCache = verbCache as Record<string, Verb>;
    return initialCache[verbLemmas[currentIndex]] ?? null;
  });
  const currentLemma = verbLemmas[currentIndex] ?? null;

  const loadVerb = async (lemma: string, selectedTense: Tense) => {

    // look up word with tense in cache first to avoid unnecessary API calls
    const cacheKey = getCacheKey(lemma, selectedTense);
    const cached = cacheRef.current[cacheKey];
    if (cached) {
      setLoadError(null);
      setCurrentVerb(cached);
      setAnswers(emptyAnswers);
      setSubmitted(false);
      setShowAnswers(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    try {
      const client = createDmiiClient();
      const response = await client.searchByWordClass('so', lemma);
      let paradigm = response[0];

      if (!paradigm) {
        throw new Error('No verb data returned');
      }

      // if there are multiple paradigms returned, the results won't have bmyndir, so we need to fetch the full paradigm by guid to get the conjugation forms
      if (!paradigm.bmyndir) {
        paradigm = (await client.getByGuid(paradigm.guid))[0];
      }

      if (!paradigm || !paradigm.bmyndir) {
        throw new Error('No verb forms found in DMII response');
      }

      const verb = extractIndicative(paradigm, selectedTense);
      if (!verb) {
        throw new Error('No usable conjugation found');
      }

      cacheRef.current[cacheKey] = verb;
      writeCacheToStorage<Verb>(CACHE_STORAGE_KEY, cacheRef.current);
      setCurrentVerb(verb);
      setAnswers(emptyAnswers);
      setSubmitted(false);
      setShowAnswers(false);
      
    } catch (error: any) {
      setLoadError(error.message ?? "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // On initial load, populate cache from localStorage
    const stored = readCacheFromStorage<Verb>(CACHE_STORAGE_KEY);
    cacheRef.current = { ...cacheRef.current, ...stored };

  }, []);

  useEffect(() => {
    if (!currentLemma) {
      return;
    }

    loadVerb(currentLemma, tense);
  }, [currentLemma, tense]);

  const results = useMemo(() => {
    if (!submitted || !currentVerb) {
      return null;
    }

    return checkAnswers(answers, currentVerb);
  }, [answers, currentVerb, submitted]);

  const handleChange = (key: ConjugationKey, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    if (submitted) {
      setSubmitted(false);
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  }

  const handleToggleAnswers = () => {
    setShowAnswers((prev) => !prev);
  }

  const handleNextVerb = () => {
    if (verbLemmas.length <= 1) {
      return;
    }

    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * verbLemmas.length);
    }

    setCurrentIndex(nextIndex);
    setAnswers(emptyAnswers);
    setSubmitted(false);
    setShowAnswers(false);
  }

  const handleTenseChange = (nextTense: Tense) => {
    if (tense === nextTense) {
      return;
    }

    setTense(nextTense);
    setAnswers(emptyAnswers);
    setSubmitted(false);
    setShowAnswers(false);
  }

  return (
    <>
      <ErrorBanner error={loadError} onRetry={() => loadVerb(currentLemma!, tense)} isRetrying={isLoading} />

      <ViewCardHeader
        headerText="Verb Conjugator"
        subHeaderText="Icelandic practice"
        subtitleText={`${TENSE_LABELS[tense]} forms in singular and plural.`}
      />

      <div className="tense-toggle" role="group" aria-label="Tense">
        {(['present', 'past'] as Tense[]).map((option) => (
          <button
            key={option}
            type="button"
            className={
              option === tense ? 'tense-button active' : 'tense-button'
            }
            onClick={() => handleTenseChange(option)}
            aria-pressed={option === tense}
          >
            {TENSE_LABELS[option]}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="status">Loading verbs from DMII...</p>
      ) : null}

      <section className="verb">
        <span className="verb-label">Infinitive form</span>
        <span className="verb-value">
          {currentVerb?.infinitive ?? currentLemma ?? '---'}
        </span>
      </section>

      <form className="form" onSubmit={handleSubmit}>
        <div className="grid">
          {isLoading
            ? fields.map(({ key, label }) => (
              <div key={key} className="field skeleton">
                <span className="skeleton-label">{label}</span>
                <div className="skeleton-input" />
              </div>
            ))
            : fields.map(({ key, label }) => {
              const status = results ? results[key] : null
              const statusClass =
                submitted && status !== null
                  ? status
                    ? 'field correct'
                    : 'field incorrect'
                  : 'field'

              return (
                <label key={key} className={statusClass}>
                  <span>{label}</span>
                  <input
                    type="text"
                    value={answers[key]}
                    onChange={(event) => handleChange(key, event.target.value)}
                    placeholder="Type your answer"
                    autoComplete="off"
                    disabled={!currentVerb || isLoading}
                  />
                  {showAnswers && currentVerb ? (
                    <span className="answer">
                      Answer: {currentVerb.answers[key]}
                    </span>
                  ) : null}
                </label>
              )
            })}
        </div>

        <div className="actions">
          <button
            type="submit"
            className="primary"
            disabled={!currentVerb || isLoading}
          >
            Submit
          </button>

          <button type="button" className="ghost" onClick={handleToggleAnswers}>
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </button>

          <button type="button" className="ghost" onClick={handleNextVerb}>
            New verb
          </button>

        </div>
      </form>
    </>
  )
}
