import { createServer, serviceDetails } from './server'

const port = process.env.PORT || 5001
const server = createServer()

server.listen(port, () => {
  console.table(serviceDetails)
})
