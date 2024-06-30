import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , { AxiosError} from "axios";
import { E_Mssg , Url } from "../../../../Interfaces";
import { Product } from "./AllOfThem";

export interface productResponse {
    IsSuccess : boolean;
    result : Product
}

const initialState = {
    IsSuccess : false,
    IsLoading : false,
    IsError : false,
    E_Message : '',
    data : {} as Product
}

export const getOneProductFn = createAsyncThunk(
    'get-one/product', 
    async(Pr_Id : any , {rejectWithValue}) => {
        try {
            const res = await axios.get<productResponse>(`${Url}/product/get-one/${Pr_Id}`)
            // console.log(res.data)
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

export const OneProductSlice = createSlice({
    name : 'product/get-one',
    reducers : {},
    initialState ,
    extraReducers(builder) {
        // Pending Case 

        builder.addCase(getOneProductFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));

        // Fullfilled Case 
        builder.addCase(getOneProductFn.fulfilled , (state , action ) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        })); 

        // Rejected Case 
        builder.addCase(getOneProductFn.rejected , (state , action ) => ({
            ...initialState,
            IsError : true,
            E_Message : String(action.payload)
        }));
    },
});