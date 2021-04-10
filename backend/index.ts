import { createServer } from "http"
import { Server, Socket } from "socket.io"

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


io.on("connection", (socket: Socket) => {
  const { room, user } = socket.handshake.query
  socket.join(room)

  const getHeaders = () => ({ timestamp: new Date().toISOString(), user, room })

  const broadcast = (message: string, body: object = {}) => {
    const payload = { headers: getHeaders(), body }
    console.log(">", message, payload)
    socket.emit(message, payload)
    socket.to(room).emit(message, payload)
  }

  console.log("<", "connected", { room, user })
  socket.emit("connected", { headers: getHeaders() })
  broadcast("joined-room")

  socket.on("disconnect", (reason: string) => {
    broadcast("left-room")
  })

  socket.on("sync-session", (session: object) => {
    console.log("<", "sync-session", { session })
    broadcast("sync-session", { session })
  })
})

httpServer.listen(4000)
