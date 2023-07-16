import express, { Express } from 'express'
import GastosRouter from '../routes/gastos.routes'
import AuthRouter from '../routes/auth.routes'
import { connectDB } from '../database/config'
import cookieParser from 'cookie-parser'

export class Server {
	public app: Express
	port: number | string | undefined

	constructor() {
		this.app = express()
		this.port = process.env.PORT || 3000
		this.middlewares()
		this.routes()
		this.startConnectionMongo()
	}

	middlewares() {
		this.app.use(express.json())
		this.app.use(cookieParser())
	}

	routes() {
		this.app.use('/api', GastosRouter)
		this.app.use('/auth', AuthRouter)
	}

	async startConnectionMongo() {
		await connectDB()
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`)
		})
	}
}
