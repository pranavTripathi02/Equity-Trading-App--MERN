import React from 'react';
import { useGlobalContext } from '../context';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Dashboard, Home, Account } from '../pages';

export default function Navbar() {
  const { user, logoutUser } = useGlobalContext();
  return (
    <NavWrapper>
      <header className='navbar navbar-expand-lg navbar-dark sticky-top bg-dark shadow'>
        <a href='#' className='navbar-brand'>
          Equity-Trading
        </a>
        <Link className='nav-link text-white' to='/' element={<Home />}>
          Home
        </Link>
        <Link
          className='nav-link text-white'
          to='/dashboard'
          element={<Dashboard />}
        >
          Dashboard
        </Link>
        {/* <Link className='nav-link text-white' to='/user' element={<Account />}>
          Account
        </Link> */}
        {user && (
          <div className='user-acc'>
            <Link
              className='nav-link text-white'
              to='/user'
              element={<Account />}
            >
              Welcome {user.name}
            </Link>
            <button
              className='nav-item btn btn-danger text-light'
              onClick={() => logoutUser()}
            >
              Logout
            </button>
          </div>
        )}
      </header>
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  .navbar {
    padding: 0 2rem;
    height: 4rem;
  }
  .navbar-brand {
    margin-right: 7rem;
  }
  .nav-link {
    margin: 0 3rem;
  }
  .user-acc {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 0;
  }
`;
