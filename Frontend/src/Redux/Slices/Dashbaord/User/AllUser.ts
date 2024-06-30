import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , {AxiosError} from "axios";
import { E_Mssg , Url } from "../../../../Interfaces";

interface UserResponse {
    IsSuccess : boolean;
    result : User[]
}

export interface User {
    U_Id : number,
    Firstname : string
    Lastname : string
    Username : string
    Phone : string
    Email : string
    Role : string
    Is_Admin : boolean
}

const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_message : '',
    data : [] as User []
}


export const getAllUsersFn = createAsyncThunk(
    'users/all',
    async (_ , {rejectWithValue}) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')!).Token
            const res = await axios.get<UserResponse>(`${Url}/user/all` , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return res.data.result
            console.log(res.data)
        } catch (error) {
            // console.log(error)
            if( error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)


//  Creating Users Slice

export const getAllUserSlice = createSlice({
    name : 'user/users',
    reducers : {},
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllUsersFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));

      builder.addCase(getAllUsersFn.fulfilled , (state , action) => ({
        ...initialState,
        IsSuccess : true,
        data : action.payload
      }))

        builder.addCase(getAllUsersFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})