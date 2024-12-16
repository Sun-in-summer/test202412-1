import { createReducer } from '@reduxjs/toolkit';
import { Product } from '../types/product';
import { loadProducts, toggleLike, deleteProduct, setFilter, addProduct, updateProduct, setDataLoadingStatus, setCurrentPage, setTotalPages, loadSelectedProduct, setSelectedProductLoadedStatus, addProducts } from './actions';
import { DEFAULT_FIRST_PAGE, DEFAULT_PRODUCTS_LIMIT, DEFAULT_TOTAL_PAGES_QTY } from '../const';
import { v4 as uuidv4 } from 'uuid';



type InitialState = {
  products: Product[];
  selectedProduct: Product | undefined;
  filter: 'all' | 'favorites';
  isDataLoading: boolean;
  isSelectedProductLoaded: boolean;
  totalPages: number,
  currentPage: number,
  limit: number,
  hasMoreProducts: boolean;
}

const initialState: InitialState = {
  products: [],
  selectedProduct: undefined,
  filter: 'all',
  isDataLoading: false,
  isSelectedProductLoaded: false,
  totalPages: DEFAULT_TOTAL_PAGES_QTY ,
  currentPage: DEFAULT_FIRST_PAGE,
  limit: DEFAULT_PRODUCTS_LIMIT,
  hasMoreProducts: true,
};

const reducer = createReducer (initialState, (builder) => {
  builder
    .addCase(loadProducts, (state, action) =>{
      state.products = action.payload;
    })
    .addCase(addProducts, (state, action) =>{
       const newProducts = action.payload;
    
        newProducts.forEach(product => {
        const exists = state.products.find(existingProduct => existingProduct.id === product.id);
        if (!exists) {
            state.products.push(product);
        }
    });
    })
    .addCase(setTotalPages, (state, action)=>{
      state.totalPages = action.payload;
    })
    .addCase(setCurrentPage, (state, action) =>{
      state.currentPage = action.payload;
    })
    .addCase(toggleLike, (state, action) => {
      const product = state.products.find((product) => product.id === action.payload);
      if (product) {
        product.isFavorite = !product.isFavorite;
      }
    })
    .addCase(deleteProduct, (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    })
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(addProduct, (state, action) => {
      const newProduct = action.payload;
      const correctIdProduct = {...newProduct, id: uuidv4()}
      const product = state.products.find((product) => product.id === correctIdProduct.id);
      if (product) {
        const doubleCheckedIdProduct = {...correctIdProduct, id: uuidv4() }
        state.products.push(doubleCheckedIdProduct);
      }
      state.products.push(correctIdProduct);
    })
    .addCase(updateProduct, (state, action) => {
      const index = state.products.findIndex((product) => product.id  === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      
    })
    .addCase(setDataLoadingStatus, (state, action)=> {
      state.isDataLoading = action.payload;
    })
    .addCase(loadSelectedProduct, (state, action) =>{
      state.selectedProduct = action.payload;
    })
    .addCase(setSelectedProductLoadedStatus, (state, action) =>{
      state.isSelectedProductLoaded = action.payload;
    })
});

export {reducer};
