import React, { useContext } from 'react'
import { UserContext } from '../context/User'

export default function UserContact() {
    let {userData,loading} = useContext(UserContext)
    if(loading)return <p>...loading</p>
  return (

    
    <div className='container'>
    <p>Email : {userData.email}</p>
    {/* <p>Phone no : {userData.phoneNo}</p> */}
    </div>
  )
}
