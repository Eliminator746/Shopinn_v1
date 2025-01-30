import React from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../components/Rating';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../features/productsApiSlice.js'
import Message from '../components/Message'


const ProductDetails = () => {

    const { productId } = useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId); // productId comes from useParams



    return (
        <div className='flex flex-col gap-4 p-6'>

            <div className='flex justify-start'>
                <Link to='/'
                    className="p-4 flex items-center gap-1 text-lg text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                    <FaArrowLeft /> Back
                </Link>
            </div>
            {isLoading ? (
                <h2>🌀 Loading...</h2>
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>

                        <div className='flex justify-center md:col-span-2'>
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-lg shadow-lg w-full max-w-sm object-cover"
                            />
                        </div>


                        <div className='flex flex-col gap-4'>
                            <div className="text-3xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-200">
                                {product.name}
                            </div>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            <div className="mt-4 text-lg font-semibold text-gray-900">
                                ${product.price}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                        </div>


                        <div className='bg-white rounded-lg shadow-md p-4'>
                            <table className="w-full">
                                <tbody>
                                    <tr>
                                        <td className="py-2 text-gray-700">Price:</td>
                                        <td className="py-2 text-right font-semibold text-gray-900">${product.price}</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 text-gray-700">Status:</td>
                                        <td className={`py-2 text-right   ${product.countInStock ? ' text-green-500' : 'text-red-500'} font-semibold`}> {product.countInStock ? 'In Stock' : 'Out Of Stock'} </td>
                                    </tr>
                                    <tr>
                                        <td className="py-2" colSpan={2}>
                                            <hr className="my-2" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            <button
                                                className={`w-full py-2 mt-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 
${!product.countInStock ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
                                                disabled={!product.countInStock}
                                            >
                                                Add to Cart
                                            </button>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
}

export default ProductDetails;

