import { Outlet } from "react-router-dom";
import styles from './authlayout.module.css'




export default function AuthLayout() {
  return <>
    <div className={`${styles.authContainer} d-flex justify-content-center align-items-center`}>
    <div className={`${styles.formContainer} `}>

      <div className=" bg-white rounded ">
      <Outlet/>

      </div>


    </div>
    </div>
  
  
  
  </>
}
