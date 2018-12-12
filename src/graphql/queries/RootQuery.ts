import { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } from 'graphql'

// import Schema GraphQL
import { 
    MahasiswaType, 
    DosenType, 
    UserType, 
    SearchableType, 
    data, 
    TugasType,
    MeetType
} from '../schema/Schema'

// import database no-sql
import User from '../../model/UserSchema'
import Mahasiswa from '../../model/MahasiswaSchema'
import Dosen from '../../model/DosenSchema'
import Meet from '../../model/MeetSchema'


export const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        mahasiswas : {
            type : GraphQLList(MahasiswaType),
            resolve(parent, args)
            {
                // return mahasiswas
                return Mahasiswa.find({})
            }
        },
        dosens : {
            type : GraphQLList(DosenType),
            resolve(parent, args)
            {
                return Dosen.find({})
            }
        },
        mahasiswa : {
            type : MahasiswaType,
            args : { id : { type : GraphQLString } },
            resolve(parent, args)
            {
                // return mahasiswas.find(mahasiswa => mahasiswa.id === args.id)
                return Mahasiswa.findOne({ _id : args.id })
            }
        },
        dosen : {
            type : DosenType,
            resolve(parent, args)
            {
                // return dosens.find(dosen => dosen.id === args.id)
                return Dosen.findOne({ _id : args.id })
            }
        },
        user : {
            type : UserType,
            args : { username : { type : GraphQLString } },
            resolve(parent, args)
            {
                return User.findOne({ username : args.username })
                
            }
        },
        users : {
            type : new GraphQLList(UserType),
            resolve(parent, args)
            {
                return User.find({})
            }
        },
        meets : {
            type : new GraphQLList(MeetType),
            resolve(parent, args)
            {
                return Meet.find({})
            }
        },
        search : {
            type : new GraphQLList(SearchableType),
            // args : {
            //     text : { type : GraphQLString }
            // },
            resolve(root, args)
            {
                // const text = args.text
                return data.filter((d) => {
                    // const searchableProperty = d.username || d.director || d.author
                    // console.log(searchableProperty == 'catherine')
                    // return searchableProperty.indexOf(text) !== -1
                    return d.username == 'catherine'
                })
            }
        }
    }
})