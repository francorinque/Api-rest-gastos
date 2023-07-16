import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { createAccessToken } from '../helpers/createAccesToken'
import User, { type IUser } from '../models/user.model'

export const register = async (req: Request, res: Response) => {
	const { name, email, password }: IUser = req.body
	const errors: Result<ValidationError> = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json(errors)
	}

	try {
		const userExists = await User.findOne({ email })
		if (userExists) return res.json({ message: 'Already exists' })

		const passwordHash = await bcrypt.hash(password, 10)
		const newUser = new User({
			name,
			email,
			password: passwordHash,
		})

		const userSaved = await newUser.save()
		// genero token
		const token = await createAccessToken({ id: userSaved._id })
		res.cookie('token', token)
		res.json(userSaved)
	} catch (error) {
		console.log(error)
	}
}

export const login = async (req: Request, res: Response) => {
	const { name, password }: IUser = req.body
	const errors: Result<ValidationError> = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(400).json(errors)
	}

	try {
		// verificar si el usuario existe
		const userFound = await User.findOne({ name })
		if (!userFound)
			return res.status(401).json({ message: 'Invalid credentials' })

		// verificas la password
		const validPassword = await bcrypt.compare(password, userFound.password)
		if (!validPassword)
			return res.status(401).json({ message: 'Invalid credentials' })
		// generando token
		const token = await createAccessToken({ id: userFound._id })
		res.cookie('token', token)

		res.json({
			id: userFound._id,
			name: userFound.name,
			email: userFound.email,
		})
	} catch (error) {
		res.json(error)
	}
}

export const getUsers = async (req: Request, res: Response) => {
	const users = await User.find({})
	res.status(200).json(users)
}

export const logout = (req: Request, res: Response) => {
	res.clearCookie('token')
	res.status(200).json('sesion cerrada correctamente')
}
