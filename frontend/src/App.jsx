import { useState } from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
const Routeapp = createBrowserRouter([
  {
    path: '/',
    element: 'Hello world',
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/Dashboard',
    element:<Dashboard/>
  },
  {
    path:'/Register',
    element:<Registration/>
  }
])


function App() {

  return (
    <>
     <RouterProvider router={Routeapp}/>
    </>
  );
}

export default App;
