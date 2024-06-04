import React from 'react';
import './styles/purchaseCard.css';

const PurchaseCard = ({ purchase }) => {
  const datePurchase = new Date(purchase?.createdAt);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  };

  console.log(purchase);

  const totalCost = purchase.product.price * purchase.quantity;

  return (

    <div className='card__purchases'>
      <p>{datePurchase.toLocaleDateString('en-us', options)}</p>
      <p>{purchase.id}</p>
      <img src={purchase.product.images[2].url} alt='' />
      <p>{purchase.product.brand} {purchase.product.title}</p>
      <p> ${purchase.product.price}</p>
      <p> {purchase.quantity}</p>
      <p> ${totalCost.toFixed(2)}</p>
    </div>

  );
};
export default PurchaseCard;


