import React from 'react'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
    return <>
        <div className="text-3xl font-semibold text-gray-800 pt-4">
            Latest Product
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2'>
            {products.map((items) =>
                <div key={items._id}>
                    <Product product={items} />
                </div>)}
        </div>
    </>
}

export default HomeScreen