import React from 'react';
import Head from 'next/head';

interface Props {
  description?: string;
  title: string;
}

const TITLE_BASE = 'Operation Toiletpaper by Klangstof';

const PageHead = ({ description, title }: Props) => {
  return (
    <Head>
      <meta
        name="description"
        content={
          description ||
          'A special Klangstof merchandise store with a special discount on all our products to make the quarantine a little bit easier on all of us.'
        }
      />
      <title>
        {title} | {TITLE_BASE}
      </title>
    </Head>
  );
};

export default PageHead;
