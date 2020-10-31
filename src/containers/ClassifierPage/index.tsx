import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import { Layout, Row, Col } from 'antd';
import { $UserState } from '../../models/User';
import { $WordState, IWordState } from '../../models/Word';

import Loader from '../../components/Loader';
import './styles.css'

import Word from './Word'
import Options from './Options'
import { getWordFx, tagWordFx } from './effects'

export default function ClassifierPage() {
  const user = useStore($UserState);
  const word = useStore<IWordState>($WordState);
  const isFetchingWord = useStore(getWordFx.pending)
  const isTagingWord = useStore(tagWordFx.pending)

  useEffect(() => {
    if(user) {
      getWordFx(user.id)
    }
  }, [user])

  if(isFetchingWord || isTagingWord)
    return <Loader message={isFetchingWord ? 'Fetching Word ...' : 'Saving ...'} />

  if(!word)
    return (
      <Layout>
        <h1>No Word Selected</h1>
      </Layout>
    );

  return (
    <Layout>
      <h1>Word id: {word.id}</h1>
      <Row>
        <Col xs={24} lg={{span: 6, offset: 9}}>
          <Word word={word.value} />
        </Col>
      </Row>
      <div style={{marginTop: 50}}>
        <Options
          onChange={(tagName: string) => tagWordFx({userId: user ? user.id : '', wordId: word.id, tag: tagName})}
        />
      </div>
    </Layout>
  );
}