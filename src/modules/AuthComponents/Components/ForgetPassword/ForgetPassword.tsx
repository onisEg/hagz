import styles from './forgetPassword.module.css'

import { CiMobile3 } from "react-icons/ci";

import { useForm } from 'react-hook-form';
import { ForgetPasswordData } from '../../../../interfaces/interfaces';
import AuthBtn from '../AuthBtn/AuthBtn';
import AuthTitle from '../AuthTitle/AuthTitle';
import { emailValidation } from '../../../../validations/validation';



export default function ForgetPassword() {


  
const{ 
	formState:{errors,isSubmitting },
	register  ,
	handleSubmit
}=	useForm <ForgetPasswordData>({ mode:'onChange'})




  const onSubmitHandler =(data:ForgetPasswordData)=>{

      console.log(data);
      
  }
  return <>
  <div className={styles.forgetPassworWrapper}>
    <div className='authTitle'>
    <AuthTitle title={'Forgot Your Password?'} p={'No worries! Please enter your email and we will send a password reset link'}/>

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



    <div className={styles.authBtn}>
    <AuthBtn isSubmitting={isSubmitting} title={'Submit'}/>
    </div>

    </form>
        </div>

   
  </div>
  
  
  
  </>
}
