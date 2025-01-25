import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className='sticky top-0 z-10 flex justify-between items-center py-4 px-6 bg-white bg-opacity-80 backdrop-blur-md text-gray-800 shadow-lg'>
            <NavLink className='font-bold text-2xl tracking-wider cursor-pointer transition duration-100 ease-in-out hover:scale-110' to='/'>Shoppinn</NavLink>
      
      <ul className='flex space-x-6 items-center'>
        <li className='navbar-item'>
          <NavLink  to='/cart'>
            <FaShoppingCart className='text-xl' />
            <span className='text-lg'>Cart</span>
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
