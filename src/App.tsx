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
import CourtDetails from "./modules/CourtDetails/CourtDetails";
import SearcContextProvider from "./Context/SearchContext";
import Users from "./modules/UsersList/Users";
import Settings from "./modules/Settings/Settings";

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
        {
          path:'users-list' , element : <Users/>
        },
        {
          path:'settings' , element : <Settings/>
        },
        {
          path:'court-details/:id' , element : <CourtDetails/>
        },
      ]
    }

  ])



 return <>
<SearcContextProvider>
<Toaster
  position="top-center"
  reverseOrder={false}
/>
 <RouterProvider router={router}/>
</SearcContextProvider>
 
 </>
}
