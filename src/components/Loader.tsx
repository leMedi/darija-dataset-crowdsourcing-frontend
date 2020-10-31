import React from 'react';
import { Spin } from 'antd';

type LoaderPropsType = {
  message?: string;
}

export default function Loader({message}: LoaderPropsType) {
  return (
    <div style={{ 
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     }}>
      <Spin tip={message || 'Loading...'} />
    </div>
  );
}