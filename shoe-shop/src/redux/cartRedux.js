import { createSlice } from "@reduxjs/toolkit";

//create slice to hold the states, reducers and actions
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    removeCart: (state) => {
      state.quantity = 0;
      state.products = [];
      state.total = 0;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((item) => item._id !== action.payload.productId);
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.total;
    },
  },
});

export const { addProduct, removeCart, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;
