import { createAction } from '@reduxjs/toolkit';
import { Product } from '../types/product';


export const loadProducts = createAction<Product[]>('loadProducts');
export const addProducts = createAction<Product[]>('addProducts');
export const toggleLike = createAction<string>('toggleLike');
export const deleteProduct = createAction<string>('deleteProduct');
export const setFilter = createAction<'all' | 'favorites'>('setFilter');
export const addProduct = createAction<Product>('addProduct');
export const updateProduct = createAction<Product>('updateProduct');

export const setDataLoadingStatus = createAction<boolean>('data/setDataLoadingStatus');
export const setTotalPages =  createAction<number>('data/setTotalPages');
export const setCurrentPage = createAction<number>('data/setCurrentPage');

export const setSelectedProductLoadedStatus = createAction<boolean>('data/setSelectedProductLoadedStatus');
export const loadSelectedProduct = createAction<Product>('data/loadSelectedProduct');