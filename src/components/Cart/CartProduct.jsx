import axios from 'axios';
import './cartProduct.css';
import { getUserCart } from './../../store/slices/cart.slice';
import { useDispatch } from 'react-redux';
import getToken from './../../utils/getConfig';

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    const url = `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${product.id}`;


    axios
      .delete(url, getToken())
      .then((res) => {
        console.log('Eliminado con éxito');
        dispatch(getUserCart());
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className="cart__product">
      <div className='container__img'>
        <img src={product.product.images[0].url} alt='' />
      </div>
      <header>
        <h4>{product.product.brand}</h4>
        <h3>{product.product.title}</h3>
      </header>
      <div>
        <span>Quantity:&nbsp;</span>
        <span>
          {product.quantity}
        </span>
      </div>
      <div>
        <span>Unit Price:</span>
        <span>${product.product.price}</span>
      </div>
      <button onClick={handleDelete}>
        <i className="fa-regular fa-trash-can cart-icon"></i>
      </button>
    </article>
  );
};

export default CartProduct;