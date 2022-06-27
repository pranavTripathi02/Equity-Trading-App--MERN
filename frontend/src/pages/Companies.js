import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context';
import useLocalState from '../utils/localState';
import { ListView } from '../components';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Companies({ companies }) {
  const { user } = useGlobalContext();
  const { alert, isLoading, setIsLoading } = useLocalState();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div>
        <div className='shadow'>
          <table className='table shadow-sm'>
            <thead className='my-5 shadow-none border'>
              <tr>
                <th scope='col' className='ms-2 text-uppercase'>
                  CIN number
                </th>
                <th scope='col' className='ms-2 text-uppercase'>
                  Name of company
                </th>
                <th scope='col' className='ms-2 text-uppercase'>
                  Date of Registration
                </th>
              </tr>
            </thead>
            <tbody className='bg-white'>
              {companies.map((comp) => {
                const { name, CIN, _id, registrationDate, isVerified } = comp;
                return (
                  <ListView
                    key={_id}
                    id={_id}
                    CIN={CIN}
                    name={name}
                    date={registrationDate}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
