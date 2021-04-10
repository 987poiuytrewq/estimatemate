import merge from 'deepmerge'
import { useState } from 'react';
import useSocket from './useSocket'

type Session = {
  card?: string
  votes?: [{ card: string, user: string, vote: string }]
  points?: [{ card: string, points: string }]
}

const useSession = (user: string, room: string) => {
  const [users, setUsers] = useState<Set<string>>(new Set())
  const [session, setSession] = useState<Session>({})

  const addUser = ({ headers: { user } }: { headers: { user: string } }) => {
    users.add(user)
    setUsers(users)
    console.log("users", users)
    // sendMessage('sync-session', session)
  }

  const removeUser = ({ headers: { user } }: { headers: { user: string } }) => {
    users.delete(user)
    setUsers(users)
    console.log("users", users)
  }

  const hasOwnProperty = <O extends object, K extends PropertyKey>(obj: O, key: K): obj is O & Record<K, unknown> => {
    return obj.hasOwnProperty(key)
  }

  const isSession = (x: any): x is Session => true

  const receiveSession = ({ body }: { body: object }) => {
    if (hasOwnProperty(body, 'session') && isSession(body.session)) {
      setSession(body.session)
    }
  }


  const { connected, sendMessage } = useSocket(user, room, [
    { messageName: 'joined-room', handler: addUser },
    { messageName: 'left-room', handler: removeUser },
    { messageName: 'sync-session', handler: receiveSession }
  ])

  const mutateSession = (mutation: Session) => {
    sendMessage("sync-session", merge(session, mutation))
  }

  return { connected, users, session, mutateSession }
}

export default useSession
