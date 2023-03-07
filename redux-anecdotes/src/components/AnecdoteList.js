import { voteOn } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'
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
    const anecdoteContent = JSON.parse(JSON.stringify(selectedAnecdotes.filter(n=>n.id === id)))[0].content
    dispatch(setNotification(`you voted on "${anecdoteContent}"`, 5))
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