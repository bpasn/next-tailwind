import React, { ReactElement } from 'react'
import { Footer, Header } from '@/components'
import BottomHeader from '../Header/BottomHeader'
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  children: ReactElement
}

const RootLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <BottomHeader />
      {children}
      <Footer />
    </div>
  )
}

export default RootLayout