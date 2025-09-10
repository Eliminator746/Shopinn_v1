import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../features/productsApiSlice.js'
import Message from '../components/Message'
import { addToCart } from '../features/cartSlice.js'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx';


const ProductDetails = () => {

    const { productId } = useParams();
    const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productId); // productId comes from useParams
    const { userInfo } = useSelector((state) => state.auth);


    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({
                productId: productId,
                rating,
                comment,
            }).unwrap();
            toast.success('Review submitted successfully');
            setRating('');
            setComment('');
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, quantity }))
        navigate('/cart')
    }

    const alreadyReview = product?.reviews.find(
        (review) => review.user.toString() === userInfo.data.user._id.toString()
    );

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
                                        <td><label>Qty:</label></td>
                                        <td className="py-2 text-right font-semibold text-gray-900">
                                            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                                                {[...Array(product.countInStock).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </td>
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
                                                onClick={addToCartHandler}
                                            >
                                                Add to Cart
                                            </button>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    {loadingProductReview && <Loader />}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Reviews List */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                            {product.reviews.length === 0 ? (
                                <Message>No Reviews</Message>
                            ) : (
                                <div className="space-y-4">
                                    {product.reviews.map((review) => (
                                        <div key={review._id} className="border-b pb-4">
                                            <div className="flex items-center mb-1">
                                                <strong className="text-gray-700">{review.name}</strong>
                                            </div>
                                            <Rating value={review.rating} />
                                            <p className="text-gray-600 mt-2">{review.comment}</p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Write a Review Form */}
                        {userInfo && !alreadyReview && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
                                <form onSubmit={submitHandler}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Rating
                                        </label>
                                        <select
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold mb-2">
                                            Comment
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200"
                                    >
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductDetails;

