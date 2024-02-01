
import { createBrowserRouter } from "react-router-dom";


import { Home } from "./pages/home/home";

import { Admin } from "./pages/admin/admin";

import { Login } from "./pages/login/login";

import { NetWorks } from "./pages/networks/networks";

import { Private } from "./routes/Private";

import { ErrorPage } from "./pages/error";

const router = createBrowserRouter([

  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/admin',
    element: <Private><Admin /></Private>
  },
  {
    path: '/admin/social',
    element: <Private> <NetWorks/> </Private>

  },
  {

    path: '*',
    element: <ErrorPage/>
  },
  
])


export { router };