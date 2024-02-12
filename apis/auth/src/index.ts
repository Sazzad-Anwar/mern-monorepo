import { createServer, serviceDetails } from './server'

const port = process.env.AUTH_PORT
const server = createServer()

server.listen(port, () => {
  console.table(serviceDetails)
})
