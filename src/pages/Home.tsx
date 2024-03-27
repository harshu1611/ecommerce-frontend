import React from 'react'
import ProductCard from '../components/ProductCard'
import Productdata from '../assets/products.json'
import { Link } from 'react-router-dom'
import cover from '../assets/images/cover.jpg'
import { useLatestProductsQuery } from '../redux/api/productsApi';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Home = () => {
  const {data, isLoading, error} = useLatestProductsQuery("")
  return ( 
    <div className='w-full p-12 flex flex-col'>
      <section className='w-full'>
        <img src={cover} className='w-full h-80'></img>
      </section>
      <div className='flex flex-row w-full justify-between items-center'>
      <h1 className='text-3xl uppercase'>Latest Products</h1>
      <Link to="/search">
      <h1 className=' text-xl uppercase text-gray-600'>More</h1>
      </Link>
     
      </div>
      
    {
      isLoading?
      <Skeleton containerClassName="flex-1 " height={40}  count={5}/>
      :
      <div className='flex flex-row items-center p-2 justify-evenly'>
    {

     data?.products.map((data:any)=>{
      // console.log(data)
        return(
              <ProductCard name={data.name} productId={data._id} price={data.price} stock={data.stock} photo={data.photo}/>
        )
      })
    }
          
      </div>
    }

      
    </div>
  )
}

export default Home