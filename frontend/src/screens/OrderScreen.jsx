import React from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import { toast } from 'react-toastify';
import { useGetOrderDetailsQuery, usePayOrderMutation, useGetPaypalClientIdQuery } from '../features/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';


const OrderScreen = () => {
  const { id: orderId} = useParams();
  const { data : order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const { user, isDelivered, isPaid, paymentMethod, orderItems, shippingAddress, shippingPrice, taxPrice, totalPrice, itemsPrice } = order || {};
  const { name, email } = user || {};

  const totalQuantity = orderItems ? orderItems.reduce((acc, currVal) => acc + currVal.quantity, 0) : 0


  // ------------------------------------------------------------------------------------------------------------------------
    //                                                       PayPal LOGIC
  // ------------------------------------------------------------------------------------------------------------------------

  const [ payOrder, {isLoading: loadingPay} ] = usePayOrderMutation();

  // Reducer fn
  const [ {isPending}, paypalDispatch ]= usePayPalScriptReducer();

  const { userInfo } = useSelector((state)=> state.auth);
  

  //Fetching PayPal ClientId
  const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery();
  // console.log("PayPal API Response:", paypal);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadinPayPalScript = async () => {
        console.log("hi");
        
        paypalDispatch({
          type: 'resetOptions',
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending',
        });
      };
      console.log('clientId  : ', paypal.clientId);
      
      
      if (order && !isPaid) {
        if (!window.paypal) {
          loadinPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch]);
  
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units :[
        {
          amount: {
            value: totalPrice
          }
        }
      ]
    }).then((orderId)=>{
      return orderId
    });

  }

  const onApprove= (data, actions) => {
    
    return actions.order.capture().
      then(async function (details) {
        try {
          // send PUT req. to Backend
          await payOrder ({ orderId, details })

          //refresh order (i.e data) details
          refetch();
          toast.success("Payment Successful")
        } catch (err) {
          toast.error(err?.data?.message || err.message)
        }
      })
  }

  const onApproveTest = async () => {
    await payOrder({orderId, details : { payer: {} }})
    console.log('isPaid : ', isPaid);
    refetch()
    
    toast.success("Order is successfully paid")
  }

  const onError = (err) => {
    toast.error(err.message)
  }
  console.log('isPaid : ', isPaid);

  return (
    <>
      {isLoading ?
        <div>Loading...</div>
        : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            <div className='bg-gray-50 pt-6'>
              <h1 className='mb-8 text-3xl font-semibold text-gray-800 px-4'>Order {orderId}</h1>
              <div className='grid grid-cols-1 md:grid-cols-3 '>
                {/* Left Section */}
                <div className="container mx-auto px-4 col-span-2">
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
                  {/* Button to place order i.e order */}
                  <div className="mt-6">
                    {!isPaid && (
                      <div>
                        {loadingPay && <div>loading Pay...</div>}{" "}
                        {isPending ? (
                          <div>Loading PayPal ... </div>
                        ) : (
                          <div>
                            <button onClick={onApproveTest}>
                              Test Button
                            </button>

                            <div>
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* <div className="mt-6">
                    {userInfo  && isPaid && !isDelivered && (
                      <Button
                        type="button"
                        className="w-full py-3 px-5 bg-gray-500 text-gray-100 text-lg font-semibold rounded-lg hover:bg-green-600 transition duration-200"
                      >
                        Mark As Delivered
                      </Button>
                    )}
                  </div> */}
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
