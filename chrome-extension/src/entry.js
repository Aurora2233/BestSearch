import React from 'react'
import ReactDOM from 'react-dom'
import { NewFrame } from './dist'
import { url } from './settings'
if (NewFrame.isReady()) {
  NewFrame.toggle()
} else {
  boot()
}

function boot() {
  const root = document.createElement('div')
  document.body.appendChild(root)

  const App = (
    // <Frame url={url} />
    <NewFrame url={url}  />
  )

  ReactDOM.render(App, root)
}
