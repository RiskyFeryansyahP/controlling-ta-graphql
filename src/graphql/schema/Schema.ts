import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLUnionType } from 'graphql'


// Import database no-sql
import Mahasiswa from '../../model/MahasiswaSchema'
import Dosen from '../../model/DosenSchema'
import Tugas from '../../model/TugasSchema';
import Meet from '../../model/MeetSchema';

// Import Resolver Types
import { resolveType2, resolveTypeTugasMahasiswa } from '../ResolverTypes/types'

export const data = [
    { username : 'catherine', id : '1' },
    { director : 'catherine hardwicke', id : '2' },
    { author : 'catherine cookson', id : '3' }
]

export const MahasiswaType = new GraphQLObjectType({
    name : 'mahasiswa',
    fields : () => ({
        id : { type : GraphQLString },
        firstName : { type : GraphQLString },
        lastName : { type : GraphQLString },
        college : { type : GraphQLString },
        dosen : {
            type : DosenType,
            resolve(parent, args)
            {
                return Dosen.findOne({ code : parent.dosen_code })
            }
        },
        tugas : {
            type : TugasType,
            resolve(parent, args)
            {
                // return tugas.find(tugas => tugas.id === parent.tugasId)
                return Tugas.findOne({ _id : parent.tugas})
            }
        },
        meet : {
            type : new GraphQLList(MeetType),
            args : { 
                status : { type : GraphQLString }
            },
            resolve(parent, args)
            {
                if(args.status)
                {
                    return Meet.find ({ mahasiswa : parent.id, status : args.status })
                }
                else
                {
                    return Meet.find({ mahasiswa : parent.id })
                }
            }
        }
    })
})

export const DosenType = new GraphQLObjectType({
    name : 'dosen',
    fields : () => ({
        id : { type : GraphQLString },
        firstName : { type : GraphQLString },
        lastName : { type : GraphQLString },
        code : { type : GraphQLString },
        mahasiswa : {
            type : GraphQLList(MahasiswaType),
            resolve(parent, args)
            {
                // return mahasiswas.filter(mahasiswa => mahasiswa.dosen === parent.id)
                return Mahasiswa.find({  })
            }
        }
    })
})

export const TugasType = new GraphQLObjectType({
    name : 'tugas',
    fields : () => ({
        id : { type : GraphQLString },
        judul : { type : GraphQLString },
        keterangan : { type : GraphQLString },
        bab1 : { type : GraphQLString },
        bab2 : { type : GraphQLString },
        bab3 : { type : GraphQLString },
        bab4 : { type : GraphQLString },
        bab5 : { type : GraphQLString },
    })
})

export const UserType = new GraphQLObjectType({
    name : 'user',
    fields : () => ({
        id : { type : GraphQLID },
        username : { type : GraphQLString },
        password : { type : GraphQLString },
        email : { type : GraphQLString },
        status : { type : GraphQLString },
        onStatus : { type : GraphQLID },
        profile : {
            type : Profile,
            resolve(parent, args)
            {
                if(parent.status == 'Mahasiswa')
                {
                    return Mahasiswa.findOne({ _id : parent.onStatus })
                }
                
                else if(parent.status == 'Dosen')
                {
                    return Dosen.findOne({ _id : parent.onStatus })
                }
                // .then(datas => {
                //     console.log(datas._id === parent.onStatus)
                //     return datas._id === parent.onStatus
                // })
            }
        }
    })
})

export const ProfileType = new GraphQLUnionType({
    name : 'profile',
    types : [MahasiswaType, DosenType],
    resolveType(value)
    {
        if(value.status == 'Mahasiswa')
        {
            return MahasiswaType
        }

        if(value.status == 'Dosen')
        {
            return DosenType
        }
    }
})

export const MeetType = new GraphQLObjectType({
    name : 'meet',
    fields : () => ({
        id : { type : GraphQLID },
        jam_awal : { type : GraphQLString },
        jam_akhir : { type : GraphQLString },
        tgl : { type : GraphQLString },
        keterangan : { type : GraphQLString },
        status : { type : GraphQLString },
        mahasiswa : {
            type : MahasiswaType,
            resolve(parent, args)
            {
                return Mahasiswa.findOne({ _id : parent.mahasiswa })
            }
        },
        dosen : {
            type : DosenType,
            resolve(parent, args)
            {
                return Dosen.findOne({ code : parent.dosen })
            }
        }
    })
})

export const UserTyping = new GraphQLObjectType({
    name : 'user',
    fields : () => ({
        username : { type : GraphQLString },
        id : { type : GraphQLID }
    })
}) 

export const MovieType = new GraphQLObjectType({
    name : 'movie',
    fields : () => ({
        director : { type : GraphQLString },
        id : { type : GraphQLID }
    })
})

export const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : {
      author : { type : GraphQLString },
      id : { type : GraphQLID }
    }
});

const resolveType = (data) => {
    console.log(data)
    if (data) 
    {
        return UserType    
    }
    
    if(data)
    {
        return MovieType
    }

    if(data)
    {
        return BookType
    }
}

export const SearchableType = new GraphQLUnionType({
    name : 'SearchableType',
    types : [UserType,
         MovieType, BookType],
    resolveType : resolveType
})

/**
 * uniontype berfungsi untuk mengambil jika kita ingin menampilkan 2 types yang berbeda
 */

export const Profile = new GraphQLUnionType({
    name : 'Profile',
    types : [MahasiswaType, DosenType],
    resolveType : resolveType2
})

export const DetailTugas = new GraphQLUnionType({
    name : 'DetailTugas',
    types : [MahasiswaType, TugasType],
    resolveType : resolveTypeTugasMahasiswa
})