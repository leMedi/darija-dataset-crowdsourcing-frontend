import React, { useState } from 'react';
import { Card, Row, Col } from 'antd';

import './styles.css';

const { Meta } = Card;
interface Tag {
  name: string;
  label: string;
  description: string;
  isSelected?: boolean;
}

type TagsObject = { [k: string]: Tag }

const tags: TagsObject = {
  'VERB': { name: 'VERB', label: 'Verb', description: 'خلاق, بان, سبّب, كينتاشر...'},
  'NOUN': { name: 'NOUN', label: 'Noun', description: 'السنة ، المنزل ، التكاليف ، الوقت ، أفريقيا'},
  'PRON': { name: 'PRON', label: 'Pronoun', description: 'هو, ' },
  'ADJ': { name: 'ADJ', label: 'Adjective', description: 'قوي, ساهل, كتر, ' },
  'ADV': { name: 'ADV', label: 'Adverb', description: '' },
  'ADP': { name: 'ADP', label: 'Adposition', description: '' },
  'CONJ': { name: 'CONJ', label: 'Conjunction', description: '' },
  'DET': { name: 'DET', label: 'Determiner', description: 'واحد" المرض", هاد' },
  'NUM': { name: 'NUM', label: 'Number', description: '188, ' },
  'PRT': { name: 'PRT', label: 'Particle', description: '' },
  'PUNCT': { name: 'PUNCT', label: 'Punctuation', description: '' },
  'OTR': { name: 'OTR', label: 'Other', description: '' },
}

interface OptionPropsType {
  tag: Tag,
  isSelected?: boolean;
  onClick: (name: string) => void;
}

const Option = ({tag, isSelected, onClick}: OptionPropsType) => (
  <Col key={tag.name} span={6}>
    <Card
      className={`word-class-option-card ${isSelected && 'selected'}`}
      style={{
        marginBottom: '10px',
        minHeight: '100px',
      }}
      hoverable
      onClick={() => onClick(tag.name)}
    >
      <Meta
        title={`${tag.name}: ${tag.label}`}
        description={tag.description}
      />
    </Card>
  </Col>
)


interface OptionsPropsType {
  onChange: (tagName: string) => void;
}
export default function Options({ onChange }: OptionsPropsType) {
  const [selectedTag, selectTag] = useState<string>();
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {Object.values(tags).map((tag: Tag) =>
        <Option
          key={tag.name}
          tag={tag}
          isSelected={selectedTag === tag.name}
          onClick={(tagName: string) => {
            selectTag(tagName);
            onChange(tagName);
          }} />
        )}
      </Row>
    </div>
  );
}