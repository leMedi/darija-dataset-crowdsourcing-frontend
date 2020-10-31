import {createDomain} from 'effector';
import {IWordState} from './types';

export const Word = createDomain('Word');

const defaultState: IWordState = null
export const $WordState = Word
  .createStore<IWordState>(defaultState)

export default Word;