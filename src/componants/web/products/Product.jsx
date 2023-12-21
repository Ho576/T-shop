import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart';
import ProdRev from './ProdRev';

export default function Product() {
    const {productId}=useParams();
    const {addToCartContext}=useContext(CartContext);
    const getProduct = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);
        return data.product;
    }

    const {data,isLoading} =useQuery('product',getProduct);
    const addToCart =async(productId)=>{
        const res = await addToCartContext(productId);
        console.log(res);
        
    }
    const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % data.subImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? data.subImages.length - 1 : prevIndex - 1
    );
  };
    if(isLoading)
    {
        return <p>loading .......</p>
    }
  return (
    <div className="container ">
    <div className="row">
      <div className="col-lg-4">
        <div id="productImageCarousel" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner my-5">
            {data.subImages.map((img, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                <img src={img.secure_url} className="d-block w-100" alt={`Subimage ${index + 1}`} />
              </div>
            ))}
          </div>
          <a className="carousel-control-prev" href="#productImageCarousel" role="button" data-slide="prev" onClick={handlePrev}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#productImageCarousel" role="button" data-slide="next" onClick={handleNext}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="col-lg-8 my-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{data.name}</h2>
            <p className="card-text lead">{data.price}</p>
            <button className="btn btn-outline-info" onClick={() => addToCart(data._id)}>
              Add To Cart
            </button>
            
          </div>
        </div>
        <ProdRev revs={data.reviews}/>
      </div>
    </div>
  </div>
  
    
  )

}

