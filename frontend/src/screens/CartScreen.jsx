import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../features/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);

    console.log(cartItems);

    const totalQty = cartItems.reduce((acc, items) => acc + items.quantity, 0);
    const totalPrice = Number(cartItems.reduce((acc, items) => acc + items.price * items.quantity, 0));
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };


    return (
        <div className="py-6 px-10 mb-6">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message variant="info">
                    Cart is empty. <Link to="/" className="text-black underline">Go Back</Link>
                </Message>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
                    <div className="space-y-6">
                        {cartItems.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-6">
                                {/* Product Image */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />

                                {/* Product Details */}
                                <div className="flex-1">
                                    <Link to={`/product/${product._id}`} className="font-semibold text-lg">{product.name}</Link>
                                    <div className="text-gray-600">${product.price}</div>
                                </div>

                                {/* Select and Delete Button */}
                                <div className="flex items-center space-x-4">
                                    <select className="w-16 p-2 bg-gray-100 rounded-md"
                                        value={product.quantity}
                                        onChange={(e) => {
                                            dispatch(addToCart({ ...product, quantity: Number(e.target.value) }))
                                        }}>
                                        {[...Array(product.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <button className="pr-2 text-red-500 hover:text-red-700 font-semibold"
                                        onClick={() => dispatch(removeFromCart(product._id))}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span>Total items:</span>
                                <span>{totalQty}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                         onClick={checkoutHandler}>
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
