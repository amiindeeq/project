import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, E_Mssg } from "../../../../Interfaces";
import { Category } from "./AllOfThem";

interface categoryResponse {
  IsSuccess: boolean;
  result: Category
}

const initialState = {
  IsSuccess: false,
  IsError: false,
  IsLoading: false,
  Error_Message: "",
  data: {} as Category,
};

export const getOneCategoryFn = createAsyncThunk(
  "All/Category",
  async (Ca_Id : any, { rejectWithValue }) => {
    try {
      const res = await axios.get<categoryResponse>(
        `${Url}/category/get-one/${Ca_Id}`
      );
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg);
      return rejectWithValue(E_Mssg);
    }
  }
);

// Get One Category Slice
export const OneCategorySlice = createSlice({
  name: "category/get-one",
  reducers: {},
  initialState,
  extraReducers(builder) {
    // Pending Case
    builder.addCase(getOneCategoryFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }));

    // FullFilled Case
    builder.addCase(getOneCategoryFn.fulfilled, (state, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }));

    //    Rejected Case
    builder.addCase(getOneCategoryFn.rejected, (state, action) => ({
      ...initialState,
      IsError: true,
      Error_Message: String(action.payload),
    }));
  },
});
