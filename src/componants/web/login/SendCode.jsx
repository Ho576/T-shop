import React from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import {sendCodeSchema} from '../validayion/Validayion.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function SendCode() {

   const navigate = useNavigate();
    const initialValues={
        email:'',
    };

    const onSubmit = async user=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,user);
          if(data.message == 'success'){
            toast.success('sended succesfuly', {
                
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/changePassword');
            
        } 
     };

     const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:sendCodeSchema
    });

    const inputs =[
        {
            id:'email',
            type:'email',
            name:'email',
            title:'user email',
            value:formik.values.email,
        }
     
    ]

    const renderInputs = inputs.map( (input,index)=>
    <Input type={input.type}
     id={input.id}
      name={input.name}
       title={input.title}
       value={input.value}
        key={index}
        errors={formik.errors}
        onChange={formik.handleChange}
        touched={formik.touched}
        onBlur={formik.handleBlur}

        />)


  return (
   
<div className="container ">
  <h2 className="text-center text-white">Send Code</h2>
  <h2 >Send Code</h2>
  <form onSubmit={formik.handleSubmit}>
    <div className="form-group ">
      {renderInputs}
    </div>
    <div className="form-group ">
      <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>
        Send Code
      </button>
    </div>
  </form>
</div> 
  )
}
