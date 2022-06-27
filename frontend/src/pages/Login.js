import React, { useState } from 'react';
import FormRow from '../components/FormRow';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../context';
import useLocalState from '../utils/localState';

export default function Login() {
  const { user, saveUser } = useGlobalContext();
  // const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const { alert, setIsLoading, isLoading, showAlert, hideAlert } =
    useLocalState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setIsLoading(true);
    const { email, password } = values;
    const user = { email, password };
    try {
      const { data } = await axios.post('/api/v1/auth/login', user);
      setIsLoading(false);
      setValues({ email: '', password: '' });
      showAlert({
        text: 'Welcome ${data.user.name}. Redirecting to dashboard...',
        type: 'success',
      });
      setIsLoading(false);
      console.log('from login:', data.user);
      saveUser(data.user);
      // navigate('/dashboard');
    } catch (err) {
      console.log('err is: ', err);
      showAlert({ text: err.response.data.message });
      setIsLoading(false);
    }
  };
  // console.log('alert: ', alert);
  // console.log('user: ', user);
  return (
    <>
      {alert.show && (
        <div className={`alert alert-${alert.type}`}>{alert.text}</div>
      )}
      {user && <Navigate to='/dashboard' />}
      <div className='container-sm shadow my-5 border rounded p-5'>
        <h3 className='text-center'>Login</h3>
        <form
          className={isLoading ? 'form form-loading' : 'form'}
          onSubmit={handleSubmit}
        >
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
          </div>
          <div className='text-center justify-contents-center'>
            <button className='btn btn-lg btn-success' type='submit'>
              {isLoading ? 'Loading...' : 'Login'}
            </button>
            <div className='p-3 text-decoration-none d-inline'>
              Not a member yet?
              <Link to='/register' className='px-2 text-decoration-none'>
                Register now
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
