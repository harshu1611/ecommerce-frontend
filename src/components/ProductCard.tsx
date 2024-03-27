
import { server } from '../redux/store'
import { useDispatch } from 'react-redux'
import { addToCart, calculateTotal } from '../redux/reducer/cartReducer'
import toast from 'react-hot-toast'

type ProductProps={
    productId: string,photo: string, name: string, price: number, stock: number

}


const ProductCard = ({productId,photo,name,price}: ProductProps) => {

  const dispatch= useDispatch();

const addToCartHandler=()=>{
    dispatch(addToCart({
      productId: productId,
      photo: photo,
      name: name,
      price: price,
      quantity: 1
    }))
    dispatch(calculateTotal())

    toast.success("Added To Cart")
}
  return (
    <div className='flex flex-col space-y-4 p-4 border-gray-400 rounded-lg border-2 border-solid h-full w-64'>
        <img src={`${server}/${photo}`} className='h-52 w-auto'></img>
        <h1 className='text-lg font-semibold text-gray-600 text-center'>{name}</h1>
        <h1 className='text-xl font-semibold text-black text-center '>Rs. {price}</h1>
        <button className='border-2 border-solid border-green-400 rounded-lg w-[50%] self-center' onClick={addToCartHandler}>
                    <h1 className='font-semibold'>+ Add To Cart</h1>
        </button>

    </div>
  )
}

export default ProductCard
