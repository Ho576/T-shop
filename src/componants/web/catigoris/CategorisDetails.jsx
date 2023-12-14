import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

export default function CategorisDetails() {
    const {categoryId}=useParams();

    const getCategoryDetails = async ()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }

    const {data,isLoading} =useQuery('category_details',getCategoryDetails);

    if(isLoading)
    {
        return <p>loading .......</p>
    }
  return (
    <div className="container">
  <div className="row">
    {data?.length ? (
      data.map((product) => (
        <div className="col-md-4 mb-4 mt-5" key={product._id}>
          <div className="card">
            <img
              src={product.mainImage.secure_url}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <Link to={`/products/${product._id}`} className="btn btn-primary">
                Details
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-12 mt-5">
        <h2>No products</h2>
      </div>
    )}
  </div>
</div>
  )
}
