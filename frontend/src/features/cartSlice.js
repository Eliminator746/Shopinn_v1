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

import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItems('cart'))
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
            ? { ...items, quantity: items.quantity + 1 }
            : items
        );
      } else {
        // Update quantity
        state.cartItems = [...state.cartItems, { ...product, quantity: 1 }];

        // Calculate itemPrice
        state.itemPrice = addDecimal(
          state.cartItems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0)
        );

        // Calculate ShippingPrice
        state.shippingPrice = addDecimal( state.itemPrice > 100 ? 0 : 10 );

        // Calculate TaxPrice
        state.taxPrice = addDecimal( state.itemPrice * 0.15 );

        // Calculate Total
        state.totalPrice =
          addDecimal(state.itemPrice + state.shippingPrice + state.taxPrice);

        // Save the prices in Local Storage
        localStorage.setItem('cart',JSON.stringify(state))
      }
    },
  },
});

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer;
