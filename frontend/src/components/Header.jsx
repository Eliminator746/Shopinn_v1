import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Header = () => {

  const cart = useSelector((state) => {
    return state.cart.cartItems
  })
  const totalqty = cart.reduce((acc, items) => acc + items.quantity, 0)
  // console.log(totalqty);

  return (
    <div className='sticky top-0 z-10 flex justify-between items-center py-4 px-6 bg-white bg-opacity-80 backdrop-blur-md text-gray-800 shadow-lg'>
      <NavLink className='font-bold text-2xl tracking-wider cursor-pointer transition duration-100 ease-in-out hover:scale-110' to='/'>Shoppinn</NavLink>

      <ul className='flex space-x-6 items-center'>
        <li className='navbar-item'>
          <NavLink to='/cart' className="relative">
            <FaShoppingCart className="text-xl" />
            {totalqty > 0 && (
              <span className="absolute bottom-9 right-5 text-xs w-5 h-5 bg-gray-400 text-white rounded-full flex items-center justify-center">
                {totalqty}
              </span>
            )}
            <span className="text-lg">Cart</span>
          </NavLink>
        </li>
        <li className='navbar-item'>
          <NavLink to='/login'>
            <FaUser className='text-xl' />
            <span className='text-lg'>Sign In</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
