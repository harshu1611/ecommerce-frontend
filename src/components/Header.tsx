import React, { useState } from 'react'
import { FaSearch, FaShoppingBag, FaSignInAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
// import '../index.css'
import '../tailwind.css'
import { User } from '../types/types'
// import firebase from 'firebase/compat/app'
import { signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/api/userApi'
import { userNotExist } from '../redux/reducer/userReducer'
import { auth } from '../firebase'
import toast from 'react-hot-toast'


interface PropsType{
    user: User | null
}

const Header = ({user}: PropsType) => {
    const [openDialog, setOpenDialog]= useState(false)
//    console.log(user)
const dispatch= useDispatch()

const logout=async()=>{
    try {
        const data= await signOut(auth)
   toast.success("Log Out Succesful")

    // dispatch(userNotExist())

    } catch (error) {
        toast.error("Error")
        console.log(error)
    }
   
}
  return (
     <nav className='flex w-full flex-row  justify-end  items-center h-auto p-2 space-x-4 mt-4'>
        <Link to={"/"} className='text-red-600 text-2xl'>Home</Link>
        <Link to={"/search"}><FaSearch color='black' size={24}/></Link>
        <Link to= {"/cart"}><FaShoppingBag size={24}/></Link>

        {
            user?._id ? (
                <>
                <button onClick={()=>setOpenDialog(!openDialog)}>
                    <FaUser size={24}/>
                </button>
                <dialog open={openDialog} className='absolute w-full'>
                    <div className='flex flex-col space-y-2 absolute right-[20px] bg-white  mt-8 border-2 border-gray-300 border-solid p-4 text-lg'>
                        {
                            user.role==="admin" && (
                                <Link to="/admin/dashboard">Admin</Link>
                            )
                        }

                        <Link to={"/orders"}>Orders</Link>
                        <button onClick={logout}>
                            <h1>Log Out</h1>
                        </button>
                    </div>
                </dialog>
                </>
            ) : (
                <Link to={"/login"}><FaSignInAlt/></Link>
            )
        }
    </nav>
  )
}

export default Header