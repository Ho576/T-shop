import React, { useContext } from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import {changePasswordSchema} from '../validayion/Validayion.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function ChangePassword() {

   const navigate = useNavigate();
    const initialValues={
        email:'',
        password:'',
        code :'',
    };

    const onSubmit = async user=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,user);
       
        console.log(data)
        if(data.message == 'success'){
            toast.success('changed succesfuly', {
                
                position: "top-right",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/');
            
        } 
     };

     const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema:changePasswordSchema
    });

    const inputs =[
        {
            id:'email',
            type:'email',
            name:'email',
            title:'user email',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'user password',
            value:formik.values.password,
        },
        {
            id:'code',
            type:'text',
            name:'code',
            title:'sended code',
            value:formik.values.code,
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
    <div className="container">
        <h2 className="text-center text-white">change password</h2>
        <h2 className="text-center mb-4">Change Password</h2>
  <form onSubmit={formik.handleSubmit}>
    <div >
      {renderInputs}
      <button type="submit" className="btn btn-primary" disabled={!formik.isValid}>
        Change
      </button>
    </div>
  </form>
        </div> 
  )
}
