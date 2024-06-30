import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios , {AxiosError} from 'axios'
import { Url , E_Mssg } from '../../../Interfaces'


interface OrderResponse {
  IsSuccess : boolean,
  result : Order[]
}


export interface Order {
  Or_Id : number,
  Or_Status : string,
  Items : [],
  Or_Total : number,
  isPaid : boolean,
  Cr_Id : number
  Author_Id : number
  Is_Deleted : boolean
  Created_At : string
  Updated_At : string
}

const initialState = {
  IsSuccess : false,
  IsLoading : false,
  IsError : false,
  E_message : '',
  data : [] as Order []
}

export const getAllOrderFn = createAsyncThunk (
  'All/Categories',
  async (_ , { rejectWithValue}) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).Token
      const res = await axios.get<OrderResponse>(`${Url}/order/all` , {
        headers : {
          Authorization : `Bearer ${token}`
        }
      });
      return res.data.result
    } catch (error) {
      if(error instanceof AxiosError)
      return rejectWithValue(error.response?.data.message || E_Mssg)
      return rejectWithValue(E_Mssg)
    }
  }
)


export const getAllOrderSlice = createSlice({
  name : 'order/all',
  initialState ,
  reducers : {},
  extraReducers(builder) {
    // Pending Case
    builder.addCase(getAllOrderFn.pending , () => ({
      ...initialState,
      IsLoading : true
    }))
    // FullFilled Case
    builder.addCase(getAllOrderFn.fulfilled , (state , action) => ({
      ...initialState,
      IsSuccess : true,
      data : action.payload
    }));
    // Rejected Case
    builder.addCase(getAllOrderFn.rejected , (state , action) => ({
      ...initialState,
      IsError : true,
      E_message : String(action.payload)
    }))
  },
})