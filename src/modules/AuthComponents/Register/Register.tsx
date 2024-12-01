
import { useEffect, useState } from 'react'
import styles from './register.module.css'
import { Link, useNavigate } from 'react-router-dom';
import {  useForm } from 'react-hook-form';
import AuthTitle from '../Components/AuthTitle/AuthTitle';
import { IoLockClosedOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa';
import useToggle from '../../../hooks/useToggle';
import { LuEye } from 'react-icons/lu';
import { CiMobile3 } from 'react-icons/ci';
import { emailValidation } from '../../../validations/validation';
import { RegisterData } from '../../../interfaces/interfaces';
import toast from 'react-hot-toast';
import axios from 'axios';


export default function Register() {


  const [isRePasswordShown, setIsRePasswordShown] = useState(false)

const[value,toggleFunction]=useToggle(false)
    
const toggleHideRePassword = ()=>{
    setIsRePasswordShown(!isRePasswordShown)
  }

const navigate =useNavigate()


    


  const{
    register,
    formState:{errors},
    watch,
    handleSubmit,
    trigger,
   
    
  
  }=useForm <RegisterData>({ mode:'onChange'})


    const onSubmit = (data:RegisterData)=> {

      
        console.log(data);
        
    
   
    axios.post(`http://localhost:3000/user`,data).then((resp)=>{
        console.log(resp);
        toast.success('register succussefully !')
        navigate('/')
    }).catch((err)=>{
        console.log(err);
        
    })
    
    
    
    }


  useEffect(()=>{
    if(watch('confirmPassword')) {
      trigger('confirmPassword')

    }
  },[watch('password')])
  return <>

<div className="container">
    <div className={`${styles.formWrapper} formWrp`} >
  <div className={styles.formCaption} >
  <AuthTitle title={"Register"} p={'Welcome Back! Please enter your details'}/>
  </div>
  <form onSubmit={handleSubmit(onSubmit)}>

<div className={styles.registerForm+"  registerForm" }>

 <div className={`left mx-2 w-100 row`}>
 <div className="col-md-6">
<div >
<div className={`${styles.inputGroup} input-group position-relative `}>
<span className="input-group-text  border-0" id="basic-addon1">

  
<IoLockClosedOutline className='inputIcons' />

 </span>
<input   type={'text'}  className='inputStyle form-control' placeholder=" User Name" aria-label="username" aria-describedby="basic-addon1"
{...register('userName',{required : 'please enter your user name'})}
/>
</div>
<div className={`errorMessage`}>
{errors.userName && <span className='text-danger'>{errors.userName.message}</span>}

</div>
</div>
</div>


  <div className="col-md-6">
  <div className={`${styles.inputGroup} input-group `}>
        <span className="input-group-text border-0" id="basic-addon1">

        <CiMobile3 className='inputIcons' />

        </span>
        <input  type="email" className='inputStyle form-control' placeholder="Enter your E-mail" aria-label="username" aria-describedby="basic-addon1"
				{...register('email',emailValidation)}

        />
        
        </div>
        <div className={`errorMessage`} >
        {errors.email && <span className='text-danger'>{errors.email.message}</span>}
        
        </div>
  </div>

  
  <div className="col-md-6 countryCol">
  <div className={`${styles.inputGroup} input-group `}>
        <span className="input-group-text border-0" id="basic-addon1">

        <CiMobile3 className='inputIcons' />

        </span>
        <input  type="text" className='inputStyle form-control' placeholder="country" aria-label="country" aria-describedby="basic-addon1"
				{...register('country', {required : 'please enter country'})}

        />
        
        </div>
        <div className={`errorMessage`} >
        {errors.country && <span className='text-danger'>{errors.country.message}</span>}
        
        </div>
  </div>


<div className="col-md-6 phoneCol">
  <div className={`${styles.inputGroup} input-group `}>
        <span className="input-group-text border-0" id="basic-addon1">

        <CiMobile3 className='inputIcons' />

        </span>
        <input  type="text" className='inputStyle form-control' placeholder="phone number" aria-label="phone number" aria-describedby="basic-addon1"
				{...register('phoneNumber' , {required : 'please enter your phone number' , pattern : {
                    value:/^01[0125][0-9]{8}$/,
                    message : 'please enter valid egyptian number'
                  }})}
                  

        />
        
        </div>
        <div className={`errorMessage`} >
        {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber.message}</span>}
        
        </div>
  </div>




<div className="col-md-6">
<div >
<div className={`${styles.inputGroup} input-group position-relative password`}>
<span className="input-group-text  border-0" id="basic-addon1">

  
<IoLockClosedOutline className='inputIcons' />

 </span>
<input id='password'  type={value ? "text" : "password"}  className='inputStyle form-control' placeholder=" Password" aria-label="password" aria-describedby="basic-addon1"
{...register('password',{required : 'please enter password'})}
/>
<button    onClick={toggleFunction}  className={`${styles.iconBtn} position-absolute end-0 top-50 translate-middle rounded eyeIcon`} onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button'  >
{
    value ? <FaRegEyeSlash size={'1.18rem'} color='rgba(131, 145, 161, 1)'/>:<LuEye size={'1.18rem'} color='rgba(131, 145, 161, 1)' />  


  }


<span className='sr-only'>{value ? 'hide  password' : 'show  password'}</span>

</button></div>
<div className={`errorMessage`}>
{errors.password && <span className='text-danger'>{errors.password.message}</span>}

</div>
</div>
</div>

<div className="col-md-6">
<div >
<div className={`${styles.inputGroup} input-group position-relative password`}>
<span className="input-group-text  border-0" id="basic-addon1">

  
<IoLockClosedOutline className='inputIcons' />

 </span>
<input   type={isRePasswordShown ? "text" : "password"}  className='inputStyle form-control' placeholder="Confirm Password" aria-label="password" aria-describedby="basic-addon1"
 {...register('confirmPassword' , {
  required : 'password cannot be empty',
       validate: (value) => value === watch("password") || 'passwords not matches'
       
       
 })}
/>
<button    onClick={toggleHideRePassword}  className={`${styles.iconBtn} position-absolute end-0 top-50 translate-middle rounded eyeIcon`} onMouseUp={(e)=>{e.preventDefault()}} onMouseDown={(e)=>{e.preventDefault()}} type='button'  >
{
    isRePasswordShown ? <FaRegEyeSlash size={'1.18rem'} color='rgba(131, 145, 161, 1)'/>:<LuEye size={'1.18rem'} color='rgba(131, 145, 161, 1)' />  


  }


<span className='sr-only'>{isRePasswordShown ? 'hide  password' : 'show  password'}</span>

</button></div>
<div className={`errorMessage`}>
{errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword.message}</span>}

</div>
</div>
</div>

</div> 
<div className={styles.rightInputs +" right w-100"}>









</div>
</div>
<div className="text-end">
<Link to='/' className={styles.loginBtn}>Login now?</Link>

</div>
<div className="text-center ">
<button  className={`${styles.registerBtn}   registerBtn`}>Register</button>

</div>
  </form>
  </div>
</div>
  </>
}
