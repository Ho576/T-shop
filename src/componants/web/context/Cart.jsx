import axios from "axios";
import { createContext, useState } from "react"
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const CartContext = createContext(null);

export default function CartContextProvider({children}) {

    let [count,setCount]= useState(0) ;

    const addToCartContext = async(productId)=>{
        try{

            const token = cookies.get('userToken');
            const {data}= await axios.post(`${import.meta.env.VITE_API_URL}/cart`,{productId} ,
            {headers:{Authorization:`Tariq__${token}`}}
            )
            if(data.message=='success'){
                setCount(count + 1);
                toast.success('product added succesfuly', {
                
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }

        }
        catch(error){
            console.log(error);
        }
    }

    const getCartContext = async ()=>{
        try{

            const token = cookies.get('userToken');
            const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/cart` ,
            {headers:{Authorization:`Tariq__${token}`}}
            )
            console.log(data);
            setCount(data.count);
            return data;

        }
        catch(error){
            console.log(error);
        }

    }
    const removeItemContext = async (productId)=>{
        try{
            const token = cookies.get('userToken');
            const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,{productId} ,
            {headers:{Authorization:`Tariq__${token}`}}
            )
            setCount(count - 1);
            return data;
            

        }
        catch (error){
            console.log(error);
        }
    }
    const clearCartContext = async ()=>{
        try{
            const token = cookies.get('userToken');
            const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear` ,null,
            {headers:{Authorization:`Tariq__${token}`}}
            )
            setCount(0);
            return data;
        }
        catch (error){
            console.log(error);
        }
    }

    const incraseQuantityContext = async (productId)=>{
        try{
            const token = cookies.get('userToken');
            const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
           
        }
        catch (error){
            console.log(error);
        }
    }
    const decraseQuantityContext = async (productId)=>{
        try{
            
            const token = cookies.get('userToken');
            const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            
        }
        catch (error){
            console.log(error);
        }
    }
    
    
    
  return (
    <CartContext.Provider value={{addToCartContext,getCartContext,removeItemContext,count,setCount,clearCartContext,incraseQuantityContext,decraseQuantityContext}}>
        {children}
    </CartContext.Provider>
  )
}
