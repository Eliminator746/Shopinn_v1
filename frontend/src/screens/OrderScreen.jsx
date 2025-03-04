import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { useGetOrderDetailsQuery } from '../features/ordersApiSlice';

const OrderScreen = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOrderDetailsQuery(id);

  if (!data) return null; // Edge case if no data present
  // console.log(data);

  const { user, isDelivered, isPaid, paymentMethod, orderItems, shippingAddress, shippingPrice, taxPrice, totalPrice, itemsPrice } = data || {};
  const { name, email } = user || {};

  const totalQuantity = orderItems.reduce((acc, currVal) => acc + currVal.quantity, 0)

  return (
    <>
      {isLoading ?
        <div>Loading...</div>
        : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <div className='bg-gray-50 pt-6'>
              <h1 className='mb-8 text-3xl font-semibold text-gray-800 px-4'>Order {id}</h1>
              <div className='grid grid-cols-1 md:grid-cols-2 '>
                {/* Left Section */}
                <div className="container mx-auto px-4 ">
                  <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">Shipping</h1>
                    <div className="mt-4">
                      <strong className="text-xl font-medium text-gray-700">Name:</strong>
                      <p className="text-gray-900">{name}</p>
                    </div>
                    <div className="mt-4">
                      <strong className="text-xl font-medium text-gray-700">Email:</strong>
                      <p className="text-gray-900">{email}</p>
                    </div>
                    <div className="mt-4">
                      <strong className="text-xl font-medium text-gray-700">Address:</strong>
                      <p className="text-gray-900">{shippingAddress.address} {shippingAddress.city} {shippingAddress.country}, {shippingAddress.postalCode}</p>
                    </div>
                  </div>
                  <div className="mb-8">
                    {isDelivered ? (
                      <Message variant='success'>Delivered</Message>
                    ) : (
                      <Message variant='danger'>Not Delivered</Message>
                    )}
                  </div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">Payment Method</h1>
                    <div className="mt-4">
                      <strong className="text-xl font-medium text-gray-700">Method:</strong>
                      <p className="text-gray-600">{paymentMethod}</p>
                    </div>
                  </div>
                  <div className="mb-8">
                    {isPaid ? <Message variant='success'>Paid</Message> : <Message variant='danger'>Not Paid</Message>}
                  </div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-800">Order Items</h1>
                    {orderItems.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 border-b pb-4 mt-6">
                        {/* Product Image */}
                        <div className="w-32 h-32 bg-gray-200">
                          <Link to={`/product/${item._id}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </Link>
                        </div>
                        {/* Product Details */}
                        <div className="flex flex-col space-y-2">
                          <Link to={`/product/${item._id}`} className="text-lg font-semibold text-gray-800 hover:text-indigo-600">
                            {item.name}
                          </Link>
                          <div className='flex justify-between'>
                            <span className="text-sm text-gray-500">${item.price}</span>
                            <span className="text-sm text-gray-500">
                              {`${item.quantity} * ${item.price} = $${item.quantity * item.price}`}
                            </span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Right Section */}
                <div className="px-6">
                  <strong className="text-3xl font-semibold text-gray-800">Order Summary</strong>
                  <div className="space-y-5 mt-6">
                    {/* Items */}
                    <div className="flex justify-between border-t pt-4">
                      <span className="text-gray-600">Total Items:</span>
                      <span className="font-semibold text-gray-800">{totalQuantity}</span>
                    </div>
                    {/* Shipping Price */}
                    <div className="flex justify-between border-t pt-4">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold text-gray-800">${shippingPrice}</span>
                    </div>
                    {/* Tax */}
                    <div className="flex justify-between border-t pt-4">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-semibold text-gray-800">${taxPrice}</span>
                    </div>
                    {/* Total */}
                    <div className="flex justify-between border-t pt-4">
                      <span className="text-gray-800 font-semibold text-xl">Total:</span>
                      <span className="text-gray-900 font-semibold text-xl">${totalPrice}</span>
                    </div>
                  </div>
                  {/* Error message */}
                  <div className="flex justify-between border-t pt-4">
                    {error && (
                      <Message variant="danger">{error.data.message}</Message>
                    )}
                  </div>
                  {/* Button to place order */}
                  <div className="mt-6">
                    {user && isPaid && !isDelivered && (
                      <Button
                        type="button"
                        className="w-full py-3 px-5 bg-gray-500 text-gray-100 text-lg font-semibold rounded-lg hover:bg-green-600 transition duration-200"
                        onClick={deliverHandler}
                      >
                        Mark As Delivered
                      </Button>
                    )}
                  </div>
                  {/* Loading state */}
                  {isLoading && <div className="text-center text-gray-600 mt-4">Loading...</div>}
                </div>
              </div>
            </div>
          </>)
      }

    </>

  );
}


export default OrderScreen;
