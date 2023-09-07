import React, { ReactElement } from 'react'
import { Footer, Header } from '@/components'
import BottomHeader from '../Header/BottomHeader'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { AppState } from '@/utils/Store';
import { ConnectedProps, connect } from 'react-redux'
import { ETemplate } from '@/utils/slice/uiSlice';
import LayoutOne from '../Layout/LayoutOne';
import LayoutTwo from '../Layout/LayoutTow';

type Props = {
  children: React.ReactNode,
} & PropsRedux

const RootLayout = ({ children, template }: Props) => {
  if (template === ETemplate.TEMPLATE_ONE) return <LayoutOne>{children}</LayoutOne>
  if (template === ETemplate.TEMPLATE_TWO) return <LayoutTwo>{children}</LayoutTwo>
  return (
    <div className='flex  flex-col justify-between'>
      <Header />
      <BottomHeader />
      <main className="mt-4 px-1">{children}</main>
      <Footer />
    </div>
  )
}
const mapper = (state: AppState) => ({
  template: state.ui.template
})
const connector = connect(mapper);

type PropsRedux = ConnectedProps<typeof connector>
export default connector(RootLayout)