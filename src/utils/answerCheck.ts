import type { ConjugationKey, Verb } from '../data/verbs'

type ResultMap = Record<ConjugationKey, boolean>;
type AnswerMap = Record<ConjugationKey, string>;

const normalize = (value: string) => value.trim().toLowerCase();

export const checkAnswers = (answers: AnswerMap, verb: Verb): ResultMap => {
  const results = {} as ResultMap;

  (Object.keys(verb.answers) as ConjugationKey[]).forEach((key) => {
    const expected = normalize(verb.answers[key]);
    const received = normalize(answers[key]);
    results[key] = expected === received && received.length > 0;
  })

  return results
}
