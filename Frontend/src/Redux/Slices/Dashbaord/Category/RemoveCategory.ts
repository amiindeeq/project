import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , { AxiosError} from "axios";
import { Url , E_Mssg, newCategory } from "../../../../Interfaces";
import { Category } from "./AllOfThem";


const initialState = {
    IsSuccess : true,
    IsLoading : true,
    IsError : true,
    Error_message : '',
    data : {} as Category
}


export const removeCategoryFn = createAsyncThunk (
    'category/delete',
    async ( Ca_Id: any , {rejectWithValue}) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')!).Token
            const res = await axios.put(`${Url}/category/remove/${Ca_Id}` , {} , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })

            return res.data

        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)

// Creating Delete Slice 
export const removeCategorySlice = createSlice({
    name : 'category/remove',
    reducers : {},
    initialState,
    extraReducers(builder) {
        // Pemnding Case 
        builder.addCase(removeCategoryFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }))
        // Fullfilled Case
        builder.addCase(removeCategoryFn.fulfilled , (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))
        // Rejected Case 
        builder.addCase(removeCategoryFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            Error_message : String(action.payload)
        }))
    },
})