import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios , {AxiosError} from "axios";
import { Url , E_Mssg } from "../../../../Interfaces";
import { Product } from "./AllOfThem";



const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_message : '',
    data : {} as Product
}

export const updatingProduct = createAsyncThunk (
    'update/product',
    async ( data : any , {rejectWithValue}) => {
        try {
            const formData = new FormData()
           
            const token = JSON.parse(localStorage.getItem('userInfo')!).Token

        } catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)