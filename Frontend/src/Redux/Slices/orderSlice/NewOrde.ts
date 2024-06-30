import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , { AxiosError } from "axios";
import { E_Mssg , Url } from "../../../Interfaces";




const initialState = {
    IsSuccess : false,
    IsLoading : false,
    IsError : false,
    E_message : '',
    data : {} 
}


export const newOrderFn = createAsyncThunk(
    'order/new',
    async( _, {rejectWithValue}) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')!).Token;
            const res = await axios.post(`${Url}/order/new`, {} , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                
            } )
            return res.data.result
            
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)

// Creating Slice 

export const newOrderSlice = createSlice({
    name : 'cart/new',
    reducers : {
        resetOrder : ()=> initialState
    },
    initialState,
    extraReducers(builder) {
        builder.addCase(newOrderFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }))
        builder.addCase(newOrderFn.fulfilled , (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))
        builder.addCase(newOrderFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})

export const {resetOrder} = newOrderSlice.actions