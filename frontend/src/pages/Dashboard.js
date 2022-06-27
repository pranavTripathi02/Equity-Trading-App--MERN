import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../context';
import styled from 'styled-components';
import { Companies } from '.';
import useLocalState from '../utils/localState';
import axios from 'axios';
import categories from '../utils/categories';

export default function Dashboard() {
  const { user } = useGlobalContext();
  const { alert, isLoading, setIsLoading } = useLocalState();
  const [companies, setCompanies] = useState([]);
  const [listCompanies, setListCompanies] = useState('');
  const [activeID, setActiveID] = useState('');

  const fetchCompanies = async () => {
    setIsLoading(true);
    console.log(user);
    if (listCompanies === 'watch') {
      const { data } = await axios.get('api/v1/user/me');
      console.log('data: ', data);
      // setCompanies(user.investedCompanies);
    } else {
      try {
        const { data } = await axios.get(
          `/api/v1/companies?opt=${listCompanies}`
        );
        setCompanies(data.companies);
      } catch (err) {
        console.error(err);
      }
    }
    setIsLoading(false);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    setActiveID(id);
    if (id === 'reg') setListCompanies('true');
    if (id === 'unreg') setListCompanies('false');
    if (id === 'watch') setListCompanies('watch');
  };

  useEffect(() => {
    fetchCompanies();
  }, [listCompanies]);

  return (
    <Wrapper>
      <h2 className='mt-5'>Dashboard</h2>
      <div className='flex-container text-center'>
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              id={category.id}
              className={`company-category flex-item border-0 ${
                activeID == category.id ? 'shadow-lg active' : 'shadow'
              }`}
              onClick={(e) => {
                handleClick(e, category.id);
              }}
            >
              <i
                className={`text-${category.color} fa-solid ${category.icon} size-lg`}
              />
              <h4>{category.title}</h4>
            </button>
          );
        })}
      </div>
      <div className='company-list'>
        {/* {console.log(listCompanies)} */}
        <Companies companies={companies} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .flex-container {
    display: flex;
    align-content: center;
    justify-content: space-around;
    margin: 4rem auto;
    // border: 1px solid black;
  }
  .flex-item {
    height: 12rem;
    width: 12rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid black;
  }
  .company-list {
    margin: 7rem auto;
  }
  .size-lg {
    font-size: 5rem;
  }
  .company-category.active {
    background: rgba(46, 169, 245, 0.462);
  }
`;
