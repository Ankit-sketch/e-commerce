import Joi from 'joi'
const productSchema = Joi.object({            
            name : Joi.string().required(),
            price : Joi.string().required(),
            size :  Joi.string()
        })
    export default productSchema