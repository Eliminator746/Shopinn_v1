import React from 'react'
import Card from './Card';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="flex flex-col h-full p-4 w-10/12 sm:w-full">
      <Card>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </Link>

        <div className="p-4">
          <Link
            to={`/product/${product._id}`}
            className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-200 truncate block max-w-full"
          >
            {product.name}
          </Link>
          <Rating value={4.5} text={`${product.numReviews} Reviews`} />
          <div className="mt-4">
            <span className="text-lg font-semibold text-gray-900">
              ${product.price}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Product