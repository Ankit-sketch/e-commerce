import CustomErrorHandler from "../services/CustomErrorHandler"
import JwtService from "../services/JwtService"

const auth = (req, res, next) => {
            let authHeader = req.headers.authorization
            if (!authHeader){
                return next(CustomErrorHandler.unauthorised('invalid token'))
            }
            try {
                const token = authHeader.split(' ')[1]
                //checking if someone has tempered token or not
                const { _id, role } = JwtService.verify(token)
                    const user = {
                        _id, 
                        role
                    }
                    req.user = user                   
                    next()
            } catch (error) {
                return next(CustomErrorHandler.unauthorised('invalid token'))
            }
}
export default auth