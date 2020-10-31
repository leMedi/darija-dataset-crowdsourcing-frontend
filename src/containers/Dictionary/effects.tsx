import {createEffect, createEvent, createStore} from 'effector';
import {db} from '../../services/firebase';
import { IDictionary } from './types';

const updateDictionary = createEvent<IDictionaryState>();
export const resetDictionaryState = createEvent<void>();

export type IDictionaryState = {
  words: IDictionary;
  total: number;
}

const defaultState: IDictionaryState = { words: [], total: 0 }
export const $DictionaryState = createStore<IDictionaryState>(defaultState)
  .on(updateDictionary, (state, {total, words}) => ({
    words: [...state.words, ...words],
    total
  }))
  .reset(resetDictionaryState);

type FetchWordsFxType = {
  startAtId?: string;
  limit?: number;
}
export const fetchWordsFx = createEffect(
  async ({startAtId, limit}: FetchWordsFxType) => {
    const wordsRef = db.collection('words');
    
    let WordsQuery;
    if(!startAtId) {
      WordsQuery = wordsRef
        .orderBy('tagsCount', 'desc')
        .limit(limit || 10)
        .get()
        .then((snapshot) => snapshot.docs.map((x) => x.data()))
        .catch(console.error)
    } else {
      const docRef = await wordsRef.doc(startAtId).get()
      WordsQuery = wordsRef
        .orderBy('tagsCount', 'desc')
        .startAfter(docRef)
        .limit(limit || 10)
        .get()
        .then((snapshot) => snapshot.docs.map((x) => x.data()))
    }
      
    const totalQuery = wordsRef.get().then((snapshot) => snapshot.size)

    return Promise.all([WordsQuery, totalQuery])
      .then(([words, total]) => ({ words, total }))
      .catch(console.error)
  }
);
fetchWordsFx.done.watch(({params, result}: any) => {
  updateDictionary(result)
});


