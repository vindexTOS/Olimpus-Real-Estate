import { ThunkDispatch, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

type UserObjType = {
  userName: string;
  password: string;
};
export const LoginThunk = createAsyncThunk(
  "login/post",
  async (obj: UserObjType) => {
    const cookies = new Cookies();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}admin/login`,
        { ...obj }
      );

      const token = res.data;
      axios.defaults.headers.common["token"] = `Bearer ${token}`;
      const decode: any = jwtDecode(token);
      cookies.set(`token`, token, {
        expires: new Date(decode.exp * 1000),
      });

      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("ERROR");
    }
  }
);

// export const RegistrationThunk = createAsyncThunk(
//   "register/post",
//   async (obj: UserObjType) => {
//     const cookies = new Cookies();
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_BASE_API_URL}register`,
//         { ...obj }
//       );

//       const token = res.data;
//       axios.defaults.headers.common["token"] = `Bearer ${token}`;
//       const decode: any = jwtDecode(token);
//       cookies.set(`token`, token, {
//         expires: new Date(decode.exp * 1000),
//       });

//       return res.data;
//     } catch (error) {
//       console.log(error);
//       throw new Error("ERROR");
//     }
//   }
// );
