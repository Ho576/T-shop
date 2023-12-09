import { RouterProvider} from "react-router-dom";
import {router} from './layouts/routes'
import { useContext, useEffect } from "react";
import { UserContext } from "./componants/web/context/User";
import { CartContext } from "./componants/web/context/Cart";



export default function App() {

  let {setUserToken} = useContext(UserContext);
  let {getCartContext,count,setCount} = useContext(CartContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setUserToken(localStorage.getItem("userToken"))
     setCount( getCartContext().count);
    }
    },[]);

    
  

  return (
      
      <RouterProvider router={router} />
    
  )
}
