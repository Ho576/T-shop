import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Loding() {
    const [loading,setLoading]=useState(true)
    let navigate=useNavigate();
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          setLoading(false);
        }, 1000); 
    
        return () => clearTimeout(timeoutId);
      }, []); 
    
      if (loading) return(<div className="d-flex justify-content-center">
      <div className="spinner-border mt-5" role="status">
      </div>
    </div>)
      else {
        navigate(-1);
        return null; 
      }
  
}
