import { NextFunction, Request, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { token } = req.cookies
	const decoded = jwt.verify(token, process.env.SECRET_KEY as Secret)
	if (!token) return res.status(401).json({ message: 'Unhautorized' })

	req.userId = decoded.id
	next()
}
