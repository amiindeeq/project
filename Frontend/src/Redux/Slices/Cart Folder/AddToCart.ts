import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { E_Mssg, Url } from '../../../Interfaces'

export interface AddToCartResponse {
  IsSuccess: boolean
  result: AddToCart[]
}

interface AddToCart {
  Cr_Id: number
  Pr_Id: number
}

const initialState = {
  IsSuccess: false,
  IsLoading: false,
  IsError: false,
  E_message: '',
  data: {} as AddToCart,
}

export const AddToCartFn = createAsyncThunk(
  'cart/new',
  async (data: any, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).Token
      const res = await axios.post(
        `${Url}/cart/items/new/${data.Pr_Id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return res.data.result
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg)
      return rejectWithValue(E_Mssg)
    }
  }
)

// Creating Slice

export const AddToCartSlice = createSlice({
  name: 'cart/newest',
  reducers: {
    resetCarts: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    builder.addCase(AddToCartFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }))
    builder.addCase(AddToCartFn.fulfilled, (_, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }))
    builder.addCase(AddToCartFn.rejected, (_, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }))
  },
})

export const { resetCarts } = AddToCartSlice.actions
