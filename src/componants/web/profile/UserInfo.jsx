import React, { useContext } from 'react'
import { UserContext } from '../context/User'

export default function UserInfo() {
    let {userData,loading} = useContext(UserContext)
    if(loading)return <p>...loading</p>
  return (
        <div className='container'>
        <img className='w-25 p-3' src={userData.image.secure_url}/>
        <p>Name : {userData.userName}</p>
        </div>
  )
}
