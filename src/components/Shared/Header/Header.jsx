import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './header.css';
import { getUserCart } from '../../../store/slices/cart.slice';


const Header = () => {

  const userName = localStorage.getItem('name');

  const products = useSelector(state => state.cart.products);
  const dispatch = useDispatch();

  const quantities = products?.map(product => product.quantity);
  const totalQuantity = quantities?.reduce((total, quantity) => total + quantity, 0);


  useEffect(() => {
    if (userName) {
      dispatch(getUserCart());
    }
  }, [dispatch, userName, products]);

  return (
    <header className='container__header'>
      <h3>
        <Link to="/">e-commerce</Link>
      </h3 >
      <nav >
        <ul >
          <li>
            <Link to="/login">
              <i className="fa-regular fa-user "></i>
            </Link>
          </li>
          <li >
            <Link to="/purchases">
              <i className="fa-solid fa-box-archive "></i>
            </Link>
          </li>
          <li className='container__carticon'>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping icon__cart"></i>
              {totalQuantity > 0 && localStorage.getItem('name') &&
                <h5 className='quantity__purchase'>{totalQuantity}</h5>
              }
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
