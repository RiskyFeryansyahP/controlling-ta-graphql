import * as mongoose from 'mongoose'

interface IMeet extends mongoose.Document {
    _id : string
    judul : string
    keterangan : string,
    seminar1 : string,
    seminar2 : string,
    bab1 : string,
    bab2 : string,
    bab3 : string,
    bab4 : string,
    bab5 : string,
    dosen : number
}

const Meetschema = new mongoose.Schema({
    _id : { type : String },
    judul : { type : String, required : true },
    keterangan : { type : String, required : true },
    seminar1 : { type : String, required : true },
    seminar2 : { type : String, required : true },
    bab1 : { type : String, default : '' },
    bab2 : { type : String, default : '' },
    bab3 : { type : String, default : '' },
    bab4 : { type : String, default : '' },
    bab5 : { type : String, default : '' },
})

export default mongoose.model<IMeet>('Tugas', Meetschema)