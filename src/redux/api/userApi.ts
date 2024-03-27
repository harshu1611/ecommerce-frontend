import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../store";
import { MessageResponse, UserResponse } from "../../types/apiTypes";
import { User } from "../../types/types";
import axios from "axios";



export const userApi= createApi({
    reducerPath:"userApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/user/`}),
    endpoints: (builder)=>({
        login: builder.mutation<MessageResponse, User>({    //Mutation is used for manipulation, post, put while QUERY is used only for        fetching or get methods      login is an endpoint, there can be various endpoints

            query: (user)=>({              // server/api/v1/user/new          
                                                // query will return something so it should be returned
                url: "new",
                method: "POST",
                body: user,             //user will be passed in body
            })
        }),
    }),

});

export const getUser=async(id:string)=>{
    try {
        const {data}:{data:UserResponse}= await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)

        return data
    } catch (error) {
            console.log(error)
            throw error
    }
}

export const {useLoginMutation}= userApi;