// ------------------------------------------------------------------------------------------------------------------------
//                                                          PlaceOrderScreen Logic
// ------------------------------------------------------------------------------------------------------------------------

// 1. Check for shipping address, payment details. If not present -> redirect to that page
// 2. useSelector -> to see cartInfo
// 3. useDispatch -> to clear LS
// 4. useNavigate() -> to redirect
// 5. useCreateOrderMutation -> to send post req.
// 6. clearCartItems -> to clear LS

// ------------------------------------------------------------------------------------------------------------------------

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useCreateOrderMutation } from '../features/ordersApiSlice.js';
import { clearCartItems } from '../features/cartSlice';
import { toast } from 'react-toastify';
import Message from '../components/Message.jsx'
import CheckoutSteps from '../components/CheckoutSteps.jsx';


const PlaceOrderScreen = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart)
    console.log(cart);

    useEffect(() => {
        if (!cart.shippingAddress.address)
            navigate('/shipping')
        if (!cart.paymentMethod)
            navigate('/payment')
    }, [cart.shippingAddress, cart.paymentMethod, navigate])

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();


    const onClickHandler = async () => {
        try {
            // Check network tab in response -> You'll get how to get specific value 
            // do POST req.
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                taxPrice: cart.taxPrice,
                shippingPrice: cart.shippingPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();

            // console.log('res_id : ', res.data._id); Check network tab in response -> You'll get how to get specific value 
            navigate(`/order/${res.data._id}`)
            dispatch(clearCartItems())
            // dispatch(clearCartItems())
            toast.success('Order created successfully!');

        } catch (err) {
            console.error('Order Creation error:', err);
            toast.error(err?.data?.message || err.error || 'Order Creation failed');
        }

    }
    return (
        <div className="container mx-auto py-8 px-4 bg-gray-50">
            <CheckoutSteps step1 step2 step3 step4 />
            {isLoading ? (
                <h2>🌀 Loading...</h2>
            ) : error ? (
                <>
                    <Message variant='danger'>{error?.data?.message || error.error}</Message>
                    {console.log(error)}
                </>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Shipping & Payment Info */}
                        <div className="p-6">
                            <div className="mb-8">
                                <strong className="text-2xl font-semibold text-gray-800">Shipping Information</strong>
                                <p className="text-gray-600 mt-6">{cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                            </div>

                            <div className="mb-8">
                                <strong className="text-2xl font-semibold text-gray-800">Payment Method</strong>
                                <p className="text-gray-600 mt-6">{cart.paymentMethod}</p>
                            </div>

                            {/* Order Items */}
                            <div>
                                <strong className="text-2xl font-semibold text-gray-800 mb-4">Order Items</strong>
                                <div className="space-y-4 mt-6">
                                    {cart.cartItems.map((order, index) => (
                                        <div key={index} className="flex items-center space-x-4 border-b pb-4">
                                            <div className="w-20 h-20 bg-gray-200">
                                                <Link to={`/product/${order._id}`}>
                                                    <img
                                                        src={order.image}
                                                        alt={order.name}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="flex flex-col space-y-2">
                                                <Link
                                                    to={`/product/${order._id}`}
                                                    className="text-lg font-semibold text-gray-800 hover:text-indigo-600"
                                                >
                                                    {order.name}
                                                </Link>
                                                <span className="text-sm text-gray-500">{order.quantity} x ${order.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="p-6">
                            <strong className="text-2xl font-semibold text-gray-800">Order Summary</strong>
                            <div className="space-y-4">
                                <div className="flex justify-between border-t pt-4 mt-6">
                                    <span className="text-gray-600">Items:</span>
                                    <span className="font-semibold text-gray-800">${cart.itemPrice}</span>
                                </div>
                                <div className="flex justify-between border-t pt-4">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span className="font-semibold text-gray-800">${cart.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between border-t pt-4">
                                    <span className="text-gray-600">Tax:</span>
                                    <span className="font-semibold text-gray-800">${cart.taxPrice}</span>
                                </div>
                                <div className="flex justify-between border-t pt-4">
                                    <span className="text-gray-800 font-semibold text-xl">Total:</span>
                                    <span className="text-gray-900 font-semibold text-xl">${cart.totalPrice}</span>
                                </div>
                            </div>
                            <div className="flex justify-between border-t pt-4">
                                {error && (
                                    <Message variant='danger'>{error.data.message}</Message>
                                )}
                            </div>
                            <button
                                className="w-full mt-6 py-3 px-5 bg-gray-500 text-gray-100 text-lg font-semibold rounded-lg hover:bg-green-600 transition duration-200"
                                onClick={onClickHandler}>
                                Place Order
                            </button>
                            {isLoading && <div>loading...</div>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PlaceOrderScreen;
