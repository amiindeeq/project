import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , { AxiosError} from "axios";
import { Url , E_Mssg } from "../../../../Interfaces";
import { Product } from "./AllOfThem";


const initialState = {
    IsSuccess : false,
    IsLoading : false,
    IsError : false,
    E_message : '',
    data : {} as Product
}

export const newProductFn = createAsyncThunk (
    'Product/new',
    async(data : any , { rejectWithValue}) => {
        try {

            const formData = new FormData();
            for (let i = 0; i < data.Pr_Image.length; i++) {
                formData.append('Pr_Image', data.Pr_Image[i]);
              }
            formData.append('Pr_Name', data.Pr_Name);
            formData.append('Pr_Desc', data.Pr_Desc);
            formData.append('Pr_Price', data.Pr_Price);
            formData.append('Pr_Quantity', data.Pr_Quantity);
            formData.append('Ca_Id', data.Ca_Id);


            const token = JSON.parse(localStorage.getItem('userInfo')!).Token
            const res = await axios.post(`${Url}/product/new`,
            formData , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            return res.data.result;
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)


export const createProductSlice = createSlice({
    name : 'Product/new',
    reducers : {
        resetProductState : () =>  initialState
    },
    initialState,
    extraReducers(builder) {
    //    Pending Case 

        builder.addCase(newProductFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));

        // Fullfilled Case 
        builder.addCase(newProductFn.fulfilled , (_ , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }));

        // Rejeccted Case 
        builder.addCase(newProductFn.rejected , (_ , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }));
    },
});

export const { resetProductState } = createProductSlice.actions;