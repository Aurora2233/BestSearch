import React, { useState, useEffect,useRef } from "react";
import cx from 'classnames'
import { css } from 'glamor'
import { node, object, string, number, func } from 'prop-types'

const iframeClass = css({
  border: 'none',
  width: '100%',
  height: '100%',
  background: 'white',
  borderRadius: '8px',
  boxShadow: '-1px 1px 8px rgba(0,0,0,.15)'
})

const maskClass = css({
  display: 'none',
  position: 'fixed',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  cursor: 'pointer',
  zIndex: '9999'
})

const maskVisibleClass = css({
  display: 'block'
})

const containerClass = css({
  position: 'fixed',
  top: '0px',
  right: '0px',
  height: '100%',
  width: '65%',
  maxWidth: '400px',
  padding: '8px',
  boxSizing: 'border-box',
  transform: 'translateX(100%)',
  transition: 'transform .45s cubic-bezier(0, 0, 0.3, 1)',
  zIndex: 10000
})

const containerVisibleClass = css({
  transform: 'translate3d(0,0,0)'
})

const containerMinimizedClass = css({
  cursor: 'pointer',
  transform: 'translateX(94%)',
  ':hover': {
    transform: 'translateX(92%)'
  },
  '& > iframe': {
    pointerEvents: 'none'
  }
})

const FRAME_TOGGLE_FUNCTION = 'chromeIframeSheetToggle'

export const NewFrame = (props) =>{
  const {
    url,
    className,
    maskClassName,
    maskStyle,
    containerClassName,
    containerStyle,
    iframeClassName,
    iframeStyle,
    children,
    containerChildren
  } = props
  const [isVisible,setIsVisible]= useState(false)
  const [isMinimized,setIsMinimized]= useState(false)
  const mask = useRef(null)
  const frame = useRef(null)
  const onLoad = () => {
    const { onLoad } = props

    onLoad({
      mask: mask,
      frame: frame
    })
  }

  const onMaskClick = () => {
    setIsMinimized(true)
  }

  const onFrameClick = () => {
    setIsMinimized(false)
  }

  const toggleFrame = () => {
    setIsMinimized(!isMinimized)
  }
  useEffect(()=>{
    console.log(2233);
  })
  useEffect(()=>{
    const { delay, onMount } = props

    window[FRAME_TOGGLE_FUNCTION] = toggleFrame

    onMount({
      mask: mask,
      frame: frame
    })

     const _visibleRenderTimeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    return ()=>{
      const { onUnmount } = props

      onUnmount({
        mask: mask,
        frame: frame
      })
  
      delete window[FRAME_TOGGLE_FUNCTION]
      clearTimeout(_visibleRenderTimeout)
    }
  },[])
  return (
    <div>
    <div
      className={cx({
        [maskClass]: true,
        [maskVisibleClass]: !isMinimized,
        [maskClassName]: true
      })}
      style={maskStyle}
      onClick={onMaskClick}
      ref={mask}
    />

    <div
      className={cx({
        [containerClass]: true,
        [containerVisibleClass]: isVisible,
        [containerMinimizedClass]: isMinimized,
        [containerClassName]: true
      })}
      style={containerStyle}
      onClick={onFrameClick}
    >
      <iframe
        className={cx({
          [iframeClass]: true,
          [iframeClassName]: true
        })}
        style={iframeStyle}
        src={url}
        ref={frame}
        onLoad={onLoad}
      />

      {containerChildren}
    </div>

    {children}
  </div>
)
}
NewFrame.defaultProps={
  url: '',
  delay: 500,
  maskClassName: '',
  maskStyle: {},
  containerClassName: '',
  containerStyle: {},
  iframeClassName: '',
  iframeStyle: {},
  onMount: () => {},
  onUnmount: () => {},
  onLoad: () => {}
}
NewFrame.propTypes={
  url: string,
  delay: number,
  maskClassName: string,
  maskStyle: object,
  containerClassName: string,
  containerStyle: object,
  iframeClassName: string,
  iframeStyle: object,
  children: node,
  containerChildren: node,
  onMount: func,
  onUnmount: func,
  onLoad: func
}
NewFrame.isReady=()=>{
  return typeof window[FRAME_TOGGLE_FUNCTION] !== 'undefined'
}
NewFrame.toggle=()=>{
  if (window[FRAME_TOGGLE_FUNCTION]) {
    window[FRAME_TOGGLE_FUNCTION]()
  }
}
export default NewFrame
