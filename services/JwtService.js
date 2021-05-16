import {SECRET_KEY, REFRESH_KEY} from '../config'

import Jwt from 'jsonwebtoken'


class JwtService{

        static sign(payload, expiry = '1d', secret_key = SECRET_KEY){
        return Jwt.sign(payload, secret_key, {expiresIn : expiry})
        }

        static verify(token, secret_key = SECRET_KEY){
        return Jwt.verify(token, secret_key)
        }
        
}
export default JwtService