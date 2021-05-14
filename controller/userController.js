import {User} from "../models"
import CustomErrorHandler from "../services/CustomErrorHandler"

const userController = {
   async me(req, res, next){
       let user
         try {
            user = await User.findOne({_id : req.user._id}).select('-password -updatedAt -__v')
            if(!user){
                return next(CustomErrorHandler.unauthorised())
            }
         } catch (error) {
             return next(error)
         }
         res.send(user)
   }
}
export default userController