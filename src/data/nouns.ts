export type NounCase = 'nominative' | 'accusative' | 'dative' | 'genitive'

export type NounNumber = 'singular' | 'plural'

export type Noun = {
  lemma: string
  answers: Record<NounCase, string>
}

export const nounLemmas = [
  'bátur',
  'bók',
  'drengur',
  'fiskur',
  'fjall',
  'hundur',
  'hús',
  'kona',
  'maður',
  'stóll',
  'tala',
  'tré',
  'vinur',
]

export const nounCaseOptions: Array<{ key: NounCase; label: string }> = [
  { key: 'nominative', label: 'Nominative' },
  { key: 'accusative', label: 'Accusative' },
  { key: 'dative', label: 'Dative' },
  { key: 'genitive', label: 'Genitive' },
]
