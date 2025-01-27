import React, { useEffect, useState } from 'react'
import Product from '../components/Product'
import axios from 'axios'




const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/api/v1/products');
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    },[]);

    return <>
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
}

export default HomeScreen