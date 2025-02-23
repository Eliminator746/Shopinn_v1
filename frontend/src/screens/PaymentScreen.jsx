import React, { useState, useEffect } from 'react';
import { savePaymentMethod } from '../features/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

//---------------------------------------------------------------------------------------------------------------------
//                                              PaymentScreen Logic
//---------------------------------------------------------------------------------------------------------------------

    //1. Check if shippingAddress is provided or not, if not navigate there
    //2. Dispatch paymentMethod and then navigate to '/placeorder'

//---------------------------------------------------------------------------------------------------------------------

const PaymentScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {

        if (!shippingAddress) {
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const [isChecked, setIsChecked] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value)
        setIsChecked((prevChecked) => !prevChecked);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        try {
            dispatch(savePaymentMethod(paymentMethod))
            navigate('/placeorder')
        } catch (err) {
            console.error('err : ', err);
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <CheckoutSteps step1 step2 step3 />
            <h1 className="text-2xl font-bold text-center mb-6">Payment Method</h1>
            <form onSubmit={submitHandler} className="space-y-6">
                <fieldset className="border border-gray-300 p-4 rounded-md">
                    <legend className="font-medium text-lg mb-4">Select Method</legend>

                    <div className="flex items-center mb-4">
                        <input
                            type="radio"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked={isChecked} 
                            onChange={handlePaymentMethodChange}
                            className="h-5 w-5 text-blue-500 border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="PayPal" className="ml-2 text-gray-700">PayPal or Credit Card</label>
                    </div>
                </fieldset>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PaymentScreen