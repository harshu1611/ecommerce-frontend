import { CartItem, Order, Products, Shippinginfo, User } from "./types"

export type MessageResponse={
    success: boolean,
    message: string
}

export type UserResponse={
    success: boolean,
    user: User
}

export type ProductsResponse={
    success: boolean,
    products: Products[]
}

export type FilterRequestType={
    search? : string,
    sort?: string,
    price? : number,
    category?: string,
    page?: number
}

export type FilterResponseType={
    success: boolean,
    products: Products[],
    totalPage: number
}

export type NewOrderRequestBody={
    orderItems:CartItem[],
    subTotal: number,
    tax: number,
    shippingCharges: number,
    discount: number,
    total: number,
    shippingInfo :Shippinginfo,
    user: string
}

export type AllOrders={
    success: boolean,
    orders: Order[]
}