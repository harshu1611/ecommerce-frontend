import React, { useEffect, useState } from 'react'
import { Slider, RangeSlider } from 'rsuite';
import ProductCard from '../components/ProductCard';
// import Productdata from '../assets/products.json'
import { useAllProductsQuery, useCategoriesQuery, useFilterProductsQuery } from '../redux/api/productsApi';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';

const Search = () => {
const dispatch=useDispatch()

  const [search, setSearch]= useState("")
  const [sort, setSort]= useState("")
  const [maxPrice, setMaxPrice]= useState(100000)
  const [category, setcategory]= useState("")
  const [page, setPage]= useState(1)

    const [filter,setFilter]= useState({
      search: search,
      sort: sort,
      price: maxPrice,
      category: category
    })


  const {data: productsData, isLoading: allLoading}= useAllProductsQuery("")
  const {data: categoriesData, }= useCategoriesQuery("")

  const {data: filterData, error,  isLoading:filterLoading}= useFilterProductsQuery({
    search: search,
    sort: sort,
    price: maxPrice,
    category: category
  })

//   useEffect(() => {
    
  
// console.log(filterData)
// if(error){
//   console.log(error)
// }
  
//   }, [search,maxPrice,sort,category])
  

  // console.log(categoriesData)

  return (
    <div className='px-8 flex flex-row h-screen w-screen'>
      <div className='w-[20%] shadow-xl shadow-gray-400 flex flex-col mb-10 p-4 '>
        <h1 className='uppercase text-xl' >filters</h1>
        <label className='mt-2 font-semibold'>
            Sort
        </label>
        <div className='p-2 border-gray-300 border-2 border-solid rounded-md mt-1'>
        <select className='w-full' value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="None" className='w-full '>None</option>
          <option value="asc">Price- Ascending</option>
          <option value="desc">Price- Descending</option>

        </select>
        </div>
        <label className='mt-2 font-semibold'>
           Max Price: {maxPrice}
        </label>
      <input type='range' value={maxPrice} min={100} max={100000} onChange={e=>setMaxPrice(Number(e.target.value))}></input>
      <label className='mt-2 font-semibold'>
            Category
        </label>
      <div className='p-2 border-gray-300 border-2 border-solid rounded-md mt-1'>
        <select className='w-full' value={category} onChange={e=>setcategory(e.target.value)}>
          <option value="" className='w-full '>All</option>
          {
            categoriesData?.categories.map((data: any)=>{
              return  <option value={data}>{data}</option>
            })
          }
          

        </select>
        </div>
      </div>
    <div className='ml-12 w-screen flex flex-col space-y-4'>
    <h1 className='uppercase font-serif text-black text-2xl'>products</h1>
    <input type="text" value={search} className='w-full border-2 p-2 border-solid border-gray-300 rounded-md h-10' placeholder='Search By Name' onChange={e=>setSearch(e.target.value)}/>

    

    {
      search || category || sort || maxPrice ? 

      filterLoading ? <Skeleton containerClassName="flex-1 " height={40}  count={5}/> :
      
      <div className='flex flex-row mt-6 justify-between'>
        
      {
        filterData?.products.map((data:any)=>{
          return <ProductCard name={data.name} photo={data.photo} price={data.price} productId='' stock={data.stock}/>
        })
      }
  
      </div>
      // <Skeleton containerClassName="flex-1 " height={40}  count={5}/>

       : 
       allLoading ?
        <Skeleton containerClassName="flex-1 " height={40}  count={5}/>
     :

        <div className='flex flex-row mt-6 justify-between'>
        
     {
       productsData?.products.map((data:any)=>{
         return <ProductCard name={data.name} photo={data.photo} price={data.price} productId={data._id} stock={data.stock} />
       })
     }
 
     </div>

      
    }
   
    </div>
    
    </div>
  )
}

export default Search





