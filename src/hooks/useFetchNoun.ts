import { useState, useEffect } from 'react';

import { createDmiiClient, type WordParadigm } from '../api/dmiiClient';

import {
  type Noun,
  type NounCase,
  type NounNumber,
} from '../data/nouns';

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

export const useFetchNoun = (lemma: string, number: NounNumber, definite: boolean) => {

    const [currentNoun, setCurrentNoun] = useState<Noun | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const loadNoun = async (lemma: string, number: NounNumber, definite: boolean) => {

        setIsLoading(true);
        setLoadError(null);

        try {
            const client = createDmiiClient();
            const response = await client.searchByWordClass('no', lemma);
            const paradigm = response[0];

            if (!paradigm) {
                throw new Error('No noun data returned');
            }

            const noun = extractNounCases(paradigm, number, definite);
            if (!noun) {
                throw new Error('No usable noun cases found');
            }

            setCurrentNoun(noun);

        } catch (error: any) {
            setLoadError(error.message ?? 'DMII API unavailable for this noun. Please retry soon.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!lemma) {
            return;
        }

        loadNoun(lemma, number, definite);
    }, [lemma, number, definite]);

    return { data: currentNoun, loading: isLoading, error: loadError };
}