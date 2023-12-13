import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function GetOrders() {
    const getOrders= async()=>{
        try{
            const token = localStorage.getItem("userToken");
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/order`,
            {headers:{Authorization:`Tariq__${token}`}}
            )
            return data.orders;
        }
        catch (error){
            console.log(error);
        }
    }
    const {data,isLoading}= useQuery("orders",getOrders);
    

    if(isLoading)
    {
        return <p>loading ...</p>
    }
  return (
    <>
     
    { data?.map((order,index)=>(

<div key={index} className='container order'>
    <b>Order No {index+1}</b>
     <p>Address : {order.address}</p>
     <p>phoneNumber : {order.phoneNumber} </p>
     <p>Coupon Name :{order.couponName} </p>
     <p>finalPrice : {order.finalPrice} </p>
     <p>paymentType : {order.paymentType} </p>
</div>
    ))
    
    }
    </>
  ) 
}
