import axios from 'axios';
import React, { Children, createContext, useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

export let UserContext = createContext();
const cookies = new Cookies();
export default function UserContextProvider({children}) {
    const [userToken,setUserToken] = useState(cookies.get('userToken'));
    const [userData,setUserData]  = useState(null);
    const [loading,setLoading]=useState(true);

    const getUserData = async ()=>{
        if(userToken){
            try{
                
                const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`,
                 {headers:{Authorization : `Tariq__${userToken}`}} );
                 setUserData(data.user);
                 setLoading(false);
            }
            catch(error){
                console.log(error)
            }
           
        }
        
    }
    useEffect (()=>{
        getUserData();
    },[userToken])
   
        
   
  return <UserContext.Provider value={{userToken,setUserToken,userData,setUserData,loading}}>
    {children}
  </UserContext.Provider>
}
