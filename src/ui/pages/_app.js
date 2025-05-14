import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Flash Loans Arbitrage Bot</title>
        <meta name="description" content="Advanced arbitrage bot using flash loans" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
