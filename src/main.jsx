import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './component/RootLAyout/Root.jsx';
import Home from './component/Home/Home.jsx';
import Allcrops from './component/AllCrops/Allcrops.jsx';
import Error from './component/ErrorPage/Error.jsx';
import Login from './component/Login-and-Reg/Login.jsx';
import Register from './component/Login-and-Reg/Register.jsx';
import AuthProvider from './context/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/allcrops',
        Component:Allcrops
      },
      {
        path:'/*',
        Component:Error
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:"/register",
        Component:Register
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
     <RouterProvider router={router} />,
     </AuthProvider>
  </StrictMode>,
)
