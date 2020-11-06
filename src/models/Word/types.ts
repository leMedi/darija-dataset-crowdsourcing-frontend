import { IUser } from "../User"
import firebase from "firebase"

export type IPosTag = {
  taggerId: string;
  tag: string;
}

export type ILease = {
  ownerId: string;
  owner?: IUser;
  exipresAt: firebase.firestore.Timestamp
}

export type IWord = {
  id: string;
  value: string;
  posTags: IPosTag[];
  lease: ILease | null;
}

export type IWordState = IWord | null