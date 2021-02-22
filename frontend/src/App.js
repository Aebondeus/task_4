import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toRoutes } from './routers';
import { useAuth } from './hooks/authHook';
import { authContext } from './context/authContext';


function App() {
  const {login, logout, token, id} = useAuth();
  console.log("Token: ", token, "Id: ",  id)
  const Route = toRoutes(!!token);
  return (
    <authContext.Provider value={{token, id, login, logout}}>
      <div className='container'>
        {Route}
      </div>  
    </authContext.Provider>
        )
}   
export default App;
