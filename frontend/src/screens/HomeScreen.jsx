import React,{useMemo} from 'react';
import { useGetProductsQuery } from '../features/productsApiSlice.js';
import Product from '../components/Product';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Pagination.jsx';


const HomeScreen = () => {

    const { pageNumber } = useParams()
    const { data, isLoading, error } = useGetProductsQuery({ pageNumber });

    console.log(data);
    const renderedProducts = useMemo(() => (
        data?.products?.map((item) => (
            <div key={item._id} >
                <Product product={item} />
            </div>
        ))
    ), [data]);

    return (
        <>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : error ? (
                <Message variant='danger'>{error?.data?.products?.message || error.error}</Message>
            ) : (
                <>
                    <div className="text-3xl font-semibold text-gray-800 pt-4 pl-4">
                        Latest Product
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
                        {renderedProducts}
                    </div>

                    <Paginate page={data.page} pages={data.pages} />
                </>
            )
            }
        </>
    )
}

export default HomeScreen