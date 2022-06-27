import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function ListView({ id, CIN, name, date }) {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log('clicked', id);
    navigate('/company', { state: { id } });
  };
  return (
    <tr
      onClick={() => {
        handleClick();
      }}
    >
      <td className='px-6 py-4'>
        {/* <td className=''> */}
        <div className='company-CIN'>
          <p className='mb-0'>{CIN}</p>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div>
          <p className='mb-0'>{name}</p>
        </div>
      </td>
      <td className='px-6 py-4'>
        <div>
          <p className='mb-0 ms-5'>{date.split('T')[0]}</p>
        </div>
      </td>
    </tr>
  );
}

const Wrapper = styled.div`
  // display: flex;
  margin-top: 2rem;
  .status {
    width: 73px;
    // margin-bottom: 5rem;
  }
`;
