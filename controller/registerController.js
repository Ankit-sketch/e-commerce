import Joi from 'joi'
import CustomErrorHandler from '../services/CustomErrorHandler'
import { User } from '../models'
import bcrypt from 'bcrypt'

const registerController = {
   async register(req, res, next){

       //validation
        const registerSchema = Joi.object({
            name : Joi.string().min(3).max(30).required(),
            email : Joi.string().email().required(),
            password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password : Joi.ref('password')
        }) 
        const { error } = registerSchema.validate(req.body)
        if(error){
            return next(error)
        }   
        // checking existing email
        // const maail = User.findone({email : req.body.email})
        try {
            const exist = await User.exists({email : req.body.email})
            if(exist){
                return next(CustomErrorHandler.alreadyExist(`Email already exists`))
            }
        } catch (error) {
            return next(error)
        }
        //hashing password 
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        //preparing model
        const user = new User({
              name,
              email,
              password : hashedPassword
        })
            try {
                const result = await user.save()
            } catch (error) {
                return next(error)
            }
        res.json({user})
   }
}

export default registerController