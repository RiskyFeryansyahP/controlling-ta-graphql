import * as mongoose from 'mongoose'

interface IDosen extends mongoose.Document {
    _id : string
    firstName : string
    lastName : string
    code : number
    mahasiswa : string
}

const DosenSchema = new mongoose.Schema({
    _id : { type : String },
    firstName : { type : String, required : true },
    lastName : { type : String, required : true },
    code : { type : Number, required : true },
    mahasiswa : [
        { type : String }
    ]
})

export default mongoose.model<IDosen>("Dosen", DosenSchema)