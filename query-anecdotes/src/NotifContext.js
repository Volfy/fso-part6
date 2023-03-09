import { createContext, useReducer, useContext } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return `you added '${action.payload}'`
    case 'VOTE':
      return `you voted on '${action.payload}'`
    case 'CLEAR':
      return ''
    case 'FAIL':
      return action.payload
    default:
      return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [message, notifDispatch] = useReducer(notifReducer, '')

  return (
    <NotifContext.Provider value={[message, notifDispatch]} >
      {props.children}
    </NotifContext.Provider>
  )
}

export const useMessageValue = () => {
  const messageAndDispatch = useContext(NotifContext)
  return messageAndDispatch[0]
}

export const useMessageDispatch = () => {
  const messageAndDispatch = useContext(NotifContext)
  return messageAndDispatch[1]
}

export default NotifContext