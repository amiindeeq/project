import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , { AxiosError } from "axios";
import { Url , E_Mssg, userOrder } from "../../../Interfaces";

interface AllUserResponse {
    IsSuccess : boolean
    result : []
}


const initialState = {
    IsSuccess : false,
    IsError : false,
    IsLoading : false,
    E_message : '',
    data : [] as userOrder []
}


export const AllUserOrderFn = createAsyncThunk (
    'order/user',
    async ( _, {rejectWithValue}) => {
       try {
        const token = JSON.parse(localStorage.getItem('userInfo')!).Token
        const res = await axios.get<AllUserResponse>(`${Url}/order/user` , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        return res.data.result
       } catch (error) {
        if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg)
        return rejectWithValue(E_Mssg)
       }
    }
)



export const AllUserOrderSlice = createSlice({
    name : 'order/user',
    initialState,
    reducers : {},
    extraReducers(builder) {
        // Pending Case
        builder.addCase(AllUserOrderFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }))
        // FullFilled Case
        builder.addCase(AllUserOrderFn.fulfilled , (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))
        // Rejected Case
        builder.addCase(AllUserOrderFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})