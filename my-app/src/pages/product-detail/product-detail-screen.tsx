

import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types/product';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { State } from '../../types/state';
import { useEffect } from 'react';
import { fetchSelectedProduct } from '../../store/api-actions';

function ProductDetailScreen(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id !== undefined) {
            dispatch(fetchSelectedProduct(id));

        }
    }, [dispatch, id]);

    const product = useAppSelector<Product | undefined>((state: State) =>
        state.selectedProduct);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-detail">
            <h1>{product.title}</h1>
            <img src={product.imageUrl} alt={product.title} />
            <p>{product.description}</p>
            <div>{product.price}</div>
            <div>{product.availabilityStatus}</div>
            <div>Category: {product.category}</div>
            <div>Rating: {product.rating}</div>
            <Link to="/products">Back to Products</Link>
            <Link to="/">Back to Main</Link>
        </div>
    );
};

export default ProductDetailScreen;