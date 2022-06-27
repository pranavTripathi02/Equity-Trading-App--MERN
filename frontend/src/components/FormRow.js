import React from 'react';

export default function FormRow({ type, name, value, handleChange }) {
  return (
    <div className='row form-floating'>
      <input
        placeholder={name}
        className='form-control'
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
      <label className='form-label text-capitalize' htmlFor={name}>
        {name}
      </label>
    </div>
  );
}
