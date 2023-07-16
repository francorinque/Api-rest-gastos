import { Router } from 'express'
import { check } from 'express-validator'
import {
	login,
	register,
	getUsers,
	logout,
} from '../controllers/auth.controller'

const router = Router()

router.get('/users', getUsers)
router.get('/logout', logout)

router.post(
	'/register',
	[
		check('name', 'name is required').not().isEmpty(),
		check('email', 'email is required').not().isEmpty().isEmail(),
		check('password', 'password is required')
			.isLength({ min: 6 })
			.not()
			.isEmpty(),
	],
	register
)
router.post(
	'/login',
	[
		check('name', 'name is required').not().isEmpty(),
		check('password', 'password is required')
			.isLength({ min: 6 })
			.not()
			.isEmpty(),
	],
	login
)

export default router
