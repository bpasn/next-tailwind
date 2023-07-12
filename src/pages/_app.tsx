'use client';
import LayOut from '@/components/Layout';
import "@/styles/global.css"
import { wrapper } from '@/utils/Store';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';


import React from 'react'

const MyApp: React.FunctionComponent<AppProps> = (props) => {
  const { Component, pageProps, ...appProps } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }
  return (
    <React.Suspense fallback={loading && <>Loading....</>}>
      <Head>
        <title>Amazona</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayOut>
        <Component {...pageProps} />
      </LayOut>
    </React.Suspense>
  )
}

export default wrapper.withRedux(MyApp)