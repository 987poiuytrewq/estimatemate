import { useState, useEffect, useRef } from 'react';
import socketIOClient from "socket.io-client"

const SERVER_ENDPOINT = "http://localhost:4000"

type Message = {
  headers: {
    room: string,
    user: string,
    timestamp: string
  },
  body: object
}

type MessageHandler = {
  messageName: string,
  handler: (message: Message) => void
}

const useSocket = (user: string, room: string, messageHandlers: MessageHandler[]) => {
  const [connected, setConnected] = useState<boolean>(false)

  const socketRef = useRef<SocketIOClient.Socket>()

  const withSocket = (callback: (socket: SocketIOClient.Socket) => void) => {
    if (socketRef.current) {
      callback(socketRef.current)
    }
  }

  useEffect(() => {
    if (room) {
      socketRef.current = socketIOClient(SERVER_ENDPOINT, { query: { user, room } })
    }

    withSocket(socket => socket.on("connected", (message: string) => {
      console.log("connected", message)
      setConnected(true)
    }))

    messageHandlers.forEach(({ messageName, handler}) => {
      withSocket(socket => socket.on(messageName, (message: Message) => {
        console.log("handling", messageName, message)
        handler(message)
      }))
    })
  }, [user, room, messageHandlers])

  const sendMessage = (messageName: string, message: object) => {
    withSocket(socket => socket.emit(messageName, message))
  }

  return { connected, sendMessage }
}

export default useSocket
