import React, { useState } from 'react'
import { saveShippingAddress } from '../features/cartSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ShippingScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    // console.log({cart});
    // console.log(typeof(cart));
    


    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            dispatch(saveShippingAddress({ address, city, postalCode, country }))
            navigate('/payment')
        } catch (err) {
            console.error('Shipping Address error:', err);
            toast.error(err?.data?.message || err.error || 'Shipping failed');
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 flex justify-center">
            <div className="w-full max-w-3xl p-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 my-6">Shipping Information</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                            placeholder="Enter your address"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">City</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                            placeholder="Enter your city"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Postal Code</label>
                        <input
                            type="number"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                            placeholder="Enter your postal code"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full p-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                            placeholder="Enter your country"
                        />
                    </div>

                    <button
                        type="submit"
                        className="py-3 px-5 bg-gray-500 text-gray-100 font-semibold rounded cursor mb-4"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>

    )
}

export default ShippingScreen