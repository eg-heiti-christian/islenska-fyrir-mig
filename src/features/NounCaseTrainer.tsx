import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type Ref,
} from 'react';

import { useFocus } from '../hooks/useFocus';

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
import { useFetchNoun } from '../hooks/useFetchNoun';


const normalize = (value: string) => value.trim().toLowerCase()

export default function NounCaseTrainer() {
  const [answerInputRef, setInputFocus] = useFocus();

  const [currentIndex, setCurrentIndex] = useState(Math.floor(Math.random() * nounLemmas.length));
  const [targetCase, setTargetCase] = useState<NounCase>('accusative');
  const [number, setNumber] = useState<NounNumber>('singular');
  const [includeArticle, setIncludeArticle] = useState(false);
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentLemma = nounLemmas[currentIndex] ?? null;

  const { data: currentNoun, loading: isLoading, error: loadError } = useFetchNoun(currentLemma!, number, includeArticle);

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

    setInputFocus();
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    // Check for 'Enter' key and 'Shift' key
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault(); 
      handleNextNoun();
    }
  };

  return (
    <>
      <ErrorBanner error={loadError} />
      
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

      <form className="form" onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
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
              autoFocus
              ref={answerInputRef}
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
