import { useMutation, useQueryClient } from "react-query"
import { useMessageDispatch } from "../NotifContext"
import { createNew } from "../requests"


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useMessageDispatch()

  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({
        type: 'FAIL',
        payload: 'Anecdote must have length of at least 5 characters'
      })
      setTimeout(() => dispatch({type: 'CLEAR'}), 5000)  
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
    dispatch({ 
      type: 'NEW_ANECDOTE',
      payload: content
    })
    setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
