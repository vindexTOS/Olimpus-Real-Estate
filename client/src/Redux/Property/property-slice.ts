import { createSlice } from "@reduxjs/toolkit";
import {
  CreatePropertyThunk,
  Deleteproperty,
  GetAllpropertysThunk,
  GetMoreData,
  GetSinglePropert,
  Updateproperty,
  UploadPhotos,
} from "./property-thunk";

type InitialPropertyStateType = {
  data: any[];
  moreData: any[];
  pictures: File[];
  userID: string;
  singleProperty: {} | any;
  error: string;
  succsess: string;
  loading: boolean;
  isDelete: boolean;
};

const initialState: InitialPropertyStateType = {
  data: [],
  moreData: [],
  pictures: [],
  singleProperty: {},
  userID: "",
  error: "",
  succsess: "",
  loading: false,
  isDelete: true,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    getpropertys: (state, action) => {
      state.data = action.payload;
    },
    getPictures: (state, action) => {
      console.log(action.payload);
      state.pictures = action.payload;
    },
    setSuccsess: (state) => {
      state.succsess = "";
    },
    getError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreatePropertyThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(CreatePropertyThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.succsess = "Your property has been submited";
      })
      .addCase(CreatePropertyThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something went wrong";
      })
      .addCase(GetAllpropertysThunk.pending, (state, action: any) => {
        state.data = action.payload;

        state.loading = true;
        state.error = "";
      })
      .addCase(GetAllpropertysThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(GetAllpropertysThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something Went Wrong";

        console.log(action.error.message);
      })

      .addCase(GetSinglePropert.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(GetSinglePropert.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProperty = action.payload;
      })
      .addCase(GetSinglePropert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "something went wrong";
      })
      .addCase(Updateproperty.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Updateproperty.fulfilled, (state, action) => {
        state.loading = false;
        state.succsess = "property Updated ";
        console.log(action);
      })
      .addCase(Updateproperty.rejected, (state, action) => {
        state.loading = false;
        state.error = "Cannot Be Updated";
        console.log(action);
      })
      .addCase(Deleteproperty.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(Deleteproperty.fulfilled, (state, action) => {
        state.loading = false;
        state.isDelete = !state.isDelete;
        state.succsess = "Propertie has been deleted";
      })
      .addCase(Deleteproperty.rejected, (state, action) => {
        state.loading = false;
        state.error = "Propertie cannot be deleted";
      });
  },
});

export const { getpropertys, setSuccsess, getError, getPictures } =
  propertySlice.actions;

export default propertySlice.reducer;
