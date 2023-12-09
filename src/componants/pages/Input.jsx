import React from 'react'

export default function Input({type='text',id,name,title,value,onChange,errors,onBlur,touched}) {

    // const handleInputClick = () => {
    //     setFieldTouched(name, true);
    //   };

    //console.log(touched)
  return (
    <>
    {/* <div className="input-group mb-3">
        <label htmlFor={id} >{title}</label><br/>
        <input type={type} name={name} className="form-control" value={value} id={id} onChange={onChange} onBlur={onBlur} />
        {touched[name]&&errors[name]&&<p className='text text-danger'>{errors[name]}</p>}</div> */}

       <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                    <div className="form-outline flex-fill mb-0">
                      <input type={type} name={name} className="form-control" value={value} id={id} onChange={onChange} onBlur={onBlur} />
                      <label className="form-label"  htmlFor={id}>{title}</label>
                      {touched[name]&&errors[name]&&<p className='text text-danger'>{errors[name]}</p>} 
                    </div>
                  </div> 
        
    
    </>
  )
}
