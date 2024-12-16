import { LikeIconFilled, LikeIconOutline } from '../icons/like-icons';


type ProductCardProps = {
    product: {
        id: string;
        title: string;
        description: string;
        imageUrl: string;
        isFavorite: boolean;
        price?: number;
        availabilityStatus?: string
    };
    onLikeToggle: () => void;
    onDelete: () => void;
    isActive: boolean;
    onHover: () => void;
}

function ProductCard({ product, onLikeToggle, onDelete, isActive }: ProductCardProps): JSX.Element {




    const handleLikeClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Остановить всплытие события
        onLikeToggle();
    };

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Остановить всплытие события
        onDelete();
    };




    return (
        <div className={`product-card ${isActive ? 'active' : ''}`} onClick={() => window.location.href = `/products/${product.id}`}>

            <img
                className="product-image"
                src={product.imageUrl}
                alt={product.title}


            />



            <h2>{product.title}</h2>
            <p>{product.description}</p>


            <div className="button-container">
                <button className="like-button" onClick={handleLikeClick}>
                    {product.isFavorite ? <LikeIconFilled /> : <LikeIconOutline />}
                </button>
                <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
            </div>


        </div>
    );
};

export default ProductCard;