import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
  name: 'products',
  initialState: null,
  reducers: {
    setProducts: (state, action) => action.payload,
    ascendingOrderProducts: (state) => {
      state.sort((a, b) => +a.price - +b.price);
    },
    descendingOrderProducts: (state) => {
      state.sort((a, b) => +b.price - +a.price);
    },
    ascendingOrderProductsByName: (state) => {
      state.sort((a, b) => a.title.localeCompare(b.title));
    },
    descendingOrderProductsByName: (state) => {
      state.sort((a, b) => b.title.localeCompare(a.title));
    },
  },
});

export const {
  setProducts,
  ascendingOrderProducts,
  descendingOrderProducts,
  ascendingOrderProductsByName,
  descendingOrderProductsByName,
} = productsSlice.actions;

export default productsSlice.reducer;

export const getAllProductsThunk = () => (dispatch) => {
  const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/products';
  axios.get(url)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err));
};


export const getProductsByCategory = (id) => (dispatch) => {
  const url = `https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`;
  axios
    .get(url)
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => console.log(err));
};