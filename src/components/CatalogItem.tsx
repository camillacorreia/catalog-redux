import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
  const dispatch = useDispatch();

  const hasFailureStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failureStockCheck.includes(product.id);
  })

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <article key={product.id}>
    <strong>{product.title}</strong>
    <span>{product.price}</span>

    <button
      type="button"
      onClick={handleAddProductToCart}
    >
      Comprar
    </button>

    {hasFailureStockCheck &&  <span style={{ color: 'red' }} > Falta de estoque </span>}
  </article>
  );
}

export default CatalogItem;