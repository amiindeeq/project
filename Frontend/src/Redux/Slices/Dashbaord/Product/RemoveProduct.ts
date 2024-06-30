import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'
import { Url, E_Mssg } from '../../../../Interfaces'

const initialState = {
  isSuccess: false,
  IsLoading: false,
  IsError: false,
  E_message: '',
  data: {},
}

export const RemoveProductFn = createAsyncThunk(
  'product/publshing',
  async (Pr_Id: any, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).Token
      const res = await axios.delete(`${Url}/product/delete/${Pr_Id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || E_Mssg)
      return rejectWithValue(E_Mssg)
    }
  }
)

// Creating Slice

export const RemoveProductSlice = createSlice({
  name: 'product/delete',
  initialState,
  reducers: {
    resetRemovePro : ()=>initialState
  },
  extraReducers(builder) {
    builder.addCase(RemoveProductFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }))

    builder.addCase(RemoveProductFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }))

    builder.addCase(RemoveProductFn.rejected, (_, action) => ({
      ...initialState,
      IsError: true,
      E_message: String(action.payload),
    }))
  },
})


export const {resetRemovePro} = RemoveProductSlice.actions