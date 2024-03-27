
type OrderType={
    id: string,
    discount: number,
    amount: number,
    status: string,
   
}
const OrderCard = ({id,discount,amount,status}: OrderType) => {
  return (
    <div className='flex flex-row w-full p-3 justify-around border-2 border-solid border-black'>
        {/* <img src={img} className='h-28 w-auto'/> */}
        <div className='flex flex-col space-y-4'>
            <h1 className='text-lg'>Order Id: {id}</h1>
            {/* <h1 className='text-lg'>Quantity: {quantity}</h1> */}

        </div>
        <div className='flex flex-col space-y-4'>
            <h1 className='text-lg'>Discount: {discount}</h1>
            <h1 className='text-lg'>Amount: {amount}</h1>
            
        </div>
        <div className='flex flex-col space-y-4'>
            <h1 className='text-lg'>Status: {status}</h1>
            <button className='bg-blue-300 rounded-md text-blue-800 text-sm p-3'>
                View Details
                </button>            
        </div>
    </div>
  )
}

export default OrderCard