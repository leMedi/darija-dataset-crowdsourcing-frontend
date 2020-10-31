import React, { useEffect } from "react";
import { useStore } from "effector-react";
import { Layout } from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import firebase from "firebase";
import { db } from "../../services/firebase";
import wordsMock from "./words_mock";

import { fetchWordsFx, IDictionaryState, $DictionaryState, resetDictionaryState } from "./effects";

import "./styles.css";
import WordsTable from "./Table";

const WORDS_PER_PAGE = 10;

export default function DictionaryPage() {
  const {words, total} = useStore<IDictionaryState>($DictionaryState);
  const isFetchingWords = useStore(fetchWordsFx.pending);

  useEffect(() => {
    resetDictionaryState();
    fetchWordsFx({ limit: WORDS_PER_PAGE });
  }, []);

  console.log('words', words.map(w=> w.id));
  return (
    <Layout>
      <h1>Dictionary</h1>
      <div className="infinite-container">
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={(page) => {
            fetchWordsFx({
              startAtId: words[words.length - 1].id,
              limit: WORDS_PER_PAGE
            })
          }}
          hasMore={!isFetchingWords && words.length < total}
          threshold={20}
          useWindow={false}
        >
          <WordsTable loading={isFetchingWords} words={words} />
        </InfiniteScroll>
      </div>
      { adminButtons(fetchWordsFx) }
    </Layout>
  );
}

const adminButtons = (fetchWords: any) => (
  <div>
    <button
      onClick={() => {
        Object.values(wordsMock.words).forEach(async (obj) => {
          const res = await db
            .collection("words")
            .doc(obj.id)
            .set({
              ...obj,
              lastupdate: firebase.firestore.Timestamp.now(),
              lease: {
                ownerId: "medi",
                expiresAt: firebase.firestore.Timestamp.now(),
              },
              tagsCount: 1,
              taggers: ["medi"],
            });
          console.log("res", obj.id, res);
        });
        fetchWords();
      }}
    >
      Add Docs
    </button>

    <button
      onClick={() => {
        const w = Object.values(wordsMock.words)[0];
        db.collection("words")
          .doc(w.id)
          .set({
            ...w,
            lastupdate: firebase.firestore.Timestamp.now(),
            lease: {
              ownerId: "medi",
              expiresAt: firebase.firestore.Timestamp.now(),
            },
            tagsCount: 1,
          })
          .then(() => fetchWords());
      }}
    >
      Add Word
    </button>

    <button
      onClick={() => {
        db.collection("words")
          .get()
          .then((res) => {
            res.forEach((element) => {
              element.ref.delete();
            });
          })
          .then(() => fetchWords());
      }}
    >
      Clear Collection
    </button>
  </div>
);
