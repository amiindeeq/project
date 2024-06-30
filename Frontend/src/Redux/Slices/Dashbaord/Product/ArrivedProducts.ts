import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { E_Mssg, Url } from "../../../../Interfaces";

interface ProductResponse {
  IsSuccess: boolean;
  result: Product[];
}

interface Product {
  Pr_Id: number;
  Pr_Name: string;
  Pr_Desc: string;
  Pr_Price: number;
  Pr_Quantity: number;
  Pr_Image: string;
  Ca_Id: number;
  Author_Id: number;
  Published: boolean;
  Is_Deleted: boolean;
  Arrival: boolean;
  Created_At: string;
  Updated_At: string;
}

const initialState = {
  IsSuccess: false,
  IsLoading: false,
  IsError: false,
  E_message: "",
  data: [] as Product[],
};

export const ArrivedProductFn = createAsyncThunk(
  "product/arrive",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<ProductResponse>(`${Url}/product/arrived`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg);
      return rejectWithValue(E_Mssg);
    }
  }
);


export const ArrivedProductSlice = createSlice({
    name : '/product/arrived',
    reducers : {},
    initialState,
    extraReducers(builder) {
        // Pending Case 
        builder.addCase(ArrivedProductFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }))
        // FullFilled Case 
        builder.addCase(ArrivedProductFn.fulfilled, (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))
        // Rejected Case
        builder.addCase(ArrivedProductFn.rejected , ( state , action) => ({
            ...initialState,
            E_message : String(action.payload)
        }))
    },
})