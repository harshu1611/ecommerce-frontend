import React, { useCallback, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { FaBackward } from 'react-icons/fa'
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
    const user= useSelector(getUserSelector)
    // console.log(user)
    const [shippingDetails, setShippingDetails]=useState({
        address:'',
        city:'',
        state:'',
        country: '',
        pinCode: ''
    })

    const [addressS, setAddress]= useState("")

    const changeHandler=(e: any)=>{
        setShippingDetails((prev)=>({...prev, [e.target.name]: e.target.value}))
    }
    const setShipping=()=>{
        dispatch(addShippingDetails(shippingDetails))
        console.log(shippingDetails)

    }

    const {cartItems,
        discount,
        shippingCharges,
        shippingInfo,
        subTotal,
        tax,
        total}= useSelector(getCartDetails)

    const orderData: NewOrderRequestBody={
        orderItems: cartItems,
        subTotal: subTotal,
        tax:tax,
        shippingCharges: shippingCharges,
        discount: discount,
        total: total,
        shippingInfo : shippingInfo,
        user: user.user._id
    }
    const navigate=useNavigate()

    // console.log(orderData)
   

    const [newOrder]= useNewOrderMutation()
    const handlePayment = useCallback(async(order:any) => {
        //   const order = await createOrder(params);
    
          const options = {
            key: import.meta.env.RAZORPAY_KEY,
            amount: (order.amount),
            currency: "INR",
            name: "Acme Corp",
            order_id: order.id,
            handler: async(res: any) => {

               try {
                const result= await newOrder(orderData);
                dispatch(resetCart())
                // console.log(result)
                toast.success("Order Placed")
                navigate("/orders")
               } catch (error) {
                    console.log(error)
               }
            
            },
           
          };
      
          const rzpay = new Razorpay(options);
    
          rzpay.on("payment.failed", function (response: any) {
            console.log(response.error.code);
            alert(response.error.description);
            // alert(response.error.source);
            // alert(response.error.step);
            // alert(response.error.reason);
            // alert(response.error.metadata.order_id);
            // alert(response.error.metadata.payment_id);
          });
        
          rzpay.open();
    
          // rzpay.on("adminRoute")
        //   rzpay.open();
        }, [Razorpay]);

 

    const submitHandler=async()=>{
        setShipping();

        try {
             
            const {data} = await axios.post(`${server}/api/v1/payment/create`, {
                amount: orderData.total
            },
            {
                headers:{
                    "Content-Type": "application/json"
                }

            }
            
            )

            // navigate("/pay" , {
            //     state: data.order
            // })

            await handlePayment(data.order)

            
        } 
        
        
        
        catch (error) {
            toast.error("Error in creating payment")
        }   

      


       
    }
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
        {/* <button className='bg-green-600 w-auto p-3 rounded-lg' onClick={()=>setShipping()}>
            <h1 className='text-white font-semibold'>Add shipping</h1>
        </button> */}
    
        <button className='bg-green-600 w-auto p-3 rounded-lg' onClick={submitHandler}>
            <h1 className='text-white font-semibold'>PAY NOW</h1>
        </button>
    </div>
  )
}

export default Shipping