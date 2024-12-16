

import './App.css';

import { Routes, Route } from 'react-router-dom';

import CreateProductScreen from './pages/create-product-screen/create-product-screen';
import ProductDetailScreen from './pages/product-detail/product-detail-screen';
import { AppRoute } from './const';
import MainScreen from './pages/main-screen/main-screen';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';
import { useAppSelector } from './hooks';
import LoadingScreen from './pages/loading-screen/laoding-screen';
import ProductsScreen from './pages/products-screen/products-screen';




function App() {

  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }



  return (


    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        >
        </Route>
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/products/:id" element={<ProductDetailScreen />} />
        <Route path="/create-product" element={<CreateProductScreen />} />
      </Routes>
    </HistoryRouter>

  )
}

export default App;
