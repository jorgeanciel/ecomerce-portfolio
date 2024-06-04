import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartProduct from '../components/Cart/CartProduct';
import { getUserCart } from '../store/slices/cart.slice';
import './styles/CartPage.css';
import getToken from '../utils/getConfig';
import carrito from '../assets/carrito.png'

const CartPage = () => {
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cart.products);

  const total = cartProducts?.reduce((acc, cartProduct) => {
    const quantity = parseFloat(cartProduct.quantity);
    const price = parseFloat(cartProduct.product.price);
    return acc + (quantity * price);
  }, 0);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const handleCheckout = () => {
    const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/purchases';

    const data = {
      street: '',
      colony: '',
      zipCode: '',
      city: '',
      references: '',
    };
    axios
      .post(url, data, getToken())
      .then((res) => {
        console.log(res.data);
        dispatch(getUserCart());
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className='container__cart'>
      {cartProducts && cartProducts.length > 0 ? (
        <>
          <div className='container__products'>
            {cartProducts?.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
          <div className='container__products-total'>
            <p>Total: ${total.toFixed(2)}</p>
            <button className='button__checkout' onClick={handleCheckout}>Checkout</button>
          </div>
        </>) : (
        <div className='empty__container'>
          <h2>Your Cart is Empty</h2>
          <img src={carrito} alt='empty-car' />
        </div>
      )}
    </div>
  );
};

export default CartPage;
