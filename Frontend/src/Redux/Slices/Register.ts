import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { E_Mssg, Url, UserRegistrationData } from "../../Interfaces";

interface response {
  U_Id: number;
  Firstname: string;
  Lastname: string;
  Username: string;
  Phone: number;
  Email: string;
  Password: string;
  Joined_At: string;
  Role: string;
  IsAdmin: boolean;
}

interface stateInterface {
  IsLoading: boolean;
  IsError: boolean;
  IsSuccess: boolean;
  E_message: string;
  data: response;
}

const initialState: stateInterface = {
  data: {} as response,
  IsLoading: false,
  IsError: false,
  IsSuccess: false,
  E_message: "",
};

export const registerFn = createAsyncThunk(
  "user/new",
  async (data: UserRegistrationData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${Url}/user/new`, data);
      localStorage.setItem("user", JSON.stringify(res.data));
      console.log(res);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data?.message);
        return rejectWithValue(error.response?.data?.message);
      }
      return rejectWithValue(E_Mssg);
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  reducers: {
    resetRegisterState: () => initialState,
  },
  initialState,
  extraReducers: (builder) => {
    // Pending Case
    builder.addCase(registerFn.pending, () => ({
      ...initialState,
      IsLoading: true,
    }));

    // Fullfilled Case
    builder.addCase(registerFn.fulfilled, (_,action) => ({
      ...initialState,
      IsSuccess: true,
      data : action.payload
    }));

    // Rejected Case
    builder.addCase(registerFn.rejected, (_, action) => {
      return {
        ...initialState,
        E_message: action.payload as string,
        IsError: true,
      };
    });
  },
});

export default registerSlice;
export const { resetRegisterState } = registerSlice.actions;
