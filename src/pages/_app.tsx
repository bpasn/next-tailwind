'use client';
import LayOut from '@/components/Layout';
import "@/styles/global.css"
import { wrapper } from '@/utils/Store';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { SessionProvider, useSession } from 'next-auth/react';

import React from 'react'
import type { NextComponentType } from 'next/types';
import { Backdrop } from '@/components';
interface MyAppProp extends AppProps {
  Component: NextComponentType & { auth?: boolean };
}
const MyApp: React.FunctionComponent<MyAppProp> = (props) => {
  const { Component, pageProps: { session, ...pageProps }, ...appProps } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  })

  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false)
  })
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }
  return (
    <SessionProvider session={session}>
      {loading && <Backdrop />}
      {Component.auth ? (
        <Auth>
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
        </Auth>
      ) :
        (
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

    </SessionProvider>
  )
}

function Auth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required")
    },
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return children;
}

export default wrapper.withRedux(MyApp)