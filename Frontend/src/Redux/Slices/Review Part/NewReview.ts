import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios , { AxiosError} from "axios";
import { Url , E_Mssg } from "../../../Interfaces";
import { Reveiw } from "./GetAll";

const initialState = {
    IsSuccess : false,
    IsLoading : false,
    IsError : false,
    E_message : '',
    data : {} as Reveiw
}

export const newReviewFn = createAsyncThunk(
    'reveiw/new',
    async (data : any , {rejectWithValue}) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')!).Token
            const res = await axios.post(`${Url}/review/new` , {} , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return res.data
            
        } catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)

export const newReviewSlice = createSlice({
    name : 'review/new',
    initialState,
    reducers : {},
    extraReducers(builder) {
        // Pending Case
        builder.addCase(newReviewFn.pending , () => ({
            ...initialState,
            IsLoading  : true
        }));
        // fullFilled Case 
        builder.addCase(newReviewFn.fulfilled , (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));
        // Rejected Case 
        builder.addCase(newReviewFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})