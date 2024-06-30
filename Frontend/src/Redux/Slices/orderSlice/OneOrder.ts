import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Url, E_Mssg, OneOrder } from "../../../Interfaces";
import { Product } from "../Dashbaord/Product/AllOfThem";

interface OneOrderResponse {
    IsSuccess : boolean
    Item : Order
}

interface Order {
  Or_Id: number;
  Or_Status: string;
  Item: [
    {
      Product: {
        Pr_Id: number;
        Pr_Name:string;
        Pr_Desc: string;
        Pr_Price: number;
        Pr_Quantity: number;
        Pr_Image: string
        Ca_Id: number;
        Author_Id: number;
        Published: boolean;
        Is_Deleted: boolean;
        Created_At: string;
        Updated_At: string;
      };
      Quant: number;
    }
  ];
  Or_Total: number;
  isPaid: boolean;
  Cr_Id: number;
  Author_Id: number;
  Is_Deleted: boolean;
  Created_At: string;
  Updated_At: string;
}

const initialState = {
  IsSuccess: false,
  IsError: false,
  IsLoading: false,
  E_message: "",
  data : [] as any,
};

export const getOneOrderFn = createAsyncThunk(
  "order/one",
  async (Or_Id : any, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("userInfo")!).Token;
      const res = await axios.get<OneOrderResponse>(`${Url}/order/get-one/${Or_Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.Item)
      return res.data.Item;
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg);
      return rejectWithValue(E_Mssg);
    }
  }
);

export const getOneOrderSlice = createSlice({
  name: "order/get-one",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Pending Case
    builder.addCase(getOneOrderFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }));
    // FullFilled Case
    builder.addCase(getOneOrderFn.fulfilled, (state, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }));
    // Rejected Case
    builder.addCase(getOneOrderFn.rejected, (state, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }));
  },
});
