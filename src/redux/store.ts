import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productsApi } from "./api/productsApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";



export const server=import.meta.env.VITE_SERVER

export const store= configureStore({
    reducer:{
        [userApi.reducerPath]: userApi.reducer,
        [userReducer.name]: userReducer.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [cartReducer.name]: cartReducer.reducer,
        [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (mid) => mid().prepend(
        userApi.middleware, productsApi.middleware, orderApi.middleware
    ),
})

export const getUserSelector=(state:any)=>state.userReducer

export const getCartDetails=(state:any)=>state.cartReducer