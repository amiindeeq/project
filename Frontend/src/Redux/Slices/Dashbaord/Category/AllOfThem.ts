import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { E_Mssg, Url , Product } from "../../../../Interfaces";


interface categoryResponse {
  IsSuccess : boolean;
  result : Category[]
}

export interface Category {
  Ca_Image: string | undefined;
  Ca_Id : string;
  Ca_Name : string;
  Ca_Desc : string;
  Author_Id : string;
  Publish : boolean;
  Is_Deleted : boolean;
  Created_At : string;
  Updated_At : string;
  Product : Product;
}

const initialState = {
  IsLoading : false,
  IsError : false,
  IsSuccess : false,
  E_message : '',
  data : [] as Category []
}

export const getAllCategoryFn = createAsyncThunk (
  'All/Categories',
  async (_ , { rejectWithValue}) => {
    try {
      const res = await axios.get<categoryResponse>(`${Url}/category/all`);
      return res.data.result
    } catch (error) {
      if(error instanceof AxiosError)
      return rejectWithValue(error.response?.data.message || E_Mssg)
      return rejectWithValue(E_Mssg)
    }
  }
)

// Creating Slice 

export const getAllCategorySlice = createSlice({
  name : 'Category/All',
  initialState,
  reducers : {},
  extraReducers(builder) {
    // Pending State 
    builder.addCase(getAllCategoryFn.pending , () => ({
      ...initialState,
      IsLoading : true,
    }));

    // Fullfilled Case 
    builder.addCase(getAllCategoryFn.fulfilled, (_ , action) => ({
      ...initialState,
      IsSuccess : true,
      data : action.payload
    }));

    // Rejected Case 
    builder.addCase(getAllCategoryFn.rejected , (_ , action) => ({
      ...initialState,
      IsError : true,
      E_message : String(action.payload)
    }));
  },
});