import React from 'react'
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
    const token = localStorage.getItem('token');
  if(token){
    return children
  }else{
   return  <Navigate to={'/login'} replace={true}/>
  }
}

export default Protected