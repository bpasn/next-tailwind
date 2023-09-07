import { AppState, RootState } from '@/utils/Store'
import { ETemplate, IInitialStateUi } from '@/utils/slice/uiSlice'
import React from 'react'
import { ConnectedProps, connect } from 'react-redux'
import TemplateOne from './Template1'
import TemplateTwo from './Template2'

type Props = {}

const SelectTemplate: React.FC<Props & PropsFromRedux> = (props) => {
  console.log(props.selectTemplate.template)
  if (props.selectTemplate.template === ETemplate.TEMPLATE_ONE) {
    return <TemplateOne />
  }
  if (props.selectTemplate.template === ETemplate.TEMPLATE_TWO) {
    return <TemplateTwo products={[]} />
  }
}

const mapperRedux = (state: RootState) => ({
  selectTemplate: state.ui,
})

const connector = connect(
  mapperRedux
)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SelectTemplate)