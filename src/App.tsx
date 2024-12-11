import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./shareComponents/AuthLayout/Components/AuthLayout/AuthLayout"
import Login from "./modules/AuthComponents/Components/Login/Login"
import ForgetPassword from './modules/AuthComponents/Components/ForgetPassword/ForgetPassword';
import ResetPassword from "./modules/AuthComponents/Components/ResetPassword/ResetPassword";
import { Toaster } from "react-hot-toast";
import MasterLayout from './shareComponents/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/Dashboard';
import Register from "./modules/AuthComponents/Register/Register";
import PendingRequest from "./modules/PendingRequest/PendingRequest";
import CourtList from "./modules/CourtList/CourtList";

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
    {
      path:"register" , element : <Register/>
    },

  
  
  ]
    } ,
    {
      path : '' , element : <MasterLayout/>,
      children : [        {
          path:'dashboard' , element: <Dashboard/>
        },
        {
          path:'pending-request' , element : <PendingRequest/>
        },
        {
          path:'court-list' , element : <CourtList/>
        },
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
