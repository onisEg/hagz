import styles from './reset.module.css'
import { LuEye } from "react-icons/lu";
import { IoLockClosedOutline } from "react-icons/io5";
import useToggle from '../../../../hooks/useToggle';
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import {  resetPasswordData } from '../../../../interfaces/interfaces';
import { emailValidation } from '../../../../validations/validation';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthTitle from '../AuthTitle/AuthTitle';
import { FaRegEnvelope } from "react-icons/fa6";
import { useEffect, useState } from 'react';



export default function ResetPassword() {

  
const{ 
	formState:{errors,isSubmitting },
	register  ,
	handleSubmit,
  watch,trigger
}=	useForm <resetPasswordData>({ mode:'onChange'})




  const onSubmitHandler =(data:resetPasswordData)=>{

      console.log(data);
      
  }
  const [value, toggleFunction] = useToggle(false);
  const [isRePasswordShown, setIsRePasswordShown] = useState(false);
  const toggleHideRePassword = ()=>{
    setIsRePasswordShown(!isRePasswordShown)
  }

  useEffect(()=>{
    if(watch('confirmPassword')) {
      trigger('confirmPassword')

    }
  },[watch('password')])

  return <>
  <div className={styles.resetWrapper}>


        <div className={`authTitle`}>
          <AuthTitle p={'Please Enter Your Otp  or Check Your Inbox'} title={' Reset  Password'} />
    

        </div>
        <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div >
        
        <div className={`${styles.inputGroup} input-group `}>
        <span className="input-group-text border-0" id="basic-addon1">

        <FaRegEnvelope  className='inputIcons' />

        </span>
        <input  type="email" className='inputStyle form-control' placeholder="E-mail" aria-label="username" aria-describedby="basic-addon1"
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
<input   className='inputStyle form-control' placeholder="OTP" aria-label="otp" aria-describedby="basic-addon1"
 {...register('otp' , {required : 'please enter otp'})}
/>
</div>
<div className={`errorMessage`}>
{errors.otp && <span className='text-danger'>{errors.otp.message}</span>}

</div>
</div>
          <div >
<div className={`${styles.inputGroup} input-group position-relative password`}>
<span className="input-group-text  border-0" id="basic-addon1">

  
<IoLockClosedOutline className='inputIcons' />

 </span>
<input id='password'  type={value ? "text" : "password"}  className='inputStyle form-control' placeholder="New Password" aria-label="password" aria-describedby="basic-addon1"
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
          <div >
<div className={`${styles.inputGroup} input-group position-relative password`}>
<span className="input-group-text  border-0" id="basic-addon1">

  
<IoLockClosedOutline className='inputIcons' />

 </span>
<input   type={isRePasswordShown ? "text" : "password"}  className='inputStyle form-control' placeholder="Confirm New Password" aria-label="password" aria-describedby="basic-addon1"
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

<div className={styles.authBtn}>
<AuthBtn isSubmitting={isSubmitting} title={'Reset Password'}/>
</div>
    
    </form>
        </div>

   
  </div>
  
  
  
  </>
}
