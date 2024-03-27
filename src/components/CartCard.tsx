import React from 'react'
import img from '../assets/images/laptop.jpg'
import { FaDeleteLeft } from 'react-icons/fa6'
import { AiFillDelete } from "react-icons/ai";
import { server } from '../redux/store';
import { useDispatch } from 'react-redux';
import { addToCart, calculateTotal } from '../redux/reducer/cartReducer';
import { CartItem } from '../types/types';


const CartCard = ({data}: any) => {

    const dispatch= useDispatch()
    console.log(data)

    const incrementQty=(data:any)=>{
        dispatch(addToCart({...data, quantity: data.quantity+1}))
        dispatch(calculateTotal())
    }

    
  return (
    <div className='flex flex-row w-screen p-8 justify-around'>
        <div className='flex flex-row items-center justify-evenly space-x-8'>
            <img src={`${server}/${data.photo}`} className='h-32 w-auto'></img>
            <div className='flex flex-col w-full '>
                <h1 className='text-xl'>{data.name}</h1>
                <h1 className='text-lg font-semibold'>Rs. {data.price}</h1>
            </div>
        </div>

        <div className='flex flex-row justify-center items-center space-x-4 w-full'>
            <div className='flex flex-row space-x-3 '>
                <button className='bg-gray-200 text-black h-8 w-8 rounded-lg'>
                    <h1>-</h1>
                </button>
                <h1 className='font-semibold'>{data.quantity}</h1>
                <button className='bg-gray-200 text-black h-8 w-8 rounded-lg' onClick={()=>{
                        incrementQty(data)
                }}>
                    <h1>+</h1>
                </button>
            </div>
            <AiFillDelete color='black' size={20}/>
        </div>
    </div>
  )
}

export default CartCard