import {$WordState, IWord, IPosTag, Word} from '../../models/Word';
import {db} from '../../services/firebase';
import {firestore} from 'firebase';
import { addMinutesToDate } from '../../utils/date';

type IFireStoreDocumentRef = firestore.DocumentReference<firestore.DocumentData>;

const getActivelyLeaseWord = async (userId: string) => {
  const Words = db.collection('words');
  return Words
    .where('lease.ownerId', '==', userId)
    .where('lease.expiresAt', '>=' , firestore.Timestamp.now())
    .limit(1)
    .get()
    .then(wordSnapshot => {
      if(wordSnapshot.empty)
        return null;
      return wordSnapshot.docs[0].data()
    })
}

const getUntaggedWord = (tagCountThreashold: number = 2) => {
  const Words = db.collection('words');
  return Words
    .where('lease.expiresAt', '<' , firestore.Timestamp.now())
    .limit(1)
    .get()
    .then(querySnapshot => {
      if(querySnapshot.empty)
        return null;
      return querySnapshot.docs.find(doc => doc.data().tagsCount <= tagCountThreashold)
    })
}

const leaseWord = (userId: string, wordRef: IFireStoreDocumentRef ) => {
  return wordRef
    .update({
      lease: {
        ownerId: userId,
        expiresAt: firestore.Timestamp.fromDate(addMinutesToDate(new Date(), 5))
      }
    });
}


const tagWord = (userId: string, wordId: string, tag: string) => {
  const wordRef = db.collection('words').doc(wordId);
  const posTag: IPosTag = {
    tag,
    taggerId: userId,
  }
  console.log('tagWord', 
    { userId, wordId, tag },
    posTag
  )
  return wordRef.update({
    posTags: firestore.FieldValue.arrayUnion(posTag),
    taggers: firestore.FieldValue.arrayUnion(userId),
    tagsCount: firestore.FieldValue.increment(1),
    lease: {
      ownerId: '',
      expiresAt: firestore.Timestamp.now()
    }
  })
}

type TagWordFxType = {
  userId: string;
  wordId: string;
  tag: string;
}
export const tagWordFx = Word.createEffect(
  async (payload: TagWordFxType) => {
    return tagWord(payload.userId, payload.wordId, payload.tag);
  }
);

export const getWordFx = Word.createEffect(
  async (userId: string) => {
    try {
      console.log('getWordFx', userId)
      const leasedWord = await getActivelyLeaseWord(userId);
      if(leasedWord) {
        console.log('found word with active lease', leasedWord)
        return leasedWord;
      }
      console.log('getWordFx', 'leasedWord', leasedWord)
      const wordSnapshot = await getUntaggedWord(2);
      if(wordSnapshot) {
        await leaseWord(userId, wordSnapshot.ref)
        return wordSnapshot.data()
      }
      return null;
    } catch (error) {
      console.error('getWordFx catch', error)
    }
  }
);

getWordFx.done.watch(({params, result}: any) => {
  getWordSuccessEvent(result);
  console.log('getWordFx', {params, result})
})

tagWordFx.done.watch(({params, result}: any) => {
  getWordFx(params.userId); 
})

const getWordSuccessEvent = Word.createEvent<IWord>();
$WordState.on(getWordSuccessEvent, (state, params) => ({...params}));