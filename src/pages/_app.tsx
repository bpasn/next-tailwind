'use client';
import LayOut from '@/components/Layout/LayoutOne';
import "@/styles/global.css"
import { persistor, wrapper } from '@/utils/Store';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { SessionProvider, useSession } from 'next-auth/react';
import { PersistGate } from 'redux-persist/integration/react'
import React from 'react'
import type { NextComponentType } from 'next/types';
import { Backdrop, RootLayout } from '@/components';
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
          <Head>
          <title>Amazona clone</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Ecommerce Website" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <PersistGate persistor={persistor} loading={null}>
            <div className='font-bodyFont bg-gray-300'>
              {loading && <Backdrop />}
              {Component.auth ? (
                <Auth>
                  <React.Suspense fallback={loading && <>Loading....</>}>
                    <RootLayout>
                      <Component {...pageProps} />
                    </RootLayout>
                  </React.Suspense>
                </Auth>
              ) :
                (
                  <React.Suspense fallback={loading && <>Loading....</>}>
                    <RootLayout>
                      <Component {...pageProps} />
                    </RootLayout>
                  </React.Suspense>

                )
              }
            </div>
          </PersistGate>
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
    return <div >Loading...</div>
  }
  return children;
}

export default wrapper.withRedux(MyApp)