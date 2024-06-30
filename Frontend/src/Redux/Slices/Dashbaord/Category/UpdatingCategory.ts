import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios , {  AxiosError} from "axios";
import { Url , E_Mssg } from "../../../../Interfaces";
import { Category } from "./AllOfThem";
import { useParams } from "react-router-dom";

const {Ca_Id} = useParams;

const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    Error_Message : '',
    data: {} as Category
}


export const  updatingCategory = createAsyncThunk(
    'category/update',
    async (data : any   , {rejectWithValue}) => {
        try {

            const formData = new FormData()
            formData.append("Ca_Image",data.Ca_Image)
            formData.append("Ca_Name",data.Ca_Name)
            formData.append("Ca_Desc",data.Ca_Desc)
            const token = JSON.parse(localStorage.getItem('userInfo')!).Token;
            const res = await axios.put(`${Url}/category/update/:Ca_Id`,formData, {
                headers :{
                    Authorization : `Bearer ${token}`
                },
            });
            return res.data.result;
            
        } catch (error) {
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)

            return rejectWithValue(E_Mssg)
        }
    }

)

export const updatingCategorySlice = createSlice({
    name : ' Category/update',
    reducers : {
        resetCategoryState : () => initialState
    },
    initialState,
    extraReducers(builder) {
        //   Pending Case 

        builder.addCase(updatingCategory.pending, () => ({
           ...initialState,
           IsLoading: true
        }));

      //   Fullfilled Case 

      builder.addCase(updatingCategory.fulfilled , (_,action) => ({
        ...initialState,
        IsSuccess : true,
        data : action.payload
      }));

    //   Rejected Case 

    builder.addCase(updatingCategory.rejected , (_, action) => ({
        ...initialState,
        IsError : true,
        Error_Message : String(action.payload),
    }));
    },
});

export const { resetCategoryState } = updatingCategorySlice.actions;