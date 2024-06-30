import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { E_Mssg, Url } from '../../../../Interfaces'

interface ProductResponse {
  IsSuccess: boolean
  result: Product[]
}

export interface Product {
  Pr_Id: string
  Pr_Name: string
  Pr_Desc: string
  Pr_Price: string
  Pr_Quantity: string
  Pr_Image: string
  Ca_Id: string
  Published: boolean
  Deleted: boolean
  Created_At: string
  Updated_At: string
}

const initialState = {
  IsLoading: false,
  IsSuccess: false,
  IsError: false,
  E_Message: '',
  data: [] as Product[],
}

export const PublishedProductFn = createAsyncThunk(
  'product/all',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get<ProductResponse>(`${Url}/product/all`)

      return res.data.result
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg)
      return rejectWithValue(E_Mssg)
    }
  }
)

// Creating Product Published Slice
export const PublishedProductSlice = createSlice({
  name: 'product/published',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Pending Case
    builder.addCase(PublishedProductFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }))
    // FullFilled Case
    builder.addCase(PublishedProductFn.fulfilled, (state, action) => ({
      ...initialState,
      IsSuccess: true,
      data: action.payload,
    }))
    // Rejected Case
    builder.addCase(PublishedProductFn.rejected, (state, action) => ({
      ...initialState,
      IsError: true,
      E_Message: String(action.payload),
    }))
  },
})
