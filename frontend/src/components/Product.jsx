import React from 'react'
import Card from './Card';

const Product = ({product}) => {
    return (
        <div className="p-4">
          <Card>
            <a href={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-150 h-64 object-cover"
              />
            </a>
    
            <div className="p-4">
              <a
                href={`/product/${product._id}`}
                className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition duration-200"
              >
                {product.name}
              </a>
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