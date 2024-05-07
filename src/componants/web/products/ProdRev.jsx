import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function ProdRev({revs}) {
const navigate = useNavigate();
  const {productId} = useParams('productId')
    const initialValues={
        comment:'',
        rating:0,
    };
    const onSubmit = async revv=>{
        const token = cookies.get('userToken');
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${productId}/review`,revv
        ,{headers:{Authorization:`Tariq__${token}`}}
        );

          if(data.message == 'success'){
            toast.success('posted succesfuly', {
                
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/Loading');
            
        } 
     };

     const formik = useFormik({
        initialValues,
        onSubmit,
    });
  


    const Star = () => <span className="bi-star-fill" style={{ color: 'gold' }}></span>;
    const RatingStars = ({ rating }) => {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 !== 0;
    
      const starsArray = Array.from({ length: fullStars }, (_, index) => <Star key={index} />);
      
      if (halfStar) {
        starsArray.push(<span key="half-star" className="bi-star-half" style={{ color: 'gold' }}></span>);
      }
    
      return (
        <div>
          {starsArray}
        </div>
      );
    };
  return (
   <div className="row d-flex justify-content-center">
  <div className="col-md-8 col-lg-6">
    <div className="card shadow-0 border" style={{backgroundColor: '#f0f2f5'}}>
      <div className="card-body p-4">
        <div className="form-outline mb-4">
            <form onSubmit={formik.handleSubmit}>
            <input type="text" id="comment" className="form-control" placeholder="Type comment..." value={formik.values.comment} name='comment' onChange={formik.handleChange} />
          
          <label htmlFor="rating">Select a rating:</label>
          <select id="rating" value={formik.values.rating} name='rating' onChange={formik.handleChange} >
            <option value="0">0</option>
            <option value="0.5">0.5</option>
            <option value="1">1</option>
            <option value="1.5">1.5</option>
            <option value="2">2</option>
            <option value="2.5">2.5</option>
            <option value="3">3</option>
            <option value="3.5">3.5</option>
            <option value="4">4</option>
            <option value="4.5">4.5</option>
            <option value="5">5</option>
          </select>
          <input type="submit" className='btn btn-primary m-2' />    
            </form>
          
         
        </div>
        {
            revs.map((rev,index)=><div className="card mb-4">
            <div key={index} className="card-body">
              <p>{rev.comment}</p>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-row align-items-center">
                  <img src={rev.createdBy.image.secure_url} alt="avatar" width={25} height={25} />
                  <p className="small mb-0 ms-2">{rev.createdBy.userName}</p>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <i className="far fa-thumbs-up mx-2 fa-xs text-black" style={{marginTop: '-0.16rem'}} />
                    <div className="d-flex justify-content-center small text-warning mb-2">
                    <RatingStars rating={rev.rating} />
             
              </div>

                </div>
              </div>
            </div>
          </div>

            )
        }
        
      </div>
    </div>
  </div>
</div>

  )
    }
