import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';

const LoginPage = () => {
  const [token, setToken] = useState()
  const [isLogged, setIsLogged] = useState(false);

  const { handleSubmit, register, reset } = useForm();

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signUp');
  };

  const submit = (data) => {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/users/login';
    axios.post(url, data)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token)
        localStorage.setItem('name', `${res.data.user.firstName} ${res.data.user.lastName}`)
        localStorage.setItem('token', res.data.token)
        setIsLogged(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err)
        localStorage.clear()
      })
    reset({
      email: '',
      password: '',
    })
  }

  useEffect(() => {
    const condition = localStorage.getItem('token') ? true : false;
    setIsLogged(condition);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogged(false);
  };

  if (isLogged) {
    return (
      <div className="login__user">
        <h1><i className='bx bxs-user' /></h1>
        <h2>{localStorage.getItem('name')}</h2>
        <button className="logout__btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className='container__login'>
      <form onSubmit={handleSubmit(submit)}>
        <h1>Welcome! </h1>
        <p>Enter your email and password to continue</p>

        <span> <i className="fa-regular fa-envelope"></i>
          <label htmlFor="email">Email</label>
        </span>
        <input type="email" id="email" {...register('email')} placeholder='Enter your email' required />
        <span>
          <i className="fa-solid fa-key"></i>
          <label htmlFor="password">Password</label>
        </span>
        <input type="password" id="password" {...register('password')} placeholder='Enter your password' required />

        <button className='login__button'>Login</button>
        <div>
          <span>Don't have an account?
            <button className='up__button' onClick={handleSignUp}> Sign up </button>
          </span>
        </div>
      </form >
    </div >

  );
};

export default LoginPage;