import { voteOn } from '../reducers/anecdoteReducer'
import { setNotifMessage, clearNotifMessage } from '../reducers/notifReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const selectedAnecdotes = useSelector(({anecdotes, filter}) => {
    if (filter.text === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.includes(filter.text))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
      dispatch(voteOn(id))
      dispatch(setNotifMessage(`you voted on "${
        JSON.parse(
          JSON.stringify(
            selectedAnecdotes.filter(n=>n.id === id)
          )
        )[0].content
      }"`))
      setTimeout(() => dispatch(clearNotifMessage()), 5000)
  }
  
  return (
    <div>
      {[...selectedAnecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
      )}
    </div>
  )
}

export default AnecdoteList