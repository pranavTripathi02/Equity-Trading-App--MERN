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
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/verify-email' element={<Verify />} />
            <Route path='/company' element={<CompanyDetails />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
