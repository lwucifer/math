import io from 'socket.io-client'
const socket = io(process.env.SOCKET_URI)

export default socket