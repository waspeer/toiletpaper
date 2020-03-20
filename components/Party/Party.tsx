/* eslint-disable react/no-array-index-key */
import React from 'react';

import { Emoji, Wrapper } from './_styles';

interface Props {
  donation: number;
}

const MAX_PARTY = 500;

const SEQUENCE = ['💕', '🙌', '🥰', '💥', '🧻'];

const THRESHOLD = 5;

const Party = ({ donation }: Props) => {
  const amount = donation ? Math.floor(donation / THRESHOLD) : 0;

  const emojis = [...Array(amount > MAX_PARTY ? MAX_PARTY : amount)].map(
    (_, index) => SEQUENCE[index % SEQUENCE.length],
  );

  return (
    <Wrapper>
      {emojis.map((emoji, index) => (
        <Emoji key={`party-${index}`} role="img" aria-label="thanks">
          {emoji}
        </Emoji>
      ))}
    </Wrapper>
  );
};

export default Party;
