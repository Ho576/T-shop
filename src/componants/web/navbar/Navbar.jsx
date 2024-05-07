import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './../context/User';
import { CartContext } from './../context/Cart';
import './Navbar.css'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Navbar() {
  
  let {count} = useContext(CartContext);
  let {userToken,setUserToken,userData,setUserData } =useContext(UserContext)
 
  
  const logout = () => {
    // Remove userToken cookie
    cookies.remove('userToken');
  
    // Clear userToken and userData from context
    setUserToken(null);
    setUserData(null);
  };
  
  return (
    <nav className="navbar navbar-expand-lg nb">
    <div className="container">
    <a className="navbar-brand" href="#">H-shop</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>


        <li className="nav-item">
        <a className="nav-link" href="#">Products</a>
      </li>
     {
      userToken&& <li className="nav-item">
      <Link className="nav-link" to="/cart" >Cart <span className='bg-secondary'>{count}</span></Link>
      
      
    </li>
     }
     
      </ul>
      <ul className="navbar-nav">
      <li className="nav-item dropdown">
      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {userData?userData.userName:'Account'}
      </a>
      {}
      <ul className="dropdown-menu ">
        {!userToken?
        <>
        <li><Link className="dropdown-item" to="/register">register</Link></li>
        <li><hr className="dropdown-divider" /></li>
        <li><Link className="dropdown-item" to="/login">login</Link></li>
      </>
      :
      <>
      <li><Link className="dropdown-item" to="/profile">profile</Link></li>
      <li><hr className="dropdown-divider" /></li>
      <li><Link className="dropdown-item" to="/" onClick={logout}>logout</Link></li>
    </>

        }

        
      </ul>
    </li>
      </ul>
   
    </div>
  </div>
</nav>

  )
}
