import {createDomain} from 'effector'
import {IUserState} from './types';


const defaultState: IUserState | null = null

export const User = createDomain('User');

export const loggedOut = User.createEvent();

export const $UserState = User
  .createStore<IUserState>(defaultState)
  .reset(loggedOut)

export default User;