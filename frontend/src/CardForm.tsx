import { useForm } from 'react-hook-form'

type CardFormProps = {
  selectCard: (card: string) => void
}

const CardForm = ({ selectCard }: CardFormProps) => {
  const { setValue, handleSubmit } = useForm()
  const onSubmit = handleSubmit(data => selectCard(data.card))

  return (
    <form onSubmit={onSubmit}>
      <h2>Card</h2>
      <input type="text" onChange={e => setValue('card', e.target.value)}/>
      <input type="submit" value="Select"/>
    </form>
  )
}

export default CardForm
