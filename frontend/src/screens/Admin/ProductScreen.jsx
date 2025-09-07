import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Message from '../../components/Message';
import { useGetProductsQuery } from '../../features/productsApiSlice';
import Loader from '../../components/Loader';
import useAutoHideScroll from '../../hooks/useAutoHideScroll';
import { useCreateProductMutation } from '../../features/productsApiSlice';

const ProductList = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const [isScrollVisible, setGridRef] = useAutoHideScroll({ hideDelay: 5000 });

    const [createProduct, {isLoading: creatingProductLoader} ] = useCreateProductMutation()

    const handleCreateProduct = async() => {

        const product= await createProduct();
        refetch()
        console.log(createProduct);    
    }
    return (
        <div className="p-4">
            {/* Header with Create Product button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
                <button
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                    onClick={handleCreateProduct}
                >
                    <FaPlus className="mr-2" /> Create Product
                </button>
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    {/* Grid Header */}
                    <div className="grid gap-4 bg-gray-100 p-4 rounded-t-lg font-semibold text-gray-700"
                        style={{ gridTemplateColumns: '1fr 2fr 0.7fr 1fr 1fr 100px' }}>
                        <div className="truncate">ID</div>
                        <div>NAME</div>
                        <div>PRICE</div>
                        <div>CATEGORY</div>
                        <div>BRAND</div>
                    </div>

                    {/* Grid Body */}
                    <div 
                        ref={setGridRef}
                        className={`bg-white rounded-b-lg shadow-sm h-[63vh] overflow-y-auto transition-all duration-300 ${
                            isScrollVisible ? 'scrollbar-visible' : 'scrollbar-hidden'
                        }`}
                    >
                        <style>
                            {`
                                .scrollbar-visible::-webkit-scrollbar {
                                    width: 8px;
                                }
                                .scrollbar-visible::-webkit-scrollbar-track {
                                    background: #f1f1f1;
                                }
                                .scrollbar-visible::-webkit-scrollbar-thumb {
                                    background: #888;
                                    border-radius: 4px;
                                }
                                .scrollbar-hidden::-webkit-scrollbar {
                                    width: 0;
                                    background: transparent;
                                }
                                .scrollbar-visible {
                                    scrollbar-width: thin;
                                    scrollbar-color: #888 #f1f1f1;
                                }
                                .scrollbar-hidden {
                                    scrollbar-width: none;
                                    -ms-overflow-style: none;
                                }
                            `}
                        </style>
                        {products?.map((product) => (
                            <div
                                key={product._id}
                                className="grid gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors items-center"
                                style={{ gridTemplateColumns: '1fr 2fr 0.7fr 1fr 1fr 100px' }}
                            >
                                <div className="text-sm text-gray-600 truncate">{product._id}</div>
                                <div className="text-gray-800 text-sm truncate">{product.name}</div>
                                <div className="text-gray-600">${product.price}</div>
                                <div className="text-gray-600 truncate">{product.category}</div>
                                <div className="text-gray-600 truncate">{product.brand}</div>
                                <div className="flex space-x-3 justify-center">
                                    <button
                                        onClick={() => handleEdit(product._id)}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <FaEdit className="text-xl" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductList;
