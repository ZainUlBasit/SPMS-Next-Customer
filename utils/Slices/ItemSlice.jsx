import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetCompanyApi, GetItemApi } from "../../Https";

export const fetchItems = createAsyncThunk("fetch/ItemDetails", async () => {
  try {
    const response = await GetItemApi();
    console.log(response.data);
    return response.data.data.payload;
  } catch (error) {
    console.log(error);
  }
  return [];
});

// export const fetchAdminNotification = createAsyncThunk(
//   "fetchAdminNotification",
//   async (query = {}) => {
//     let response;
//     try {
//       response = await GetAdminNotificationApi({});
//       console.log(response);
//       console.log(response.data.data);
//       console.log(response.data.data.payload);
//       return response?.data?.data?.payload || response.data.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const ItemSlice = createSlice({
  name: "items",
  initialState: {
    loading: true,
    data: [],
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      console.log("Error", action);
      // console.log("Error", action.payload);
      state.loading = false;
      state.isError = true;
    });
  },
});

export default ItemSlice.reducer;
