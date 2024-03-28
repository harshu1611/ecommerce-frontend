import React, { useCallback } from 'react'
import useRazorpay from 'react-razorpay'
import { useNewOrderMutation } from '../redux/api/orderApi';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart } from '../redux/reducer/cartReducer';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getCartDetails, getUserSelector, server } from '../redux/store';
import { NewOrderRequestBody } from '../types/apiTypes';

const Checkout = () => {
  const dispatch= useDispatch()
  const [newOrder]= useNewOrderMutation()
  const navigate=useNavigate()
  const [Razorpay] = useRazorpay();
  const user= useSelector(getUserSelector)


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

    console.log(shippingInfo)
  const handlePayment = useCallback(async(order:any) => {
      //   const order = await createOrder(params);
  
        const options = {
          key: import.meta.env.RAZORPAY_KEY,
          amount: (order.amount),
          currency: "INR",
          name: "Acme Corp",
          order_id: order.id,
          handler: async(res: any) => {
              console.log(res)
             try {
              const result= await newOrder(orderData);
              dispatch(resetCart())
              console.log(result)
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



  const makePayment=async()=>{
      // setShipping();

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

         
          await handlePayment(data.order)

          
      } 
      
      
      
      catch (error) {
          toast.error("Error in creating payment")
      }   

 
     
  }
  return (
    <div className='flex w-full justify-center items-center'>
       <button className='bg-green-600 w-auto p-3 rounded-lg' onClick={makePayment}>
    <h1 className='text-white font-semibold'>PAY NOW</h1>
</button>
    </div>
   
  )
}

export default Checkout