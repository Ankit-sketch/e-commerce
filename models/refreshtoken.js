import mongoose from 'mongoose'

const Schema = mongoose.Schema

const refreshTok = new Schema({
     token : {type:String, unique: true}
})

export default mongoose.model('RefreshToken', refreshTok)