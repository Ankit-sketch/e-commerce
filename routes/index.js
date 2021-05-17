import express from 'express'

import {registerController, loginController, userController, refreshController, productController} from '../controller'

import auth from '../middleware/auth'
import admin from '../middleware/admin'

const router = express.Router()

router.post('/register', registerController.register)

router.post('/login', loginController.login)

router.get('/me', auth, userController.me)

router.post('/refresh', refreshController.refresh)

router.post('/logout', auth, loginController.logout)

router.post('/product', [auth, admin], productController.store)

router.put('/product/:id', [auth, admin], productController.update)

router.delete('/product/:id', [auth, admin], productController.destroy)

router.get('/products', productController.index);

router.get('/products/:id', productController.show);

export default router