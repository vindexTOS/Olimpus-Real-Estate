import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "./Auth-thunk";
const initialState = {
  userName: "",
  password: "",
  token: "",
  error: "",
  succsess: "",
  loading: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getUserName: (state, action) => {
      state.userName = action.payload;
    },
    getPassword: (state, action) => {
      state.password = action.payload;
    },
    getToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.succsess = "user has logged in";
      })
      .addCase(LoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something Went Wrong";
        console.log(action.error.message);
      });
  },
});

export const { getUserName, getPassword, getToken } = AuthSlice.actions;

export default AuthSlice.reducer;
