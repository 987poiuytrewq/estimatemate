import { useForm } from 'react-hook-form'

type VoteFormProps = {
  castVote: (vote: string) => void
}

const VoteForm = ({ castVote }: VoteFormProps) => {
  const { setValue, handleSubmit } = useForm()
  const onSubmit = handleSubmit(data => castVote(data.vote))

  return (
    <form onSubmit={onSubmit}>
      <h2>Vote</h2>
      <input type="text" onChange={e => setValue('vote', e.target.value)}/>
      <input type="submit" value="Select"/>
    </form>
  )
}

export default VoteForm
