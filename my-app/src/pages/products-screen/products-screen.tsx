import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { fetchProductsAction } from '../../store/api-actions';
import ProductsList from '../../components/products-list/products-list';
import Pagination from '../../components/pagination/pagination';

function ProductsScreen() {
    const dispatch = useAppDispatch();
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsAction());
    }, [dispatch]);

    return (
        <div>
            <ProductsList
                showFavorites={showFavorites}
                setShowFavorites={setShowFavorites}
            />
            {!showFavorites && <Pagination />}
        </div>
    );
};

export default ProductsScreen;