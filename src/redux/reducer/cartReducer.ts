import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { SiPayloadcms } from "react-icons/si";
import { CartItem } from "../../types/types";

const initialState: CartReducerInitialState={
    loading: false,
    cartItems:[],
    discount: 0,
    shippingCharges:0,
    shippingInfo:{
        address: "",
        city: "",
        country: "",
        pinCode: 0,
        state: ""
    },
    subTotal: 0,
    tax: 0,
    total: 0
}


export const cartReducer=createSlice({
    name:'cartReducer',
    initialState,
    reducers:{
        addToCart: (state,action: PayloadAction<CartItem>)=>{
                state.loading= true;

                const index= state.cartItems.findIndex((i)=>i.productId===action.payload.productId);
                
                if(index !==-1) state.cartItems[index]= action.payload
               else  state.cartItems.push(action.payload);
                state.loading=false
        },
        removeFromCart: (state,action: PayloadAction<string>)=>{
            state.loading= true,
            state.cartItems.filter(i=>i.productId !==action.payload)  //filter using productId
            state.loading=false
         },

         calculateTotal:(state)=>{
            let subTotal=0;
            for(let i=0; i<state.cartItems.length; i++){
                    const item= state.cartItems[i];

                    subTotal += (item.price)*(item.quantity);
            }

            state.subTotal= subTotal;
            state.shippingCharges= (subTotal > 1000) ? 200 : 0;
            state.tax= (subTotal*0.18);
            state.total= state.subTotal + state.shippingCharges+state.tax
         },

         addShippingDetails:(state,action)=>{
          state.shippingInfo= action.payload
         },
         resetCart: (state)=> initialState
    }
})

export const {addToCart,removeFromCart, calculateTotal, addShippingDetails, resetCart}= cartReducer.actions