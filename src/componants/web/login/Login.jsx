import React, { useContext } from 'react'
import Input from '../../pages/Input'
import { useFormik } from 'formik'
import { loginSchema } from '../validayion/Validayion.js'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Login() {
  let { setUserToken, userToken } = useContext(UserContext);
  const navigate = useNavigate();

  // Redirect if userToken exists
  if (userToken) {
    navigate(-1);
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = async users => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, users);

      if (data.message === 'success') {
        // Store token securely in cookies with HTTPOnly and Secure flags
        cookies.set('userToken', data.token, { path: '/', secure: true });

        // Set user token in context
        setUserToken(data.token);

        toast.success('Login successful', {
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
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: loginSchema
  });

  const inputs = [
    {
      id: 'email',
      type: 'email',
      name: 'email',
      title: 'user email',
      value: formik.values.email,
    },
    {
      id: 'password',
      type: 'password',
      name: 'password',
      title: 'user password',
      value: formik.values.password,
    }
  ];

  const renderInputs = inputs.map((input, index) =>
    <Input
      type={input.type}
      id={input.id}
      name={input.name}
      title={input.title}
      value={input.value}
      key={index}
      errors={formik.errors}
      onChange={formik.handleChange}
      touched={formik.touched}
      onBlur={formik.handleBlur}
    />
  );

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
                    <form className="mx-1 mx-md-4" onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                      {renderInputs}
                      <div className="form-check d-flex justify-content-center mb-5">
                        <Link to={'/forgetPassword'}>forgot password</Link>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg" disabled={!formik.isValid}>Log In</button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
