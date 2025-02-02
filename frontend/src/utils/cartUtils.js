export function updateCart(state) {
  const addDecimal = (item) => (Math.round(item * 100) / 100).toFixed(2);

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

  return state;
}
