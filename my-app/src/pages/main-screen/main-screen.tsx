

import { Link } from 'react-router-dom';


function MainScreen(): JSX.Element {
    return (
        <div className="main-screen">
            <Link to="/create-product">
                <button className="create-product-button">Create New Product</button>
            </Link>
            <Link to="/products">
                <button className="products-button">Products</button>
            </Link>
        </div>
    );
}

export default MainScreen;