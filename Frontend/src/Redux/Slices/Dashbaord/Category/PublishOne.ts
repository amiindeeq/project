import { createSlice , createAsyncThunk } from '@reduxjs/toolkit'
import axios , { Axios, AxiosError} from 'axios'
import { Url , E_Mssg } from '../../../../Interfaces'
import { Category } from './AllOfThem'


// Initial State
const initialState = {
    IsLoading : false,
    IsError : false,
    IsSuccess : false,
    E_message : '',
    data : {} as Category
}

// Creating Function Calls Backend
export const PublishCategoryFn = createAsyncThunk(
    'category/publish',
    async ( Ca_Id : any , {rejectWithValue}) => {
        try {

            const token = JSON.parse(localStorage.getItem('userInfo')!).Token
            const res = await axios.put(`${Url}/category/publish/${Ca_Id}` , {} , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            })
            return res.data
            
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            return rejectWithValue(E_Mssg)
        }
    }
)

// Creating Slice 

export const publishingCategorySlice = createSlice({
    name : 'publish/category',
    reducers : {},
    initialState,
    extraReducers(builder) {
        // Pending Case
        builder.addCase(PublishCategoryFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }))
        // Fullfilled Case 
        builder.addCase(PublishCategoryFn.fulfilled , (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        })) 
        // Rejected Case 
        builder.addCase(PublishCategoryFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})