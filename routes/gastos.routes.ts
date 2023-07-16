import { Router } from 'express'
import { getGastos, postGastos } from '../controllers/gastos.controller'
import { check } from 'express-validator'
import { verifyToken } from '../middlewares/verifyToken'

const router = Router()

router.get('/gastos', verifyToken, getGastos)
router.post(
	'/gastos',
	[
		check('title', 'name is required').not().isEmpty(),
		check('description', 'description is required').not().isEmpty(),
		check('price', 'price is required').not().isEmpty(),
	],
	postGastos
)

export default router
