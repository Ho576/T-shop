import React, { useContext,useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../context/User';
import './Profile.css'; 

export default function Profile() {

  let {userData,loading} = useContext(UserContext)
  if(loading)return <p>...loading</p>

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={`container-fluid ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
            <li className="nav-item">
              <Link to={'/profile'} className="nav-link align-middle px-0">
                <span className="ms-1 d-none d-sm-inline"></span>
              </Link>
            </li>
            <li>
              <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                 <span className="ms-1 d-none d-sm-inline">User</span> </a>
              <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                <li className="w-100">
                  <Link to={'info'} className="nav-link px-0"> <span className="d-none d-sm-inline">User </span>Info</Link>
                </li>
                <li>
                  <Link to={'contact'} className="nav-link px-0"> <span className="d-none d-sm-inline">User </span>Content</Link>
                </li>
                <li>
                  <Link to={'getorders'} className="nav-link px-0"> <span className="d-none d-sm-inline">User </span>Orders</Link>
                </li>
                
              </ul>
            </li>    
          </ul>
            </div>
          </div>
          <div className="col py-3 hh">
          <button className="btn text-white tt" onClick={toggleSidebar}>
                Toggle Sidebar
              </button>
              {
                <Outlet userData={userData} /> 
              }
           
          </div>
        </div>
      </div>
    </>
  );
}

