import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios ,  {  AxiosError } from "axios";
import { Url , E_Mssg } from "../../../../Interfaces";
import { Category } from "./AllOfThem";


const initialState = {
    IsSuccess : false,
    IsLoading : false,
    IsError : false,
    Error_Message : '',
    data : {} as Category
}

export const createCategoryFn = createAsyncThunk(
    'category/new',
    async (data :any , {rejectWithValue}) => {
        try {

            const formData = new FormData()
            formData.append('Ca_Image', data.Ca_Image);
            formData.append("Ca_Name",data.Ca_Name)
            formData.append("Ca_Desc",data.Ca_Desc)

            const token = JSON.parse(localStorage.getItem('userInfo')!).Token;
            const res = await axios.post(`${Url}/category/new`, formData , {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                
            });
            // console.log(res.data)
            return res.data.result;
        } catch (error) {
            if (error instanceof AxiosError)
            return rejectWithValue (error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
);


export const createCategorySlice = createSlice({
    name : 'create/category',
    reducers : {
        resetCategoryState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        // Pending Case 

        builder.addCase(createCategoryFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));

       //  Fullfilled Case 

       builder.addCase(createCategoryFn.fulfilled , (_, action) => ({
        ...initialState,
        IsSuccess : true,
        data : action.payload
       }));
       

      //  Rejected Case 

      builder.addCase(createCategoryFn.rejected, (_,action) => (
        console.log(action.payload),
        {
        ...initialState,
        IsError : true,
        Error_Message : String(action.payload)
      }));

    },
});


export const { resetCategoryState } = createCategorySlice.actions;