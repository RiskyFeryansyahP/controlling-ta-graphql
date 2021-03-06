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
                        code : Math.random().toString(36).substring(7)
                    })

                    dosen.save()
                    return user.save()
                }
            }
        },
        userLogin : {
            type : UserType,
            args : {
                username : { type : GraphQLString },
                password : { type : GraphQLString }
            },
            resolve(parent, args)
            {
                return User.findOne({ username : args.username, password : args.password })
            }
        },
        addDosenToMahasiswa : {
            type : new GraphQLList(Profile),
            args : {
                id : { type : GraphQLString },
                code : { type : GraphQLString }
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
                keterangan : { type : GraphQLString },
                seminar1 : { type : GraphQLString },
                seminar2 : { type : GraphQLString }
            },
            resolve(parent, args)
            {
                const id : Types.ObjectId = Types.ObjectId()
                const tugas = new Tugas({
                    _id : id,
                    judul : args.judul,
                    keterangan : args.keterangan,
                    seminar1 : args.seminar1,
                    seminar2 : args.seminar2
                })

                return [Mahasiswa.findOneAndUpdate({ _id : args.id }, { tugas : id }), tugas.save()]
            }
        },
        mahasiswaAddMeetWithDosen : {
            type : MeetType,
            args : {
                id_mahasiswa : { type : GraphQLString },
                dosen_code : { type : GraphQLString },
                jam_awal : { type : GraphQLString },
                jam_akhir : { type : GraphQLString },
                tgl : { type : GraphQLString },
                keterangan : { type : GraphQLString }
            },
            resolve(parent, args)
            {
                const meet = new Meet({
                    _id : Types.ObjectId(),
                    jam_awal : args.jam_awal,
                    jam_akhir : args.jam_akhir,
                    tgl : args.tgl,
                    keterangan : args.keterangan,
                    mahasiswa : args.id_mahasiswa,
                    dosen : args.dosen_code,
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