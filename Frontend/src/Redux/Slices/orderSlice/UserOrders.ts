import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, E_Mssg } from "../../../Interfaces";

interface userOrderData {
  IsSuccess: boolean;
  result: UserData[];
}

interface UserData {
  Or_Id: number;
  Or_Status: String;
  Items: [
    {
      Product: {
        Pr_Id: number;
        Pr_Name: string;
        Pr_Desc:string;
        Pr_Price: number;
        Pr_Quantity: number;
        Pr_Image: string;
        Ca_Id: number;
        Author_Id: number;
        Published: Boolean;
        Is_Deleted: Boolean;
        Created_At:Date;
        Updated_At: Date;
      };
    }
  ];
  Or_Total: number;
  Cr_Id: number;
  Author_Id: number;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
}

// Initial State
const initialState = {
  IsSuccess: false,
  IsError: false,
  IsLoading: false,
  E_message: "",
  data: [] as UserData[],
};

// Making Hinting
export const userOrderFn = createAsyncThunk(
  "user/order",
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")!).Token;
      const res = await axios.get<userOrderData>(`${Url}/order/userOrder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message || E_Mssg);
      }
      return rejectWithValue(E_Mssg);
    }
  }
);

export const userOrderSlice = createSlice({
  name: "order/userOrder",
  reducers: {},
  initialState,
  extraReducers(builder) {
    // Pending Case
    builder.addCase(userOrderFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }))
   builder.addCase(userOrderFn.fulfilled,(_,action)=>({
    ...initialState,
    IsSuccess:true,
    data : action.payload
   }))
    builder.addCase(userOrderFn.rejected, (_, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }));
  },
});
