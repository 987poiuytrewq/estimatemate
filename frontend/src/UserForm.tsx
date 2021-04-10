import { useForm } from 'react-hook-form'

type UserFormProps = {
  setUser: (user: string) => void
}

const UserForm = ({ setUser }: UserFormProps) => {
  const { setValue, handleSubmit } = useForm()
  const onSubmit = handleSubmit(data => setUser(data.user))

  return (
    <form onSubmit={onSubmit}>
      <h2>User</h2>
      <input type="text" onChange={e => setValue('user', e.target.value)}/>
      <input type="submit" value="Select"/>
    </form>
  )
}

export default UserForm
