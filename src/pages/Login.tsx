import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase'
import { useLoginMutation } from '../redux/api/userApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { MessageResponse } from '../types/apiTypes'

const Login = () => {
  const login : any = useLoginMutation()[0]
  const loginHandler=async()=>{
      try {
        const provider=new GoogleAuthProvider()
      const {user}=  await signInWithPopup(auth, provider)

    const res=  await login({
        name: user.displayName!,
        email:user.email!,
        photo:user.photoURL!
        ,role:"user", _id: user.uid
      })

      if("data" in res){
          toast.success(res.data.message)
      }else{
        const error= res.error as FetchBaseQueryError
        const message= (error.data as MessageResponse).message
        toast.error(message)
        console.log(error, message)
      }
      console.log(user)
      } catch (error) {
        toast.error("Sign In Failed")
        console.log(error)
      }
  }


  return (
    <>
    {/*
      This example requires updating your template:

      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    */}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
            
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p>
      </div>
      <div className='self-center mt-5'>
        <p>Already Signed In Once?</p>
        <button className='flex flex-row items-center space-x-3 p-2' onClick={loginHandler}>
          <FcGoogle size={32}/> <span>Sign In with Google</span>
        </button>
      </div>
    </div>
  </>
  )
}

export default Login