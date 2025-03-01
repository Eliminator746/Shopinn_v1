import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { useGetOrderDetailsQuery } from '../features/ordersApiSlice';

const OrderScreen = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetOrderDetailsQuery(id);

  if (!data) return null; // Edge case if no data present
  // console.log(data);

  const { user, isDelivered, isPaid, paymentMethod, orderItems, shippingAddress } = data || {};
  const { name, email } = user || {};

  return (
    <>
      {isLoading ?
        <div>Loading...</div>
        : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <div>
              <div className="container mx-auto py-8 px-4 bg-gray-50">
                <h1 className='mb-8'>Order {id}</h1>
                <div className="mb-8">
                  <h1 className="text-3xl font-semibold text-gray-800">Shipping</h1>
                  <div className="mt-4">
                    <strong className="text-xl font-medium text-gray-700">Name:</strong>
                    <p className="text-gray-600">{name}</p>
                  </div>
                  <div className="mt-4">
                    <strong className="text-xl font-medium text-gray-700">Email:</strong>
                    <p className="text-gray-600">{email}</p>
                  </div>
                  <div className="mt-4">
                    <strong className="text-xl font-medium text-gray-700">Address:</strong>
                    <p className="text-gray-600">{shippingAddress.address}</p>
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
                        <span className="text-sm text-gray-500">${item.price}</span>
                        <span className="text-sm text-gray-500">Quantity: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>)
      }

    </>

  );
}


export default OrderScreen;
