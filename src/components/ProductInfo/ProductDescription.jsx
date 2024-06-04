import axios from 'axios';
import React, { useState } from 'react';
import { getUserCart } from '../../store/slices/cart.slice';
import { useDispatch } from 'react-redux';
import './styles/productDescription.css';
import getToken from './../../utils/getConfig';

const ProductDescription = ({ product }) => {

  const [counter, setCounter] = useState(1);

  const handleMinus = () => {
    if (counter - 1 > 0) {
      setCounter(counter - 1);
    }
  };

  const handlePlus = () => {
    setCounter(counter + 1);
  };
  const dispatch = useDispatch();

  const handleCart = () => {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart';
    const data = {
      productId: product.id,
      quantity: counter,
    };
    axios.get(url, getToken())
      .then((res) => {
        const cartItem = res.data.find(item => item.productId === product.id);
        if (cartItem) {
          alert('This item is already in your cart!');
        } else {
          axios.post(url, data, getToken())
            .then((res) => {
              console.log(res.data)
              dispatch(getUserCart())
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };



  return (
    <article className='container__prodDescription'>
      <h3> {product?.brand} {product?.title}</h3>
      <p>{product?.description}</p>
      <div className='container__quantity'>
        <h4>$ {product?.price}</h4>

        <button onClick={handleMinus}><i className="fa-solid fa-minus" /></button>
        <h4> {counter} </h4>
        <button onClick={handlePlus}><i className="fa-solid fa-plus" /></button>
      </div>
      <div className='container__buttonAdd'>
        <button className='add__tocart' onClick={handleCart}>
          Add to Cart <i className="fa-solid fa-cart-plus"></i>
        </button>
      </div>
    </article>
  );
};

export default ProductDescription;
