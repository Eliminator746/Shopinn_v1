import React, { useMemo } from 'react';
import { useGetProductsQuery } from '../features/productsApiSlice.js';
import Product from '../components/Product';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Pagination';
import { FaArrowLeft } from 'react-icons/fa';



const HomeScreen = () => {

    const { pageNumber, keyword } = useParams()
    const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });
    // We renamed data as products

    const renderedProducts = useMemo(() => (
        data?.products?.map((item) => (
            <div key={item._id} >
                <Product product={item} />
            </div>
        ))
    ), [data?.products]);

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    {keyword && <div className='flex justify-start'>
                        <Link to='/'
                            className="p-4 flex items-center gap-1 text-lg text-indigo-600 hover:text-indigo-800 font-semibold"
                        >
                            <FaArrowLeft /> Back
                        </Link>
                    </div>}

                    <div className="text-3xl font-semibold text-gray-800 pt-4 pl-4">
                        Latest Product
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                        {renderedProducts}
                    </div>
                    {data.pages > 1 && (
                        <Paginate
                            pages={data.pages}
                            page={data.page}
                            keyword={keyword ? keyword : ''}
                        />
                    )}
                </>
            )}
        </>
    )
}

export default HomeScreen