//---------------------------------------------------------------------------------------------------------------------
//                                              Cart Logic
//---------------------------------------------------------------------------------------------------------------------

// 1. We are storing cart items in local storage
// 2. We check if cart items is stored in LS.

// AddToCart :
// 1. Get item from payload
// 2. Check if it already exists in Cart
// 3. If yes, increase the quantity by 1
// 4. Else update cart with quantity as 1
// 5. Calculate ItemPrice, ShippingPrice, TaxPrice, TotalPrice
// 6. Add this state to Local Storage
//---------------------------------------------------------------------------------------------------------------------

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Get item from payload
      const product = action.payload;

      // Check if item exists in Cart
      const itemExists = state.cartItems.find((x) => x._id === product._id);

      if (itemExists) {
        // increase the quantity of that product
        state.cartItems = state.cartItems.map((items) =>
          items._id === product._id
            ? { ...items, quantity: items.quantity + product.quantity }
            : items
        );
      } else {
        // Update quantity
        state.cartItems = [...state.cartItems, product];

        return updateCart(state);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload; // should be object
      localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, } =
  cartSlice.actions;
export default cartSlice.reducer;
