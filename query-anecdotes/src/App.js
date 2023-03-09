import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(a => a.id === updated.id ? updated : a))
    }
  })

  

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 2,
      refetchOnWindowFocus: false,
    }
  )
  
  if (result.isLoading) {
    return <div>loading</div>
  }

  if (result.isError) {
    return <div>anecdote service unavailable due to problem with server</div>
  }

  const anecdotes = result.data


  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
