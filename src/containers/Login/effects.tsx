import {$UserState, loggedOut, User, IUser} from '../../models/User';
import {login} from '../../services/firebase';
import * as firebase from "firebase";
import {LoginFormValues} from './types';

export const logInFx = User.createEffect(
  ({ email, password }: LoginFormValues) => login(email, password)
);

logInFx.done.watch(({params, result}) => {
  console.log('signInFx', {params, result});
})
const LoginSuccessEvent = User.createEvent<IUser>();
$UserState.on(LoginSuccessEvent, (state, params) => ({...params}))

firebase.auth().onAuthStateChanged((user: any) => {
  console.log('onAuthStateChanged', user)
  if(user) {
    const currentUser = {
      id: user.uid,
      email: user.email,
    }
    console.log('currentUser', currentUser)
    LoginSuccessEvent(currentUser);
  } else {
    loggedOut();
  }
});
