import { CreateApi, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilterRequestType, FilterResponseType, ProductsResponse } from "../../types/apiTypes";


export const productsApi= createApi({
    reducerPath:"productsApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`}),
    endpoints: (builder)=>({
        latestProducts: builder.query<ProductsResponse, "">({
            query: ()=>"/latest"

        }),
        allProducts:builder.query<ProductsResponse, "">({
            query: ()=>"/all"

        }),
        categories:builder.query({
            query: ()=>"/categories"

        }),
        filterProducts: builder.query<FilterResponseType,FilterRequestType>({
            query:({price,search,sort,page,category})=> {
                let base=`all?search=${search}&page=${page}`;

                if(price){
                    base += `&price=${price}`
                }
                if(sort){
                    base += `&sort=${sort}`
                }
                if(category){
                    base += `&category=${category }`
                }

                return base
            },
        })
    }),

});

export  const {useLatestProductsQuery, useAllProductsQuery, useCategoriesQuery, useFilterProductsQuery}= productsApi