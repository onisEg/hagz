import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./shareComponents/AuthLayout/Components/AuthLayout/AuthLayout"
import Login from "./modules/AuthComponents/Components/Login/Login"
import ForgetPassword from './modules/AuthComponents/Components/ForgetPassword/ForgetPassword';
import ResetPassword from "./modules/AuthComponents/Components/ResetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";
import MasterLayout from './shareComponents/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/Dashboard';

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
    } ,
    {
      path : '/dashboard' , element : <MasterLayout/>,
      children : [
        {
          index:true , element: <Dashboard/>
        }
      ]
    }

  ])



 return <>
 <Toaster
  position="top-center"
  reverseOrder={false}
/>
 <RouterProvider router={router}/>
 
 </>
}
