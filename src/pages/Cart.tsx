import React, { useState } from 'react'
import CartCard from '../components/CartCard'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCartDetails } from '../redux/store'
import { CartItem } from '../types/types'
import { calculateTotal } from '../redux/reducer/cartReducer'

const Cart = () => {
  const [coupon, setCoupon]= useState("")
 const [isValidCoupon, setIsValidCoupon]= useState(false)

 const cartData= useSelector(getCartDetails)

 console.log(cartData)




  return (
    <div className='flex flex-row size-full h-screen'>
      <div className='flex flex-col w-[70%] h-full'>
        {
           cartData && cartData.cartItems.map((data:CartItem)=>{
                return <CartCard data={data}/>
            })
        }
    {/* <CartCard/> */}
      </div>

      <div className='flex flex-col w-[30%] h-full justify-center items-start space-y-6 '>
      <h1 className='text-lg'> Subtotal: {cartData.subTotal}</h1>
      <h1 className='text-lg'> Shipping Charges: {cartData.shippingCharges}</h1>
      <h1 className='text-lg'> Tax: {cartData.tax}</h1>
      <h1 className='text-lg'> Discount: {cartData.discount}</h1>

      <h1 className='text-lg font-semibold'> Total: {cartData.total}</h1>

      <input className='p-3 border-2 border-gray-300 rounded-lg w-[70%]' placeholder='Enter Coupon Code' value={coupon}onChange={e=>setCoupon(e.target.value)}></input>
      {
        coupon && isValidCoupon && <div>
          <h1 className='text-green-500'>Discount Rs. 400 applied using Coupon {coupon}</h1>
        </div>
      }
       {
        coupon && !isValidCoupon && <div>
          <h1 className='text-red-500'>Invalid Coupon Code</h1>
        </div>
      }
      <button className='bg-green-600 text-white font-semibold rounded-lg h-14 w-20 p-2'>
       <Link to="/shipping">

       <h1 className='text-white'>Order</h1>
       </Link> 
      </button>

    
      </div>
    </div>
  )
}

export default Cart