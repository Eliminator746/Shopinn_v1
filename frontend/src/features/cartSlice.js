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

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const addDecimal = (item) => (Math.round(item * 100) / 100).toFixed(2);
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

        // Calculate itemPrice
        const itemsPrice = state.cartItems.reduce(
          (acc, item) => acc + (item.price * 100 * item.quantity) / 100,
          0
        );
        state.itemPrice = addDecimal(itemsPrice);

        // Calculate ShippingPrice
        const shippingPrice = itemsPrice > 100 ? 0 : 10;
        state.shippingPrice = addDecimal(shippingPrice);

        // Calculate TaxPrice
        const taxPrice = 0.15 * itemsPrice;
        state.taxPrice = addDecimal(taxPrice);

        // Calculate Total
        const totalPrice = itemsPrice + shippingPrice + taxPrice;
        state.totalPrice = addDecimal(totalPrice);

        // Save the prices in Local Storage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
