import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import { createDmiiClient, type WordParadigm } from '../api/dmiiClient';

import {
  nounCaseOptions,
  nounLemmas,
  type Noun,
  type NounCase,
  type NounNumber,
} from '../data/nouns';

import ErrorBanner from '../components/ErrorBanner';
import ViewCardHeader from '../components/ViewCardHeader';

const CASE_TAGS: Record<NounCase, string> = {
  nominative: 'NF',
  accusative: 'ÞF',
  dative: 'ÞGF',
  genitive: 'EF',
};

const NUMBER_TAGS: Record<NounNumber, string> = {
  singular: 'ET',
  plural: 'FT',
};

const DEFINITE_ARTICLE_TAG = 'gr';


const getCacheKey = (lemma: string, number: NounNumber, definite: boolean) => `${lemma}:${number}:${definite ? 'def' : 'indef'}`;
const normalizeTag = (value: string) => value.toUpperCase();

const extractNounCases = (paradigm: WordParadigm, number: NounNumber, definite: boolean) => {

  const forms = paradigm.bmyndir ?? paradigm.beygingarmyndir ?? [];
  const numberTag = NUMBER_TAGS[number];
  const nounCases: Record<NounCase, string> = {
    nominative: '',
    accusative: '',
    dative: '',
    genitive: '',
  };

  // target tag example: ÞFETgr (accusative plural with definite article)
  let targetTagSuffix = `${numberTag}`;
  if (definite) {
    targetTagSuffix = targetTagSuffix.concat(DEFINITE_ARTICLE_TAG);
  }

  // iterate over each case and find the corresponding form in the paradigm based on the tags
  Object.entries(CASE_TAGS).forEach(([caseKey, caseTag]) => {
    const targetTag = caseTag + targetTagSuffix;

    const form = forms.find((form) => {
      return normalizeTag(form.g) === normalizeTag(targetTag);
    });

    if (form) {
      nounCases[caseKey as NounCase] = form.b;
    }
  });
    
  const hasAll = Object.values(nounCases).every((value) => value.length > 0);
  if (!hasAll) {
    return null;
  }

  return {
    lemma: paradigm.ord,
    answers: nounCases
  };
}

const normalize = (value: string) => value.trim().toLowerCase()

export default function NounCaseTrainer() {
  const cacheRef = useRef<Record<string, Noun>>({});

  const [currentIndex, setCurrentIndex] = useState(0);
  const [targetCase, setTargetCase] = useState<NounCase>('accusative');
  const [number, setNumber] = useState<NounNumber>('singular');
  const [includeArticle, setIncludeArticle] = useState(false);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentNoun, setCurrentNoun] = useState<Noun | null>(null);

  const currentLemma = nounLemmas[currentIndex] ?? null;

  const loadNoun = async (lemma: string, selectedNumber: NounNumber, selectedDefinite: boolean) => {
    const cacheKey = getCacheKey(lemma, selectedNumber, selectedDefinite);
    const cached = cacheRef.current[cacheKey];
    if (cached) {
      setLoadError(null);
      setCurrentNoun(cached);
      setAnswer('');
      setSubmitted(false);
      setShowAnswer(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    try {
      const client = createDmiiClient();
      const response = await client.searchByWordClass('no', lemma);
      const paradigm = response[0];

      if (!paradigm) {
        throw new Error('No noun data returned');
      }

      const noun = extractNounCases(paradigm, selectedNumber, selectedDefinite);
      if (!noun) {
        throw new Error('No usable noun cases found');
      }

      cacheRef.current[cacheKey] = noun;
      setCurrentNoun(noun);
      setAnswer('');
      setSubmitted(false);
      setShowAnswer(false);

    } catch (error: any) {
      setLoadError(error.message ?? 'DMII API unavailable for this noun. Please retry soon.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!currentLemma) {
      return;
    }

    loadNoun(currentLemma, number, includeArticle);
  }, [currentLemma, number, includeArticle]);

  const isCorrect = useMemo(() => {
    if (!submitted || !currentNoun) {
      return null;
    }

    const expected = normalize(currentNoun.answers[targetCase] ?? '');
    const received = normalize(answer);
    return expected.length > 0 && expected === received;
  }, [answer, currentNoun, submitted, targetCase]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  }

  const handleNextNoun = () => {
    if (nounLemmas.length <= 1) {
      return;
    }

    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * nounLemmas.length);
    }

    setCurrentIndex(nextIndex);
    setAnswer('');
    setSubmitted(false);
    setShowAnswer(false);
  }

  const handleCaseChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextCase = event.target.value as NounCase;
    setTargetCase(nextCase);
    setAnswer('');
    setSubmitted(false);
    setShowAnswer(false);
  }

  const handleToggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  }

  const handleNumberChange = (nextNumber: NounNumber) => {
    if (nextNumber === number) {
      return;
    }

    setNumber(nextNumber);
    setAnswer('');
    setSubmitted(false);
    setShowAnswer(false);
  }

  const handleArticleChange = (nextValue: boolean) => {
    if (nextValue === includeArticle) {
      return;
    }

    setIncludeArticle(nextValue);
    setAnswer('');
    setSubmitted(false);
    setShowAnswer(false);
  }

  return (
    <>
      <ErrorBanner error={loadError} onRetry={() => loadNoun(currentLemma!, number, includeArticle)} isRetrying={isLoading} />
      
      <ViewCardHeader
        headerText="Noun Cases"
        subHeaderText="Declension practice"
        subtitleText="Match the target case with the correct form."
      />

      <section className="verb">
        <span className="verb-label">Nominative form</span>
        <span className="verb-value">
          {currentNoun?.answers.nominative ?? currentLemma ?? '---'}
        </span>
      </section>

      <div className="filters">
        <label className="field compact">
          <span>Target case</span>
          <select value={targetCase} onChange={handleCaseChange}>
            {nounCaseOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="toggle-group" role="group" aria-label="Number">
          {(['singular', 'plural'] as NounNumber[]).map((option) => (
            <button
              key={option}
              type="button"
              className={
                option === number ? 'toggle-button active' : 'toggle-button'
              }
              onClick={() => handleNumberChange(option)}
              aria-pressed={option === number}
            >
              {option === 'singular' ? 'Singular' : 'Plural'}
            </button>
          ))}
        </div>
        <div
          className="toggle-group"
          role="group"
          aria-label="Definite article"
        >
          {[
            { label: 'Without article', value: false },
            { label: 'With article', value: true },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              className={
                option.value === includeArticle
                  ? 'toggle-button active'
                  : 'toggle-button'
              }
              onClick={() => handleArticleChange(option.value)}
              aria-pressed={option.value === includeArticle}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="grid">
          <label
            className={
              submitted && isCorrect !== null
                ? isCorrect
                  ? 'field correct'
                  : 'field incorrect'
                : 'field'
            }
          >
            <span>
              {nounCaseOptions.find((option) => option.key === targetCase)
                ?.label ?? 'Target case'}
            </span>
            <input
              type="text"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              placeholder="Type your answer"
              autoComplete="off"
              disabled={!currentNoun || isLoading}
            />
            {showAnswer && currentNoun ? (
              <span className="answer">
                Answer: {currentNoun.answers[targetCase]}
              </span>
            ) : null}
          </label>
        </div>

        <div className="actions">
          <button
            type="submit"
            className="primary"
            disabled={!currentNoun || isLoading}
          >
            Submit
          </button>
          <button type="button" className="ghost" onClick={handleToggleAnswer}>
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          <button type="button" className="ghost" onClick={handleNextNoun}>
            New noun
          </button>
        </div>
      </form>
    </>
  )
}
