import { Response, Request, NextFunction } from 'express'
import Gasto, { type IGasto } from '../models/gastos.model'
import { validationResult, ValidationError, Result } from 'express-validator'
import User from '../models/user.model'

export const postGastos = async (req: Request, res: Response) => {
	const { title, description, price } = req.body
	const userId = req.userId
	const errors: Result<ValidationError> = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json(errors)
	}

	try {
		// buscamos el user con su ID
		const userFound = await User.findById(userId)
		// creamos el gasto con el ID de ese userFound
		const newGasto = new Gasto({
			title,
			description,
			price,
			user: userFound?._id,
		})
		// se guarda el gasto
		const sevedGasto = await newGasto.save()
		// le agregamos el nuevo gasto guardado, al userFound
		if (userFound) {
			userFound.gastos = userFound.gastos.concat(sevedGasto.id)
		}
		res.json(newGasto)
	} catch (error) {
		console.log(error)
	}
}

export const getGastos = async (req: Request, res: Response) => {
	try {
		const gastos = await Gasto.find({}).populate('user', { name: 1 })
		res.json(gastos)
	} catch (error) {
		res.json(error)
	}
}
