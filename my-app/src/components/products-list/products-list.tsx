import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteProduct, toggleLike } from '../../store/actions';
import ProductCard from '../product-card/product-card';
import Home from '../home/home';
import { fetchProductsAction } from '../../store/api-actions';
import { DEFAULT_PRODUCT_LIMIT_FOR_PAGE } from '../../const';

type ProductsListProps = {
    showFavorites: boolean;
    setShowFavorites: (value: boolean) => void;
}

function ProductsList({ showFavorites, setShowFavorites }: ProductsListProps): JSX.Element {



    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products);
    const currentPage = useAppSelector((state) => state.currentPage);
    const limit = DEFAULT_PRODUCT_LIMIT_FOR_PAGE;

    const [activeProductId, setActiveProductId] = useState<string | null>(null);


    useEffect(() => {
        dispatch(fetchProductsAction());
    }, [currentPage, dispatch]);



    const displayedProducts = products.slice(((currentPage - 1) * limit), (currentPage - 1) * limit + limit);

    const favoriteProducts = showFavorites
        ? products.filter(product => product.isFavorite)
        : displayedProducts;



    return (
        <div>
            <Home />


            <div>
                <button
                    onClick={() => setShowFavorites(false)}
                    disabled={!showFavorites}
                    className={showFavorites ? 'inactive' : 'active'}
                >
                    Products
                </button>
                <button
                    onClick={() => setShowFavorites(true)}
                    disabled={showFavorites}
                    className={showFavorites ? 'active' : 'inactive'}
                >
                    Favourite products
                </button>
            </div>
            <div className="products-list">
                {favoriteProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onLikeToggle={() => dispatch(toggleLike(product.id))}
                        onDelete={() => dispatch(deleteProduct(product.id))}
                        isActive={activeProductId === product.id}
                        onHover={() => setActiveProductId(product.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsList;