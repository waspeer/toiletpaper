import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
}

const TITLE_BASE = 'Operation Toiletpaper by Klangstof';

const PageHead = ({ title }: Props) => {
  return (
    <Head>
      <title>
        {title} | {TITLE_BASE}
      </title>
    </Head>
  );
};

export default PageHead;
