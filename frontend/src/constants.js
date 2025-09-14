export const BASE_URL = 
  import.meta.env.MODE === 'development' 
    ? 'http://localhost:8000'
    : '';
export const PRODUCTS_URL = '/api/v1/products';
export const USERS_URL = '/api/v1/users';
export const ORDERS_URL = '/api/v1/orders';
export const PAYPAL_URL = '/api/config/paypal';


// http://localhost:8000/api/v1/products