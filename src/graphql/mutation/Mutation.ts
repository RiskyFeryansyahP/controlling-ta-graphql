import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql'
import { Types } from 'mongoose'


import { MahasiswaType, UserType, DosenType, Profile, ProfileType, TugasType, DetailTugas, MeetType } from '../schema/Schema'

// Import database no-sql
import Mahasiswa from '../../model/MahasiswaSchema'
import User from '../../model/UserSchema'
import Dosen from '../../model/DosenSchema'
import Tugas from '../../model/TugasSchema'
import Meet from '../../model/MeetSchema'

export const Mutation = new GraphQLObjectType({
    name : 'mutation',
    fields : {
        addUser : {
            type : UserType,
            args : {
                username : { type : GraphQLString },
                password : { type : GraphQLString },
                email : { type : GraphQLString },
                status : { type : GraphQLString },
                firstName : { type : GraphQLString },
                lastName : { type : GraphQLString },
                college : { type : GraphQLString },
            },
            resolve(parent, args)
            {
                const id = Types.ObjectId()
                const user = new User({
                    _id : Types.ObjectId(),
                    username : args.username,
                    password : args.password,
                    email : args.email,
                    status : args.status,
                    onStatus : id
                })
                if(args.status == 'Mahasiswa')
                {
                    const mahasiswa = new Mahasiswa({
                        _id : id,
                        firstName : args.firstName,
                        lastName : args.lastName,
                        college : args.college
                    })

                    mahasiswa.save()
                    return user.save()
                }
                else
                {
                    const dosen = new Dosen({
                        _id : id,
                        firstName : args.firstName,
                        lastName : args.lastName,
                        code : 123
                    })

                    dosen.save()
                    return user.save()
                }
            }
        },
        addDosenToMahasiswa : {
            type : new GraphQLList(Profile),
            args : {
                id : { type : GraphQLID },
                code : { type : GraphQLInt }
            },
            resolve(parent, args)
            {
               return [
                    Mahasiswa.findOneAndUpdate({_id : args.id}, { dosen_code : args.code }),
                    Dosen.findOneAndUpdate({ code : args.code }, {$push : { mahasiswa : args.id }}, { new : true })
               ]
            }
        },
        addTugasMahasiswa : {
            type : new GraphQLList(DetailTugas),
            args : {
                id : { type : GraphQLString },
                judul : { type : GraphQLString },
                keterangan : { type : GraphQLString }
            },
            resolve(parent, args)
            {
                const id : Types.ObjectId = Types.ObjectId()
                const tugas = new Tugas({
                    _id : id,
                    judul : args.judul,
                    keterangan : args.keterangan
                })

                return [Mahasiswa.findOneAndUpdate({ _id : args.id }, { tugas : id }), tugas.save()]
            }
        },
        mahasiswaAddMeetWithDosen : {
            type : MeetType,
            args : {
                id_mahasiswa : { type : GraphQLString },
                id_dosen : { type : GraphQLString },
                jam_awal : { type : GraphQLString },
                jam_akhir : { type : GraphQLString },
                keterangan : { type : GraphQLString }
            },
            resolve(parent, args)
            {
                const meet = new Meet({
                    _id : Types.ObjectId(),
                    jam_awal : args.jam_awal,
                    jam_akhir : args.jam_akhir,
                    keterangan : args.keterangan,
                    mahasiswa : args.id_mahasiswa,
                    dosen : args.id_dosen,
                })

                return meet.save()
            }
        },
        dosenResponseMeet : {
            type : MeetType,
            args : {
                answer : { type : GraphQLString },
                id_meet : { type : GraphQLID }
            },
            resolve(parent, args)
            {
                if(args.answer == 'Accept')
                {
                    return Meet.findOneAndUpdate({ _id : args.id_meet }, { status : 'Diterima' })
                }
                else
                {
                    return Meet.findOneAndUpdate({ _id : args.id_meet }, { status : 'Ditolak' })
                }
            }
        }
    }
})