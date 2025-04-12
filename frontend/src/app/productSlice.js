import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload;
    },
    createProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {},
    deleteProduct: (state, action) => {
      const pid = action.payload;
      state.products = state.products.filter((p) => p._id !== pid);
    },
  },
});

export const { getAllProducts, createProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
