import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import axios , {AxiosError} from "axios"
import { Url , E_Mssg } from "../../../../Interfaces"
import { Category } from "./AllOfThem";

interface categoryResponse {
    IsSuccess: boolean;
    result: Category
  }
// const initialState
const initialState = {
    IsSuccess: false,
    IsError: false,
    IsLoading: false,
    Error_Message: "",
    data: {} as Category,
  };
  
  export const getOneTrashCategoryFn = createAsyncThunk(
    "All/Category",
    async (Ca_Id : any, { rejectWithValue }) => {
      try {
        const res = await axios.get<categoryResponse>(
          `${Url}/category/tget-one/${Ca_Id}`
        );
        return res.data.result;
      } catch (error) {
        if (error instanceof AxiosError)
          return rejectWithValue(error.response?.data.message || E_Mssg);
        return rejectWithValue(E_Mssg);
      }
    }
  );
  
  // Get One Category Slice
  export const OneTrashCategorySlice = createSlice({
    name: "category/get-one",
    reducers: {},
    initialState,
    extraReducers(builder) {
      // Pending Case
      builder.addCase(getOneTrashCategoryFn.pending, () => ({
        ...initialState,
        IsLoading: true,
      }));
  
      // FullFilled Case
      builder.addCase(getOneTrashCategoryFn.fulfilled, (state, action) => ({
        ...initialState,
        IsSuccess: true,
        data: action.payload,
      }));
  
      //    Rejected Case
      builder.addCase(getOneTrashCategoryFn.rejected, (state, action) => ({
        ...initialState,
        IsError: true,
        Error_Message: String(action.payload),
      }));
    },
  });
  