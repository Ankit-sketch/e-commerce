import Joi from 'joi'
import CustomErrorHandler from '../services/CustomErrorHandler'
import { User, RefreshToken } from '../models'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
import { SECRET_KEY, REFRESH_KEY } from '../config'
import JwtService from '../services/JwtService'

const loginController = {
   async login(req, res, next){
         const loginSchema = Joi.object({            
            email : Joi.string().email().required(),
            password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()  
        })
        const { error } = loginSchema.validate(req.body)
        if(error){
            return next(error)
        } 
        try {
            const user = await User.findOne({email : req.body.email})
            if(!user){  
                return next(CustomErrorHandler.wrongCredential('wrong email or password'))
            }
            const match = await bcrypt.compare(req.body.password, user.password)
            if(!match){
                return next(CustomErrorHandler.wrongCredential('wrong email or password'))
            }
            
            //token
             const access_token = JwtService.sign({ _id: user._id, role: user.role })
             const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_KEY)

            // database whitelist
            await RefreshToken.create({token : refresh_token})
             res.json({access_token, refresh_token})
        } catch (error) {
            return next(error)
        }       
   },
    async logout(req, res, next){
        //validation
        const refreshSchema = Joi.object({            
            refresh_token : Joi.string().required(),           
        })
        const { error } = refreshSchema.validate(req.body)
        if(error){
            return next(error)
        }
      try {
          await RefreshToken.deleteOne({token : req.body.refresh_token})
      } catch (error) {
          return next(error)
      }
      res.send('logout successfully') 
    }
         
}
export default loginController