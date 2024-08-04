import { createSlice } from "@reduxjs/toolkit";

const ItemCartSlice = createSlice({
  name: "ItemCartSlice",
  initialState: {
    item: [],
  },
  reducers: {
    addItem: (state, action) => {
      if (!state.item) {
        state.item = [action.payload];
      } else if (!state.item.some((exercise) => exercise === action.payload)) {
        state.item = [...state.item, action.payload];
      }
    },

    deleteItem: (state, action) => {
      if (state.item) {
        state.item = state.item.filter((dt) => dt !== action.payload);
      } else {
        state.item = null;
      }
    },
    clearCart: (state, action) => {
      state.item = [];
    },
  },
});

export const { addItem, deleteItem, clearCart } = ItemCartSlice.actions;

export default ItemCartSlice.reducer;
