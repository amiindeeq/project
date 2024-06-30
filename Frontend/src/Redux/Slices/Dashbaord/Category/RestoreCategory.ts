import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios , { AxiosError} from 'axios'
import { Url , E_Mssg } from '../../../../Interfaces'
import { Category } from './AllOfThem'


// InitialSate
const initialState = {
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_message : '',
    data : {} as Category
}

export const restoreCategoryFn = createAsyncThunk(
    'categor/restore',
    async(Ca_Id : any, {rejectWithValue}) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')!).Token
            const res = await axios.put(`${Url}/category/restore/${Ca_Id}` , {} , {
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
export const restoreCategorySlice = createSlice({
    name : 'category/restore',
    reducers : {},
    initialState, 
    extraReducers(builder) {
        // Pending Case
        builder.addCase(restoreCategoryFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }))
        // Fullfilled Case 
        builder.addCase(restoreCategoryFn.fulfilled , (state , action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
        }))
        // Rejected Case 
        builder.addCase(restoreCategoryFn.rejected , (state , action) => ({
            ...initialState,
            IsError : true,
            E_message : String(action.payload)
        }))
    },
})