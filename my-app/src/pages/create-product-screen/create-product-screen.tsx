import { useState } from 'react';
import { Product } from '../../types/product';
import { v4 as uuidv4 } from 'uuid';
import { addProductAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import Home from '../../components/home/home';
import { DEFAULT_URL_PATTERN } from '../../const';



function CreateProductScreen(): JSX.Element {
    const dispatch = useAppDispatch();
    const [error, setError] = useState('');
    const urlPattern = DEFAULT_URL_PATTERN;


    const [formValues, setFormValues] = useState<Product>({
        id: '',
        title: '',
        description: '',
        imageUrl: '',
        isFavorite: false,
        price: 0,
        availabilityStatus: '',
        category: '',
        tags: [],
        rating: 0,
    });

    const [createdProducts, setCreatedProducts] = useState<Product[]>([]);

    const resetForm = () => {
        setFormValues({
            id: '',
            title: '',
            description: '',
            imageUrl: '',
            isFavorite: false,
            price: 0,
            availabilityStatus: '',
            category: '',
            tags: [],
            rating: 0,
        });
        setError('');
    };

    const validateImageUrl = (value: string) => {
        return urlPattern.test(value);
    };


    const onSubmit = (productData: Product) => {
        dispatch(addProductAction(productData));
        setCreatedProducts(prev => [...prev, productData]);
        resetForm();
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!urlPattern.test(formValues.imageUrl)) {
            setError('Please enter valid URL for image.');
            return;
        }


        if (formValues.description !== '' && formValues.title !== '') {
            setError('');
            onSubmit({
                ...formValues,
                id: uuidv4(),
                images: [formValues.imageUrl],
                isFavorite: false,
                price: 0,
                rating: 0,
                tags: [],
                category: ''

            });
        }
        else {
            setError('Please fill all required inputs')
        }

    };

    const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormValues(prev => ({ ...prev, imageUrl: value }));
        if (validateImageUrl(value)) {
            setError('');
        }
        else {
            setError('Please enter valid URL for image.'); // Устанавливаем ошибку
        }
    };

    const handleImageUrlBlur = () => {
        if (!validateImageUrl(formValues.imageUrl)) {
            setError('Please enter valid URL for image.');
        }
    };




    return (

        <div>
            <Home />
            <form onSubmit={handleSubmit}>
                <h1>Create Product</h1>
                <input
                    type="text"
                    placeholder="Title"
                    required
                    value={formValues.title}
                    onChange={(e) => setFormValues(prev => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                    placeholder="Description"
                    required
                    value={formValues.description}
                    onChange={(e) => setFormValues(prev => ({ ...prev, description: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    required
                    value={formValues.imageUrl}
                    onChange={handleImageUrlChange}
                    onBlur={handleImageUrlBlur}

                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Create</button>
            </form>
            <div>
                <h2>Created Products</h2>
                {createdProducts.length > 0 ? (
                    createdProducts.map(product => (
                        <div key={product.id}>
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <img src={product.imageUrl} alt={product.title} />
                        </div>
                    ))
                ) : (
                    <p>No products created yet.</p>
                )}
            </div>
        </div >
    );
};

export default CreateProductScreen;


