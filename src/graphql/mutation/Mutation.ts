import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList } from 'graphql'
import { Types } from 'mongoose'


import { MahasiswaType, UserType, DosenType, Profile, ProfileType, TugasType, DetailTugas } from '../schema/Schema'

// Import database no-sql
import Mahasiswa from '../../model/MahasiswaSchema'
import User from '../../model/UserSchema'
import Dosen from '../../model/DosenSchema'
import Tugas from '../../model/TugasSchema'

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
        }
    }
})