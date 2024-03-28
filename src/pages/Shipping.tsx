import { useCallback, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addShippingDetails, resetCart } from '../redux/reducer/cartReducer'
import axios from 'axios'
import { getCartDetails, getUserSelector, server } from '../redux/store'
import useRazorpay from 'react-razorpay'
import toast from 'react-hot-toast'
import { useNewOrderMutation } from '../redux/api/orderApi'
import { NewOrderRequestBody } from '../types/apiTypes'

const Shipping = () => {

    const dispatch= useDispatch()
    const [Razorpay] = useRazorpay();
   
    // console.log(orderData)
    // console.log(user)
    const [shippingDetails, setShippingDetails]=useState({
        address:'',
        city:'',
        state:'',
        country: '',
        pinCode: ''
    })
    const navigate=useNavigate()



    const changeHandler=(e: any)=>{
        setShippingDetails((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    const setShipping=()=>{
        dispatch(addShippingDetails(shippingDetails))
        // console.log(shippingDetails)
        navigate("/pay")


    }





    // console.log(orderData)
   


 

   
  return (
    <div className='flex flex-col justify-center items-center p-4 space-y-4'>
        <button className='absolute top-8 left-8' onClick={()=>navigate("/cart")}>
            <BiArrowBack size={24}/>
        </button>
        <h1 className='uppercase text-black text-3xl' >shipping address</h1>
        <input className='border-gray-300 border-2 border-solid rounded-md p-2 w-96' placeholder='Address' value={shippingDetails.address} onChange={(e)=>changeHandler(e)} name='address' type='text'></input>
        <input className='border-gray-300 border-2 border-solid rounded-md p-2 w-96' placeholder='City' value={shippingDetails.city} onChange={(e)=>changeHandler(e)} name='city'  type='text'></input>
        <input className='border-gray-300 border-2 border-solid rounded-md p-2 w-96' placeholder='Country' value={shippingDetails.country} onChange={(e)=>changeHandler(e)} name='country'  type='text'></input>
        <input className='border-gray-300 border-2 border-solid rounded-md p-2 w-96' placeholder='State' value={shippingDetails.state}  onChange={(e)=>changeHandler(e)}  name='state'  type='text'></input>
        <input className='border-gray-300 border-2 border-solid rounded-md p-2 w-96' placeholder='pinCode' value={shippingDetails.pinCode} onChange={(e)=>changeHandler(e)}  name='pinCode' type='number'></input>
       
   
        <button className='bg-green-600 w-auto p-3 rounded-lg' onClick={setShipping}>
        <h1 className='text-white font-semibold'>PAY NOW</h1>
    </button>
      
       
    </div>
  )
}

export default Shipping