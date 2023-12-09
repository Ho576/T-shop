import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/User';

export default function Profile() {
    let {userData,loading} = useContext(UserContext)
    

  if(loading)return <p>...loading</p>
    
  return (
    <>
    <img className='w-25 p-3' src={userData.image.secure_url}/>
    <p>Name : {userData.userName}</p>
    <p>Email : {userData.email}</p>
    </>
  )
}
