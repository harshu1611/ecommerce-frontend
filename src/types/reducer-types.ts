import { CartItem, Shippinginfo, User } from "./types";

export interface userReducerInitialState{
    user: User | null,
    loading: boolean

}
export interface CartReducerInitialState{
    loading: boolean,
    cartItems:CartItem[],
    subTotal: number,
    tax: number,
    shippingCharges: number,
    discount: number,
    total: number,
    shippingInfo :Shippinginfo
}

