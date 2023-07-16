import { Server } from './models/server'

import dotenv from 'dotenv'
dotenv.config()

// TODO: rutas de usuario y de gastos

const server = new Server()
server.listen()
