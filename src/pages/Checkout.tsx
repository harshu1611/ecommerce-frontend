// import {Elements, useElements, useStripe, PaymentElement} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
// import { useState } from 'react';
// import toast from 'react-hot-toast';
// import { Navigate, useLocation } from 'react-router-dom';

// // Make sure to call `loadStripe` outside of a component’s render to avoid
// // recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51OwSImSFFw8lOlOo27m4MUYeVXrJSROevupdEZ4rTiElxn7PePXEDeWFrLgabC1zkP0qMlqptgcHV5HX70NnY0I500MidRSmkd');

// const CheckoutForm=()=>{
//     const stripe = useStripe();
// const elements = useElements();
// const [isProcessing, setIsProcessing] = useState<boolean>(false);

//     const handleSubmit=async(e: any)=>{
//         e.preventDefault();


//         if (!stripe || !elements) return;
//         setIsProcessing(true);

         

//           const {paymentIntent,error} = await stripe.confirmPayment({
//             //`Elements` instance that was used to create the Payment Element
//             elements,
//             confirmParams: {
//               return_url: window.location.origin,
              
//             },
//             redirect: "if_required"
//           });
      
//           if (error) {
//             setIsProcessing(false);
//             return toast.error(error.message || "Something Went Wrong");
//           }
//           if (paymentIntent.status === "succeeded") {
//             // const res = await newOrder(orderData);
//             // dispatch(resetCart());
//             // responseToast(res, navigate, "/orders");

//           } else{
//             console.log("Payment error")
//           }
//           setIsProcessing(false);

//     }
    
  
//     return (
//         <div className="flex flex-col w-max-[200px]">
//         <form onSubmit={handleSubmit} className='flex flex-col'>
//           <PaymentElement className='flex flex-col'/>
//           <button type="submit" disabled={isProcessing}>
//             {isProcessing ? "Processing..." : "Pay"}
//           </button>
//         </form>
//       </div>
//     )

//   }


// export default function Checkout() {

//  const location= useLocation();
//  const {client_secret}=  location.state

// //  console.log(client_secret)
// //   const options = {
// //     // passing the client secret obtained from the server
// //     clientSecret: clientSecret,
// //   };

// if (!client_secret) return <Navigate to={"/shipping"} />;
  
//   return (
   
//     <Elements stripe={stripePromise} options={{clientSecret: client_secret}}>
//       <CheckoutForm />
//     </Elements>
//     // <div>ch kout</div>
//   );
// };


import { useCallback } from "react";
import useRazorpay from "react-razorpay"
import { useLocation } from 'react-router-dom';

const Checkout = () => {
    const location= useLocation()
    const order= location.state
    console.log(order)
    const [Razorpay] = useRazorpay();

    const handlePayment = useCallback(async() => {
    //   const order = await createOrder(params);

  
  
      const options = {
        key: import.meta.env.RAZORPAY_KEY,
        amount: (order.amount),
        currency: "INR",
        name: "Acme Corp",
        order_id: order.id,
        handler: (res: any) => {
          console.log(res);
        },
       
      };
  
      const rzpay = new Razorpay(options);

      rzpay.on("payment.failed", function (response: any) {
        console.log(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    
      rzpay.open();

      // rzpay.on("adminRoute")
    //   rzpay.open();
    }, [Razorpay]);

  
    return (
      <div className="App">
        <button onClick={handlePayment}>Click</button>
      </div>
    );
}

export default Checkout