import { createAsyncThunk  , createSlice} from '@reduxjs/toolkit'
import axios , { Axios, AxiosError} from 'axios'
import { E_Mssg , Url } from '../../../Interfaces'

interface reviewResponse {
    IsSuccess : boolean,
    result : Reveiw[]
}

export interface Reveiw {
    Rev_Id : string;
    Rating : string;
    Comment : string;
    Author_Id : string;
    Pr_Id : string;
    User : {
        U_Id : number;
        Firstname : string;
        Lastname : string;
        Username : string
    }
}

const initialState = {
    IsLoading : false,
    IsError : false,
    IsSuccess : false,
    E_message : '',
    data : [] as Reveiw[]
}

export const getAllReviewsFn =  createAsyncThunk(
    'review/All',
    async ( _ , {rejectWithValue}) => {
        try {
            const res = await axios.get<reviewResponse>(`${Url}/review/all`);
            return res.data.result
        } catch (error) {
            // console.log(error)
          if(error instanceof AxiosError)
          return rejectWithValue(error.response?.data.message || E_Mssg)
          return rejectWithValue(E_Mssg)
        }
    }
)

// Creating Review Slice 

export const getAllReviewSlice = createSlice({
    name : 'review/All',
    reducers : {},
    initialState,
    extraReducers(builder) {
        builder.addCase(getAllReviewsFn.pending , () => ({
            ...initialState,
            IsLoading  : true
        })) 

        builder.addCase(getAllReviewsFn.fulfilled , (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))

      builder.addCase(getAllReviewsFn.rejected , (state , action) => ({
        ...initialState,
        IsError : true,
        E_message : String(action.payload)
      }))
    },
})