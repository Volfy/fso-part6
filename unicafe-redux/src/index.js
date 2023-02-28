import React from 'react'
import ReactDOM from 'react-dom/client'
import reducer from './reducer'
import { createStore } from 'redux'

const store = createStore(reducer)

const App = () => {
  return (
    <div>
      <button onClick={e => store.dispatch({type: 'GOOD'})}>
        Good
      </button>
      <button onClick={e => store.dispatch({type: 'OK'})}>
        OK
      </button>
      <button onClick={e => store.dispatch({type: 'BAD'})}>
        Bad
      </button>
      <button onClick={e => store.dispatch({type: 'ZERO'})}>
        Reset
      </button>
      <ul>
        <li>good {store.getState().good}</li>
        <li>ok {store.getState().ok}</li>
        <li>bad {store.getState().bad}</li>
      </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)