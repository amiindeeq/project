import { createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import axios ,{ AxiosError } from 'axios'
import { E_Mssg, Url } from '../../Interfaces'

interface UserLoginData {
    Username : string,
    Firstname : string,
    Lastname : string,
    Jointed_At : string,
    Token : string
}

const initialState = {
    data : {
        result:{} as any
    },
    IsLoading : false,
    IsSuccess : false,
    IsError : false,
    E_Message : '',
}

export const LoginFn = createAsyncThunk(
    'user/login',
    async (data : UserLoginData , { rejectWithValue}) => {
        try {
            const res =  await axios.post(`${Url}/user/login` , data);
            return res.data
        } catch (error) {
            if( error instanceof AxiosError)
            return rejectWithValue(error.response?.data.message || E_Mssg)
            // console.log(error.response.data)
            return rejectWithValue(E_Mssg)
        }
    }
    
);


export const LoginSlice = createSlice({
    name : 'login',
    reducers : {
        reset : () => initialState,
    },
    initialState : initialState,
    extraReducers : (builder) => {
        // Pending Case
        builder.addCase(LoginFn.pending , () => ({
            ...initialState,
            IsLoading : true
        }));

        // Fullfilled Case  
        builder.addCase(LoginFn.fulfilled , (_, action) => ({
            ...initialState,
            IsSuccess : true,
            data : action.payload
            
        }));

        // Rejected Case 
        builder.addCase(LoginFn.rejected , (_, action) => ({
            ...initialState,
            IsError :true,
            E_Message : String(action.payload)
        }));
    },
});

export const { reset } = LoginSlice.actions;