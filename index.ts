import server from './src/server'
import { LogError, LogSuccess } from './src/utils/logger'

const port = process.env.PORT || 4000

// Execute app and listen request to port
server.listen(port, () => {
    LogSuccess('Server on port http://localhost:' + port)
    LogSuccess('Documentation on http://localhost:' + port + '/docs')
})

// On error
server.on('error', (error) => {
    LogError(`Server Error: \n ${error}`)
})
