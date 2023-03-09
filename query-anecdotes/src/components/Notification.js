import { useMessageValue } from "../NotifContext"

const Notification = () => {
  const message = useMessageValue()
    
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  return message === ''
  ? null
  : (
      <div style={style}>
      {message}
      </div>
    )
}

export default Notification
