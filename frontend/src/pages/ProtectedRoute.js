import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context';

const PrivateRoute = ({ children }) => {
  const { user } = useGlobalContext();
  console.log('From privateRoute: ', user);
  return user ? children : <Navigate to='/login' />;
};
export default PrivateRoute;
