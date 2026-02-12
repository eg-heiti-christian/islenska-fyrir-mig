export type WordClass =
  | 'afn'
  | 'ao'
  | 'fn'
  | 'fs'
  | 'gr'
  | 'lo'
  | 'nhm'
  | 'no'
  | 'pfn'
  | 'rt'
  | 'so'
  | 'st'
  | 'to'
  | 'uh'

export type Inflection = {
  g: string
  b: string
}

export type WordSummary = {
  ord: string
  guid: string
  ofl: string
  ofl_heiti: string
  kyn?: string
  hluti?: string
}

export type WordParadigm = {
  ord: string
  guid: string
  ofl: string
  ofl_heiti: string
  kyn?: string
  bmyndir?: Inflection[]
  beygingarmyndir?: Inflection[]
}

export type DmiiClientOptions = {
  baseUrl?: string
  fetchFn?: typeof fetch
}

const DEFAULT_BASE_URL = 'https://bin.arnastofnun.is/api'

const toJson = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`DMII request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}

export const createDmiiClient = (options: DmiiClientOptions = {}) => {
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL
  const fetchFn = options.fetchFn ?? fetch

  const get = async <T>(path: string): Promise<T> => {
    const url = `${baseUrl}${path}`
    return toJson<T>(await fetchFn(url))
  }

  return {
    searchByLemma: (lemma: string) =>
      get<Array<WordSummary | WordParadigm>>(`/ord/${encodeURIComponent(lemma)}`),
    getByGuid: (guid: string) =>
      get<WordParadigm[]>(`/ord/${encodeURIComponent(guid)}`),
    searchByWordClass: (wordClass: WordClass, lemma: string) =>
      get<WordParadigm[]>(
        `/ord/${encodeURIComponent(wordClass)}/${encodeURIComponent(lemma)}`,
      ),
    searchByInflection: (form: string) =>
      get<Array<WordSummary | WordParadigm>>(
        `/beygingarmynd/${encodeURIComponent(form)}`,
      ),
    searchByInflectionAndClass: (wordClass: WordClass, form: string) =>
      get<Array<WordSummary | WordParadigm>>(
        `/beygingarmynd/${encodeURIComponent(wordClass)}/${encodeURIComponent(form)}`,
      ),
  }
}

export type DmiiClient = ReturnType<typeof createDmiiClient>
