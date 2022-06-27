import React, { useState } from 'react';
import FormRow from '../components/FormRow';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLocalState from '../utils/localState';

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '' });

  const { alert, showAlert, isLoading, setIsLoading, hideAlert, setSuccess } =
    useLocalState();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setIsLoading(true);
    const { name, email, password } = values;
    const user = { name, email, password };
    // console.log('from env', process.env.REACT_APP_REGISTER);
    try {
      setIsLoading(true);
      const { data } = await axios.post('/api/v1/auth/register', user);
      setValues({ name: '', email: '', password: '' });
      console.log(data);
      showAlert({ text: data.msg, type: 'success' });
      // navigate('/');
    } catch (err) {
      console.log(err);
      // const { message } = err.data;
      showAlert({ text: message || 'there was an error' });
    }
    setIsLoading(false);
  };
  return (
    <>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      <div className='container-sm shadow my-5 border rounded p-5'>
        <h3 className='text-center'>Register</h3>
        <form className='form' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <FormRow
              name='name'
              type='name'
              handleChange={handleChange}
              value={values.name}
            />
          </div>
          <div className='mb-3'>
            <FormRow
              name='email'
              type='email'
              handleChange={handleChange}
              value={values.email}
            />
          </div>
          <div className='mb-3'>
            <FormRow
              name='password'
              type='password'
              handleChange={handleChange}
              value={values.password}
            />
            <div className='form-text'>Must be at least 8 character long</div>
          </div>
          <div className='text-center justify-contents-center'>
            <button className='btn btn-lg btn-success' type='submit'>
              {isLoading ? 'Loading...' : 'Register'}
            </button>
            <div className='p-3 text-decoration-none d-inline'>
              Already have an account?
              <Link to='/login' className='px-2 text-decoration-none'>
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
