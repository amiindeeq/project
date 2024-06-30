import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : {
      Username: "",
      Firstname: "",
      Lastname: "",
      Token: "",
      Role : ""
    };

const userInfoSlice = createSlice({
  name: "userInfo",
  reducers: {
    setUser: (state, action) => {
      
      state.Username = action.payload.Username;
      (state.Firstname = action.payload.Firstname),
        (state.Lastname = action.payload.Lastname),
        (state.Token = action.payload.token);
        (state.Role = action.payload.Role);

      localStorage.setItem("userInfo", JSON.stringify(state));
    },

    logout: (state) => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("user");
      state.Username = "";
      state.Firstname = "";
      state.Lastname = "";
      state.Token = "";
      state.Role = "";
    },
  },
  initialState,
});

export default userInfoSlice;
export const { setUser, logout } = userInfoSlice.actions;
