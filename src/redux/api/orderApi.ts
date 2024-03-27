import {
  CreateApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
    AllOrders,
  FilterRequestType,
  FilterResponseType,
  MessageResponse,
  NewOrderRequestBody,
  ProductsResponse,
} from "../../types/apiTypes";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequestBody>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order, 
      }),
    }),
     myOrders:builder.query<AllOrders, "">({
        query: (id) => ({
          url: `myOrders?id=${id}`,
        }),
      }),
  }),
});

export const {useNewOrderMutation, useMyOrdersQuery} = orderApi;
