import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./shareComponents/AuthLayout/Components/AuthLayout/AuthLayout"
import Login from "./modules/AuthComponents/Components/Login/Login"
import ForgetPassword from './modules/AuthComponents/Components/ForgetPassword/ForgetPassword';
import ResetPassword from "./modules/AuthComponents/Components/ResetPassword/ResetPassword";

export default function App() {

  const router = createBrowserRouter([
    {path:'', element: <AuthLayout/>,
      children : [{
        index:true , element : <Login/>,
       
      },
    
    {
      path:"forget-password" , element : <ForgetPassword/>
    },
    
    {
      path:"reset-password" , element : <ResetPassword/>
    },

  
  
  ]
    }
  ])



 return <>
 <RouterProvider router={router}/>
 
 </>
}
