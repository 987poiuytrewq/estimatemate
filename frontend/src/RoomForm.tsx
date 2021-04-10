import { useForm } from 'react-hook-form'

type RoomFormProps = {
  joinRoom: (room: string) => void
}

const RoomForm = ({ joinRoom }: RoomFormProps) => {
  const { setValue, handleSubmit } = useForm()
  const onSubmit = handleSubmit(data => joinRoom(data.room))

  return (
    <form onSubmit={onSubmit}>
      <h2>Room</h2>
      <input type="text" onChange={e => setValue('room', e.target.value)}/>
      <input type="submit" value="Join"/>
    </form>
  )
}

export default RoomForm
