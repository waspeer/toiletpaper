import React from 'react';

import { Paragraph, Title } from '#root/components/Typography';

import { Wrapper } from './_styles';

const About = () => {
  return (
    <Wrapper>
      <Title>ABOUT</Title>
      <Paragraph>
        Due to de coronavirus that spread the world rapidly this month, we weren’t able to finish
        our tour and missed more then 2/3rds of the shows we’ve been looking forward to for a long
        time. Not only does this mean missing our quality time with you beautiful people, it also
        means a sudden drop in income for us and the team surrounding us.
      </Paragraph>
      <Paragraph>
        Everyone around us has been working really, really hard on our last record an we’re super
        proud of what we did together. Sadly, we’ll not be able to share our live show with you for
        a while, but we still have some cool stuff that should be enjoyed!
      </Paragraph>
      <Paragraph>
        That’s why we launched operation toiletpaper. It’s a special Klangstof merchandise store
        with a special discount on all our products to make the quarantine a little bit easier on
        all of us. The profit that we make from selling these items will be equally shared among the
        band members and team that were supposed to go on tour with us.
      </Paragraph>
      <Paragraph>
        <strong>
          You can pay what you want on all the items in the store starting at the discounted product
          price.
        </strong>
      </Paragraph>
      <Paragraph>
        Thank you for sticking with us during these weird times, and please stay safe and healthy :)
      </Paragraph>
      <Paragraph style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 'bold' }}>
        X Klang
      </Paragraph>
    </Wrapper>
  );
};

export default About;
