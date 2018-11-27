import * as mongoose from 'mongoose'

interface IMeet extends mongoose.Document {
    _id : string
    jam_awal : string
    jam_akhir : string
    keterangan : string
    status : string
    mahasiswa : string
    dosen : string
}

const Meetschema = new mongoose.Schema({
    _id : { type : String },
    jam_awal : { type : String },
    jam_akhir : { type : String },
    keterangan : { type : String },
    status : { type : String, default : 'Diajukan' },
    catatan : { type : String, default : '' },
    mahasiswa : { type : String },
    dosen : { type : String }
})

export default mongoose.model<IMeet>('Meet', Meetschema)