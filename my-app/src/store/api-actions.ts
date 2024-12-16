import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../types/state';
import { Product, ServerProduct } from '../types/product';
import { setDataLoadingStatus, addProducts, setTotalPages, setSelectedProductLoadedStatus, loadSelectedProduct, addProduct } from './actions';
import { APIRoute } from '../const';
import { generatePath } from 'react-router-dom';


export const fetchProductsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchProducts',
  async (_arg, {getState, dispatch, extra: api}) => {
    const state = getState();
    const {  limit, currentPage, totalPages} = state;
    if (currentPage > totalPages) {
        
        const newTotalPages = Math.max(totalPages, currentPage);
        dispatch(setTotalPages(newTotalPages));
    }

    const skip = (currentPage - 1) * limit;
    const { data } = await api.get(APIRoute.Products, {
        params: { limit, skip }
    });
    const products = data.products.map((product:ServerProduct)=> ({...product, imageUrl: product.images[0]}));
 
    dispatch(setDataLoadingStatus(true));
    dispatch(addProducts(products as Product[]));
    dispatch(setTotalPages(totalPages));
    dispatch(setDataLoadingStatus(false));
  },
);


export const fetchSelectedProduct= createAsyncThunk<void, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}> (
  'data/fetchSelectedProduct',
  async(id, {dispatch, extra: api}) => {
    const {data} = await api.get(generatePath(APIRoute.Product, {id}));
      const product:Product = {...data, imageUrl:  data.images[0]}
    dispatch(setSelectedProductLoadedStatus(false));
    dispatch(loadSelectedProduct(product));
    dispatch(setSelectedProductLoadedStatus(true));
  }
);

export const addProductAction = createAsyncThunk<Product, Product,  {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addProductAction',
  async ({title, description, images}, {dispatch, extra: api}) => {
    console.log("Отправляемые данные на сервер:", {title, description, images});
    const {data} = await api.post<Product>(generatePath(APIRoute.AddProduct), {title, description, images});
    console.log("Ответ от сервера:", data);
    dispatch(addProduct(data));
    return data;
  }
);
