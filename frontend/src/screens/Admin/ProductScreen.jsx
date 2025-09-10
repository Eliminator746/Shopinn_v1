import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import Message from '../../components/Message';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../features/productsApiSlice';
import Loader from '../../components/Loader';
import useAutoHideScroll from '../../hooks/useAutoHideScroll';
import SlidePanel from '../../components/common/SlidePanel';
import ProductForm from '../../components/common/ProductForm';
import DeleteConfirmationModal from '../../components/common/DeleteConfirmationModal';
import { toast } from 'react-toastify';

const ProductList = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    const [isScrollVisible, setGridRef] = useAutoHideScroll({ hideDelay: 5000 });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [createProduct, { isLoading: creatingProductLoader }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const handleCreateProduct = async () => {
        try {
            await createProduct().unwrap();
            await refetch();
            toast.success('Product created successfully');
        } catch (err) {
            toast.error(err?.data?.message || 'Error creating product');
        }
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteProduct(productToDelete._id).unwrap();
            await refetch();
            toast.success('Product deleted successfully');
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
        } catch (err) {
            toast.error(err?.data?.message || 'Error deleting product');
        }
    };

    return (
        <div className="p-4">
            {/* Header with Create Product button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
                <button
                    className="flex items-center px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                    onClick={handleCreateProduct}
                    disabled={creatingProductLoader}
                >
                    <FaPlus className="mr-2" />
                    {creatingProductLoader ? 'Creating...' : 'Create Product'}
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
                        <div className="text-center">ACTIONS</div>
                    </div>

                    {loadingDelete && <Loader />}
                    {/* Grid Body */}
                    <div
                        ref={setGridRef}
                        className={`bg-white rounded-b-lg shadow-sm h-[63vh] overflow-y-auto transition-all duration-300 ${isScrollVisible ? 'scrollbar-visible' : 'scrollbar-hidden'
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
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsFormOpen(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <FaEdit className="text-xl" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800 transition-colors"
                                        onClick={() => handleDeleteClick(product)}
                                    >
                                        <FaTrash className="text-xl" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Delete Confirmation Modal */}
                    <DeleteConfirmationModal
                        isOpen={isDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setProductToDelete(null);
                        }}
                        onDelete={handleDeleteConfirm}
                        itemName={productToDelete?.name || ''}
                    />

                    {/* Slide-in Edit Form */}
                    <SlidePanel
                        isOpen={isFormOpen}
                        onClose={() => {
                            setIsFormOpen(false);
                            setSelectedProduct(null);
                        }}
                        title="Edit Product"
                    >
                        {selectedProduct && (
                            <ProductForm
                                product={selectedProduct}
                                onClose={() => {
                                    setIsFormOpen(false);
                                    setSelectedProduct(null);
                                }}
                                onSuccess={refetch}
                            />
                        )}
                    </SlidePanel>
                </>
            )}
        </div>
    );
};

export default ProductList;
