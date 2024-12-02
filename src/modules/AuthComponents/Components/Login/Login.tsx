import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import { LuEye } from "react-icons/lu";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";
import useToggle from '../../../../hooks/useToggle';
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { LoginFormData } from '../../../../interfaces/interfaces';
import { emailValidation } from '../../../../validations/validation';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthTitle from '../AuthTitle/AuthTitle';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';



export default function Login() {

  const [isValid, setIsValid] = useState(null)
const navigate = useNavigate()

const{ 
	formState:{errors,isSubmitting },
	register  ,
	handleSubmit
}=	useForm <LoginFormData>({ mode:'onChange'})




  const onSubmitHandler = async (data:LoginFormData) =>{


  await axios.get( `http://localhost:3000/user` ).then((resp)=>{

    
   
    if(resp.data.find(e => e.email === data.email )){
      setIsValid(true)
     
      
    }
  else {
    toast.error('please enter valid email')
    setIsValid(false)
  }
    
    if(resp.data.find(e => e.password === data.password )){
     setIsValid(true)
       
    }
  else {

   
    toast.error('please enter valid password')
  }

  if(resp.data.find(e => e.password === data.password && e.email === data.email )) {
    toast.success('welcome back')
    navigate('/dashboard')
  }

    
  }).catch((err)=>{
    console.log(err);
    
  })

    

  }
  const [value, toggleFunction] = useToggle(false);
  return <>
  <div className={styles.loginWrapper}>


        <div className={`authTitle`}>
          <AuthTitle p={'Welcome Back! Please enter your details'} title={'Log in'} />
    

        </div>
        <div className={styles.formWrapper}>
        
        <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div >
        
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

          <div >
<div className={`${styles.inputGroup} input-group position-relative password`}>
<span className="input-group-text  border-0" id="basic-addon1">

  
<IoLockClosedOutline className='inputIcons' />

 </span>
<input id='password'  type={value ? "text" : "password"}  className='inputStyle form-control' placeholder="password" aria-label="password" aria-describedby="basic-addon1"
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


<div className={`${styles.forgetPassword} d-flex justify-content-between`} >
   <Link className={styles.registerLink} to={'/register'}>Register </Link>

    <Link className={`${styles.forgetLink}`} to={'forget-password'}>Forget password ?</Link>


    </div>
    <AuthBtn isSubmitting={isSubmitting} title={'Login'}/>
    </form>
        </div>

   
  </div>
  
  
  
  </>
}
