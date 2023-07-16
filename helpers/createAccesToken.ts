import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

export function createAccessToken(payload: JwtPayload) {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.SECRET_KEY as Secret,
			{ expiresIn: '1d' },
			(err, token) => {
				if (err) reject(err)
				resolve(token)
			}
		)
	})
}
