import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import styled from 'styled-components';

export default function Home() {
  const { user } = useGlobalContext();
  return (
    <>
      {user && <Navigate to='/dashboard' />}
      <Wrapper>
        <div className='container'>
          <h1 className='heading'>Welcome to Equity Trading</h1>
          <div className='flex-container'>
            <Link to='/login' className='flex-item btn btn-lg btn-primary'>
              Login
            </Link>
            <Link to='/register' className='flex-item btn btn-lg btn-primary'>
              Register
            </Link>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  .heading {
    text-align: center;
    width: 100%;
  }
  margin: 5rem;
  .flex-container {
    display: flex;
    flex-direction: row;
    // width: 75%;
    text-align: center;
    margin: 5rem auto auto auto;
    justify-content: space-around;
    // border: 1px solid green;
  }
  .flex-item {
    // border: 1px solid red;
    width: 35%;
    margin: auto;
    padding: 0.5rem;
  }
`;
