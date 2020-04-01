import React, { useEffect, useState } from 'react';

import { Paragraph } from '#root/components/Typography';

import calculateTimeLeft from './_calculateTimeLeft';
import { Wrapper } from './_styles';

interface Props {
  endDate: Date;
  onEnd: () => void;
}

const padNumber = (number: number) => String(number).padStart(2, '0');

const Countdown = ({ endDate, onEnd }: Props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endDate));

  useEffect(() => {
    if (!timeLeft) return;

    const timeOut = setTimeout(() => {
      const nextTimeLeft = calculateTimeLeft(endDate);
      setTimeLeft(nextTimeLeft);
      if (!nextTimeLeft) onEnd();
    }, 1000);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timeOut);
  });

  if (!timeLeft) {
    return <Wrapper>Time&apos;s up!</Wrapper>;
  }

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <Wrapper>
      <Paragraph>Be quick! Operation Toiletpaper will end in:</Paragraph>
      <span role="img" aria-label="hourglass">
        ⏳
      </span>
      {days}:{padNumber(hours)}:{padNumber(minutes)}:{padNumber(seconds)}
      <span role="img" aria-label="hourglass">
        ⌛️
      </span>
    </Wrapper>
  );
};

export default Countdown;
