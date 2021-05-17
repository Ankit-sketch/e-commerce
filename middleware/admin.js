import { User } from '../models'

const admin = async (req, res, next) => {
        try {
            const user = await User.findOne({id: req.user.id})
            if(user.role === 'admin'){
                next()
            }
        } catch (error) {
            return next(error)
        }
}
export default admin