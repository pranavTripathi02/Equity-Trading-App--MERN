import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    setUser(user);
  };
  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('api/v1/user/me');
      // console.log('data: ', data);
      saveUser(data.user);
      // console.log('user: ', data.user);
    } catch (err) {
      removeUser();
      console.error('error from context', err);
    }
  };
  const logoutUser = async () => {
    try {
      // console.log(user);
      await axios.delete('/api/v1/auth/logout');
      removeUser();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider value={{ user, saveUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
