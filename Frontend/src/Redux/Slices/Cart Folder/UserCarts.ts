import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { E_Mssg, Items, Url } from '../../../Interfaces'

interface UserCartResponse {
  IsSuccess: boolean
  result: UserCart
}

interface UserCart {
  Cr_Id: number
  U_Id: number
  Cart_Item: Items[]
}

const initialState = {
  IsSuccess: false,
  IsLoading: false,
  IsError: false,
  E_message: '',
  data: {} as UserCart,
}

export const UserCartFn = createAsyncThunk(
  'cart/alls',
  async (_, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).Token
      const res = await axios.get<UserCartResponse>(`${Url}/cart/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data.result
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg)
      return rejectWithValue(E_Mssg)
    }
  }
)

export const UserCartSlice = createSlice({
  name: 'cart/oneUser',
  reducers: {
    resetAddCart : ()=>initialState
  },
  initialState,
  extraReducers(builder) {
    builder.addCase(UserCartFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }))

    builder.addCase(UserCartFn.fulfilled, (state, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }))

    builder.addCase(UserCartFn.rejected, (state, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }))
  },
})

export const {resetAddCart} = UserCartSlice.actions