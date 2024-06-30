import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios ,{ AxiosError} from "axios";
import { E_Mssg , Url} from "../../../../Interfaces"

 export interface productResponse {
    IsSuccess : boolean;
    result : Product[]
}

export interface Product {
    Pr_Id: number,
    Pr_Name: string,
    Pr_Desc: string,
    Pr_Price: number,
    Pr_Quantity: number,
    Pr_Image: string,
    Ca_Id: number,
    Author_Id: number,
    Published: boolean,
    Is_Deleted: boolean,
    Created_At: string,
    Updated_At: string
}


const initialState = {
    IsSuccess : false,
    IsError : false,
    IsLoading : false,
    E_message : '',
    data : [] as Product []
}

export const getAllProductFn = createAsyncThunk(
    'Product/All',
    async (_, { rejectWithValue}) => {
        try {
            const res = await axios.get<productResponse>(`${Url}/product/all`)
            console.log(res.data)
            return res.data.result;
        } 
        
        catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)

// Creating Product Slice 
export const AllProductSlice = createSlice({
    name : 'Product/All',
    reducers : {},
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllProductFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));

        // Fullfilled Case 
        builder.addCase(getAllProductFn.fulfilled , (_, action) => (
            
            // console.log (action.payload),
            {
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));

        // Rejected Case 
        builder.addCase(getAllProductFn.rejected , (_, action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }));
    },

});


