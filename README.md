# Shoppin

Shoppin is a full-stack e-commerce web application that allows users to browse products, add them to a shopping cart, and complete their purchase. The platform also offers features such as user authentication, order management, and product display.

## Technologies Used

### Backend

- **Express.js**: Backend framework for routing and API handling.
- **CORS**: Cross-Origin Resource Sharing middleware for handling cross-origin requests.
- **JWT (JSON Web Token)**: Used for user authentication and authorization.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Bcrypt**: Used for hashing and comparing passwords.
- **Multer**: Middleware for handling file uploads (like product images).
- **Zod**: A TypeScript-first schema declaration and validation library.
- **Cookie-parser**: Middleware for parsing cookies.
- **Mongoose-Aggregate-Paginate-V2**: For pagination of MongoDB queries.

### Frontend

- **React**: Frontend library for building the user interface.
- **React Router DOM**: Library for routing in React applications.
- **Redux Toolkit**: State management for handling global app state (e.g., shopping cart).
- **React Toastify**: For showing notifications in the app.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **PayPal SDK**: To integrate PayPal for payments.
- **Vite**: Build tool and development server for faster development.

### Dependencies

#### Backend (Root folder)
```json
"dependencies": {
  "axios": "^1.7.9",
  "bcrypt": "^5.1.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.9.5",
  "mongoose-aggregate-paginate-v2": "^1.1.3",
  "multer": "^1.4.5-lts.1",
  "zod": "^3.24.1"
}
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/shopinn_v1.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shopinn_v1
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root folder and add the following:

   ```plaintext
    NODE_ENV=development
    MONGODB_URI=your-mongodb-url
    PORT=8000
    CORS_ORIGIN=http://localhost:5173
    
    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRY=
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRY=
    PAYPAL_CLIENT_ID=
   ```

5. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

6. Starts both the backend and frontend servers concurrently:

   ```bash  
   npm run dev
   ```

7. Access the web app in your browser:

   Open http://localhost:5173/ in your browser to view the application.

Features

    User Authentication: Users can sign up, log in, and manage their accounts using JWT-based authentication.
    Product Listings: Browse products with categories and filters.
    Shopping Cart: Add items to the cart, adjust quantities, and proceed to checkout.
    Order Management: Users can view their order history and track their purchases.
    Payment Integration: Secure payments via PayPal.
    Product Reviews: Users can leave reviews and ratings for products.
    Admin Panel: Admins can add, update, and delete products, as well as manage orders.
    Responsive Design: The application is fully responsive, ensuring a seamless experience on both desktop and mobile devices.

