import React, {CSSProperties} from 'react'
import loadingStyle from "./Loading.module.scss"
import { ELoadingSize } from '../types/generalTypes'

export interface ILoadingProps {
  size: ELoadingSize,
  marginVertical?: React.CSSProperties["margin"]
}

const Loading = (props: ILoadingProps) => {
  return (
    <div className={` ${loadingStyle.loader} ${props.size ? loadingStyle[props.size] : ""}`} 
      style={{
        marginTop: props.marginVertical ?  `${props.marginVertical}` : "" ,
        marginBottom: props.marginVertical ?  `${props.marginVertical}` : "" ,
      }}
    />
  )
}

export default Loading
