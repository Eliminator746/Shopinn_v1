import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <div className='sticky top-0 z-10 flex justify-between items-center py-4 px-6 bg-white bg-opacity-80 backdrop-blur-md text-gray-800 shadow-lg'>
            <h1 className='font-bold text-2xl tracking-wider cursor-pointer transition duration-100 ease-in-out hover:scale-110' href='/'>Shoppinn</h1>
      
      <ul className='flex space-x-6 items-center'>
        <li className='navbar-item' href='/cart'>
          <FaShoppingCart className='text-xl' />
          <span className='text-lg'>Cart</span>
        </li>
        <li className='navbar-item' href='/login'>
          <FaUser className='text-xl' />
          <span className='text-lg'>Sign In</span>
        </li>
      </ul>
    </div>
  );
};

export default Header;
