import './CardProduct.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardProduct = ({ product }) => {

  const brand = product.brand;

  let productName = product.title;
  if (productName.includes(brand)) {
    productName = productName.replace(brand, '').trim();
  }

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };



  return (
    <article className="product" onClick={handleClick}>
      <header className="product__header">
        <img className="product__img" src={product.images[1].url} alt="" />
        <img className="product__img" src={product.images[0].url} alt="" />
      </header>
      <section className="product__body">
        <p className='product__brand'>{brand}</p>
        <h3 className="product__name">{productName}</h3>
        <article className="product__price-container">
          <span className="product__price-label">Price</span>
          <h4 className="product__price-number">{product.price}</h4>
        </article>
        <button className="product__btn">
          <i className="fa-solid fa-cart-plus"></i>
        </button>
      </section>
    </article>
  );
};

export default CardProduct;
