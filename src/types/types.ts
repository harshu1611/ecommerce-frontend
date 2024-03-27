export interface User{
    name: string,
    email: string,

     photo: string,
  
     role: string, 
   
     _id: string, 

}

export interface Products{
    _id: string
    name: string,
    photo: string,

     category: string,
  
     stock: number, 
   
     price: number
     
}

export type Shippinginfo ={
        address: string,
        city: string,
        state: string,
        pinCode: number,
        country: string


}

export type CartItem={
    productId: string,
    photo: string
    name: string
    price: number
    quantity: number,
}

export type OrderItem={
    productId: string,
    photo: string
    name: string
    price: number
    quantity: number,
  _id: string
}

export type Order={
    orderItem : OrderItem[],
    shippingInfo: Shippinginfo,
    subTotal: number,
    tax: number,
    shippingCharges: number,
    discount: number,
    total: number,
    status: string, 
    user: {
        name: string, 
        _id: string
    };
    _id: string
}