import { AxiosResponse } from 'axios';
import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { IState } from '../..';
import api from '../../../services/api';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';

type checkProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStock {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: checkProductStockRequest) {
  const { product } = payload; 

  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  });

  const availableStockResponse: AxiosResponse<IStock> = yield call(api.get, `stock/${product.id}`);

  if (availableStockResponse.data.quantity > currentQuantity) {
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id)); 
  }
}

export default all([
  takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
]);