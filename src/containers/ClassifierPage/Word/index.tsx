import React from 'react';
import { Card } from 'antd';

type WordProps = {
  word: string
}
export default function Word({word}: WordProps) {
  return (
    <Card style={{ width: '100%', borderTop: '5px solid #11369E'  }}>
      <h1
        style={{
          fontSize: '40px',
          margin: 0,
          textAlign: 'center'
        }}
      >{word}</h1>
    </Card>
  );
}