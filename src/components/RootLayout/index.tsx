import React, { ReactElement } from 'react'
import { Footer, Header } from '@/components'
import BottomHeader from '../Header/BottomHeader'
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    < >
      <Header />
      <BottomHeader />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default RootLayout