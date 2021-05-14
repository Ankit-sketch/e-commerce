import { DEV } from '../config'
import { ValidationError } from 'joi'
import CustomErrorHandler from '../services/CustomErrorHandler'

const errorHandler = async (err, req, res, next) => {
            let statuscode = 501
            let data = {
                message : 'internal server error',
                ...(DEV === 'true' && {original_error_dev: err.message})               
            }
            
            if(err instanceof ValidationError){
                statuscode = 422
                data = {
                message : err.message
            }
        }
            if(err instanceof CustomErrorHandler){
                statuscode = err.status
                data = {
                message : err.message
            }
        }
     return res.status(statuscode).json(data)
}
export default errorHandler