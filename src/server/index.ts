import express, { type Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import helmet from 'helmet'
import router from '../routes'
import '../domain/repositories/mongo.repo'

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../public/swagger.json')

// TODO HTTPS

// Configura el archivo .env
dotenv.config()

// Crea la app express
const server: Express = express()

// Static server
server.use(express.static('/public'))

// Define el servidor para que use router en la ruta '/api'
server.use('/api', router)

// Swagger Config and routes
server.use('/docs', swaggerUi.serve)
server.get('/docs', swaggerUi.setup(swaggerDocument))
// server.get('/docs', swaggerUi.setup(undefined
// {
//     swaggerOptions: {
//         url: './swagger.json',
//         explorer: true
//     }
// }
// ))

// TODO Mongoose connection

// Security config
server.use(helmet())
server.use(cors())

// Content Type Config
server.use(express.urlencoded({ extended: true, limit: '7mb' }))
server.use(express.json({ limit: '7mb' }))

// Redirection Config :   http://localhost:3000 ==> http://localhost:3000/api
server.get('/', (req: Request, res: Response) => {
    res.redirect('/api')
})

export default server
