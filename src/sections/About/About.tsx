import React from 'react';

import { Paragraph, Title } from '#root/components/Typography';

import { Wrapper } from './_styles';

const About = () => {
  return (
    <Wrapper>
      <Title>ABOUT</Title>
      <Paragraph>
        Due to the coronavirus pandemic we weren’t able to finish our tour and missed 2/3rds of the
        planned shows and income that should have gone to our team and band. We made a lot of
        shirts, long sleeves, CD’s and LP’s to share with you during the tour, but right now most of
        the merch is still with us at home doing nothing.
      </Paragraph>
      <Paragraph>
        That’s why we launched operation toilet paper, so we can hopefully share it with you! The
        profit that we make from selling these items will be equally shared among the band members
        and team that were supposed to go on tour with us.
      </Paragraph>
      <Paragraph>
        <strong>
          You can pay what you want on all the items in the store starting at the discounted product
          price.
        </strong>
      </Paragraph>
      <Paragraph>
        Thank you for sticking with us during these weird times, and please stay safe and healthy!
      </Paragraph>
      <Paragraph style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
        X Klang
      </Paragraph>
    </Wrapper>
  );
};

export default About;
