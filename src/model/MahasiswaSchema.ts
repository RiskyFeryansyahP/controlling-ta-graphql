import * as mongoose from 'mongoose'

interface IMahasiswa extends mongoose.Document {
    _id : string
    firstName : string
    lastName : string
    college : string
    dosen_code : string
    tugas : string
    meet : string
}

const MahasiswaSchema = new mongoose.Schema({
    _id : { type : String },
    firstName : { type : String, required : true },
    lastName : { type : String, required : true },
    college : { type : String, required : true },
    dosen_code : { type : String, default : null },
    tugas : { type : String, default : '' },
    meet : { type : String, default : '' }
})

export default mongoose.model<IMahasiswa>('Mahasiswa', MahasiswaSchema)