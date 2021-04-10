import { useState } from 'react';
import useSession from './useSession'
import RoomForm from './RoomForm'
import CardForm from './CardForm'
import UserForm from './UserForm'
import VoteForm from './VoteForm'
import './App.css';


const App = () => {
  const [room, setRoom] = useState("")
  const [user, setUser] = useState("")
  const { connected, users, session, mutateSession } = useSession(user, room)

  const selectCard = (card: string) => {
    mutateSession({ card })
  }

  const castVote = (vote: string) => {
    if (session.card) {
      mutateSession({ votes: [{ card: session.card, user, vote }]})
    }
  }

  const commitPoints = (points: string) => {
    if (session.card) {
      mutateSession({ points: [{ card: session.card, points }]})
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>estimatemate</h1>

        <dl>
          <dt>Connection</dt>
          <dd>{connected ? `connected to room: ${room}` : "disconnected"}</dd>

          <dt>Users</dt>
          {Array.from(users).map(user => <dd key={user}>{user}</dd>)}

          <dt>Selected Card</dt>
          <dd>{session.card ? session.card : 'none'}</dd>

          <dt>Votes</dt>
          {session.votes?.filter(({ card }) => card === session.card).map(({ user, vote }) => <dd>{user}: {vote}</dd>)}
        </dl>

        <UserForm setUser={user=> setUser(user)} />
        {user && <RoomForm joinRoom={room => setRoom(room)} />}
        {connected && <CardForm selectCard={card => selectCard(card)} />}
        {session.card && <VoteForm castVote={vote => castVote(vote)} />}
        {session.card && <VoteForm castVote={vote => commitPoints(vote)} />}
      </header>
    </div>
  );
}

export default App
