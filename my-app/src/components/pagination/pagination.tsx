import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../store/actions';
import { fetchProductsAction } from '../../store/api-actions';

function Pagination() {
    const dispatch = useAppDispatch();

    const totalPages = useAppSelector(state => state.totalPages);
    const currentPage = useAppSelector(state => state.currentPage);
    const hasMoreProducts = useAppSelector(state => state.hasMoreProducts);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
        dispatch(fetchProductsAction());
    };

    return (
        <div>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!hasMoreProducts}
            >
                Next
            </button>
        </div>
    );
};


export default Pagination;