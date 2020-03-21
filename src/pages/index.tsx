import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.location.href = '/products';
  }, []);

  return <div />;
};

export default Home;
