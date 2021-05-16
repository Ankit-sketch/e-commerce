import express from 'express'

import {registerController, loginController, userController, refreshController, productController} from '../controller'

import auth from '../middleware/auth'

const router = express.Router()

router.post('/register', registerController.register)

router.post('/login', loginController.login)

router.get('/me', auth, userController.me)

router.post('/refresh', refreshController.refresh)

router.post('/logout', auth, loginController.logout)

router.post('/product', productController.store)

export default router