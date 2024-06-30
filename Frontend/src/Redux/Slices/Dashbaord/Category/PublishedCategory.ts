import { PayloadAction, createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios , { AxiosError} from "axios";
import { E_Mssg , Url } from "../../../../Interfaces";



interface publishedResponse {
    IsSuccess : boolean;
    result : Category[]
}

export interface Category {
    Ca_Id : string;
    Ca_Name : string;
    Ca_Desc : string;
    Ca_Image : string | undefined;
    Author_Id : string;
    Published : boolean;
    IsDeleted : boolean;
    Created_At : string;
    Updated_At : string;
  }

const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_Mssg : '',
    data : [] as Category []
}


export const getAllPublishedCategoryFn = createAsyncThunk (
    'All/Category',
    async (_ , { rejectWithValue}) => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')!).Token;
        const res = await axios.get<publishedResponse>(`${Url}/category/published` , {
          headers : {
            Authorization : `Bearer ${token}`
          }
        });
        return res.data.result
      } catch (error) {
        if(error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg)
        return rejectWithValue(E_Mssg)
      }
    }
  )


// Creating Slice 

export const getAllCategoryPublishedSlice = createSlice({
    name : 'category/published',
    initialState , 
    reducers : {},
    extraReducers(builder) {
        // Pending Case 
        builder.addCase(getAllPublishedCategoryFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));

        // FullFilled Case

       builder.addCase(getAllPublishedCategoryFn.fulfilled  , (state , action) => ({
        ...initialState,
        IsLoading : true,
        data : action.payload
       }))


        // Rejected Case

        builder.addCase(getAllPublishedCategoryFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            E_Mssg : String(action.payload)
        }));
    },
});

