import * as mongoose from 'mongoose'

interface IUser extends mongoose.Document {
    _id : string
    username : string
    password : string
    email : string
    status : string
    onStatus : String
}

const UserSchema = new mongoose.Schema({
    _id : { type : String },
    username : { type : String, required : true },
    password : { type : String, required : true },
    email : { type : String, required : true },
    status : { type : String, required : true, enum : ['Mahasiswa', 'Dosen'] },
    onStatus : { type : String, refPath : 'status' }
})

UserSchema.set('toObject', { virtuals : true })

export default mongoose.model<IUser>("User", UserSchema)