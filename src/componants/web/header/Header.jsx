import React from 'react'
import './Header.css'

export default function Header() {
  return (
 <header>
  <div className="p-5 text-center bg-image mmmm" style={{backgroundImage: 'url("https://blog-frontend.envato.com/cdn-cgi/image/width=2560,quality=75,format=auto/uploads/sites/2/2022/04/E-commerce-App-JPG-File-scaled.jpg")', height: 450,}}>
    <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <div className="d-flex justify-content-center align-items-center h-100 mt-5">
        <div className="text-white">
          <h1 className="mb-3 ">Hossam E-Shop</h1>
        </div>
      </div>
    </div>
  </div>
</header>

  )
}
