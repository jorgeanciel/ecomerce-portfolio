import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getToken from "../../utils/getConfig";

const cartSlice = createSlice({
    name: 'cart',
    initialState: { products: [] },
    reducers: {
        setCartGlobal: (state, action) => {
            return { ...state, products: action.payload }
        },
    }
})

export const { setCartGlobal } = cartSlice.actions;

export default cartSlice.reducer;

export const getUserCart = () => (dispatch) => {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart';

    axios
        .get(url, getToken())
        .then((res) => {
            dispatch(setCartGlobal(res.data),
            )
        })
        .catch((err) => {
            dispatch(setCartGlobal(null))
        });
}


