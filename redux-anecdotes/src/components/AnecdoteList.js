import { voteOn } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const selectedAnecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(a => a.content.includes(filter))
  })
  const dispatch = useDispatch()

  const vote = (id) => {
      dispatch(voteOn(id))
  }
  
  return (
    <div>
      {selectedAnecdotes
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