import { MahasiswaType, DosenType, TugasType } from '../schema/Schema'

export const resolveType2 = (data) => {
    console.log("data", data)
    if(data.college)
    {
        return MahasiswaType
    }

    if(data.code)
    {
        return DosenType
    }
}

export const resolveTypeTugasMahasiswa = data => {
    if(data.firstName)
    {
        return MahasiswaType
    }

    if(data.judul)
    {
        return TugasType
    }
}