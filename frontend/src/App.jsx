import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard';
import Registration from './components/Registration';
import Landing from './Landing';
import ProtectRoute from './components/ProtectRoute';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientID = "150060063981-9k29lg2nsfbv2r6ktmfveeoi50rvieji.apps.googleusercontent.com";
const Routeapp = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/login',
    element:(
      <GoogleOAuthProvider clientId={clientID}>
       <Login/>
       </GoogleOAuthProvider>
    )
  },
  {
    path: '/dashboard',
    element:(
      <ProtectRoute>
        <Dashboard/>
    </ProtectRoute>
    )
  },
  {
    path:'/Register',
    element:(
      <GoogleOAuthProvider clientId={clientID}>
      <Registration/>
    </GoogleOAuthProvider>
    )
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
