import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { E_Mssg, Url } from "../../../../Interfaces";
import { Category } from "./AllOfThem";


// Interface Response Data
interface RecycleResponse {
  IsSuccess: boolean;
  result: Category[];
}

export interface RecycleData {
  Ca_Id : string;
  Ca_Name : string;
  Ca_Desc : string;
  Ca_Image : string;
  Published : boolean;
  IsDeleted : boolean;
  Created_At : string;
  Updated_At : string;
}

const initialState = {
  IsSuccess: false,
  IsLoading: false,
  IsError: false,
  E_Mssg: "",
  data: [] as Category [],
};

export const categoryRecycleFn = createAsyncThunk(
  "category/recycle",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<RecycleResponse>(`${Url}/category/trash`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg);
      return rejectWithValue(E_Mssg);
    }
  }
);

// Recycle Pin Slice
export const recyclePinSlice = createSlice({
  name: "category/recycle",
  initialState,
  reducers: {},
  extraReducers(builder) {
    //  Pending State 
    builder.addCase(categoryRecycleFn.pending , () => ({
      ...initialState,
      IsLoading : true
    }));
    // Fullfilled Case 
    builder.addCase(categoryRecycleFn.fulfilled , (state , action) => ({
      ...initialState,
      IsSuccess : true,
      data : action.payload
    }));
    // Rejected Case 
    builder.addCase(categoryRecycleFn.rejected , (state , action) => ({
      ...initialState,
      IsError : true,
      E_Mssg : String(action.payload)
    }))
  },
});
