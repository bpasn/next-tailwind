import React, { ReactElement } from 'react'
import { Footer, Header } from '@/components'
import BottomHeader from '../Header/BottomHeader'
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  children: React.ReactNode,
}

const LayoutTwo = ({ children }: Props) => {
  return (
    <div className='flex  flex-col justify-between'>
      <Header />
      <BottomHeader />
      <main className="mt-4 px-1">{children}</main>
      <Footer />
    </div>
  )
}

export default LayoutTwo