import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../context';

export default function CompanyDetails() {
  const location = useLocation();
  const { user } = useGlobalContext();
  const [details, setDetails] = useState({});
  const id = location.state.id;
  const fetchDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/companies/details?id=${id}`);
      setDetails(data);
      // console.log(details.investors.indexOf(user.userID === -1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleShareholderClick = async () => {
    const { data } = await axios.patch(`/api/v1/companies/details?id=${id}`, {
      role: 'shareholder',
      user,
      id,
    });
    // console.log(data);
  };

  const addToInvestedCompanies = async () => {
    try {
      const { data } = await axios.patch('/api/v1/companies/details', {
        role: 'investor',
        user: user,
        id,
      });
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(user, details);

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <Wrapper className='shadow'>
      {details.name && (
        <div className=''>
          <h2 className='my-5'>Company Details</h2>
          <div>
            <h3>Name: {details.name}</h3>
            <h4>CIN/FCRN: {details.CIN}</h4>
            <h5>Registration Date: {details.registrationDate.split('T')[0]}</h5>
            {!details.isVerified && (
              <div className='add-shareholder'>
                <h4>Company currently has no shareholder</h4>
                <button
                  className='btn btn-lg btn-primary'
                  onClick={() => {
                    handleShareholderClick();
                  }}
                >
                  Verify company as Shareholder
                </button>
              </div>
            )}
            {details.shareholder === user.userID && (
              <div className='shareholder'>
                <button className='btn btn-lg btn-primary'>Add Updates</button>
              </div>
            )}
            {details.isVerified &&
              details.shareholder != user.userID &&
              details.investors.indexOf(user.userID === -1) && (
                <div className='investor'>
                  <button
                    className='btn btn-lg btn-primary'
                    onClick={() => {
                      addToInvestedCompanies();
                    }}
                  >
                    Invest in Company
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: #fff;
  min-height: 80vh;
  margin-top: 5rem;
  padding: 0.25rem 0.5rem 2.5rem 1.5rem;
  .investor,
  .shareholder,
  .add-shareholder {
    margin-top: 5rem;
    text-align: center;
  }
`;
