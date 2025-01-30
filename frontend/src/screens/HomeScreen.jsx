import React from 'react';
import { useGetProductsQuery } from '../features/productsApiSlice.js';
import Product from '../components/Product';
import Message from '../components/Message';



const HomeScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery();
    // We renamed data as products

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <div className="text-3xl font-semibold text-gray-800 pt-4">
                        Latest Product
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                        {products.map((items) =>
                            <div key={items._id} className='flex flex-col items-center'>
                                <Product product={items} />
                            </div>)}
                    </div>
                </>
            )
            }
        </>
    )
}

export default HomeScreen