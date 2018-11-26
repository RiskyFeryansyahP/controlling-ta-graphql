import * as mongoose from 'mongoose'

interface IMeet extends mongoose.Document {
    _id : mongoose.Schema.Types.ObjectId
    jam_awal : string
    jam_akhir : string
    keterangan : string
    status : string
    dosen : mongoose.Schema.Types.ObjectId
}

const Meetschema = new mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    jam_awal : { type : String },
    jam_akhir : { type : String },
    keterangan : { type : String },
    status : { type : String, default : 'Progress' },
    dosen : { type : mongoose.Schema.Types.ObjectId }
})

export default mongoose.model<IMeet>('Meet', Meetschema)