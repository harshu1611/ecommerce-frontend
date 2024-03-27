
import OrderCard from '../components/OrderCard'
import { useMyOrdersQuery } from '../redux/api/orderApi'
import { useSelector } from 'react-redux'
import { getUserSelector } from '../redux/store'
import Skeleton from 'react-loading-skeleton'

const Orders = () => {
  
  const user=useSelector(getUserSelector)
  const {data , isLoading}= useMyOrdersQuery(user.user._id)

 console.log(data)
  

  return (
    <div className='h-screen w-screen'>
        <div className='mt-10 ml-20 mr-20'>
        <h1 className='text-black text-3xl uppercase'>My Orders</h1>
        <h1 className='text-center uppercase text-2xl mt-10'>Orders</h1>
        <div className='flex flex-col space-y-4'>
        {
          isLoading ? <Skeleton containerClassName="flex-1 " height={40}  count={5}/> :
          data?.orders.map((order)=>{

            return(
              <div className='flex flex-col space-y-4'>
                 <OrderCard amount={order.total} status={order.status} id={order._id} discount={order.discount} />
              </div>
             
            )
          })
        }
        </div>
      
        </div>

       
    </div>
  )
}

export default Orders