import React from 'react';
import './app.css';
import { Routes, Route } from 'react-router-dom';
import {
  Dashboard,
  Companies,
  Login,
  Home,
  Register,
  Verify,
  CompanyDetails,
  PrivateRoute,
} from './pages';
import { Navbar } from './components';

export default function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <div className='container'>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* Routes>Route[path='/companies'][element={<Companies/>}]/ */}
            <Route
              path='/dashboard'
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            {/* <Route path='/verify-email' element={<PrivateRoute><Verify /></PrivateRoute>} /> */}
            <Route
              path='/company'
              element={
                <PrivateRoute>
                  <CompanyDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}
