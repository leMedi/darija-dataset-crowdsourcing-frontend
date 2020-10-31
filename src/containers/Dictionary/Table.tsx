import React from "react";
import { Space, Table, Tag } from "antd";
import { IDictionary } from "./types";


const tag2Color = (tag: string) => {
  switch(tag) {
    case 'VERB': return 'magenta'
    case 'DET': return 'cyan'
    case 'NOUN': return 'green'
    case 'ADP': return 'gold'
    case 'OTR': return 'volcano'
    default: return 'red'
  }
}

const columns = [
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: (text: string) => <>{text}</>,
  },
  {
    title: 'POS Tags',
    key: 'posTags',
    dataIndex: 'posTags',
    render: (tags: any[]) => (
      tags.map(({ tag, taggerId }) => <Tag color={tag2Color(tag)} key={`${tag}-${taggerId}`}>
        {tag}
      </Tag>)
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => (
      <Space size="middle">
        {/* eslint-disable-next-line */}
        <a href="#">Edit {record.value}</a>
        {/* eslint-disable-next-line */}
        <a href="#">Delete</a>
      </Space>
    ),
  },
];

export type WordsTableProps = {
  words: IDictionary;
  loading: boolean;
}

export default function WordsTable({words, loading}: WordsTableProps) {
  return (<Table
    pagination={false}
    columns={columns}
    dataSource={words}
    loading={loading}
  />);
}
