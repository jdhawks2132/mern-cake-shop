import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGOUT_USER } from '../../utils/mutations';  // Import your logout mutation
import { useNavigate } from 'react-router-dom';

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, { error }] = useMutation(LOGOUT_USER);  // Define your logout mutation

  // check to see if the user is on the /goodbye page

  const isGoodbye = window.location.pathname === '/goodbye';

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Trigger the logout mutation
      // remove id_token from localStorage
      navigate('/goodbye');
      localStorage.removeItem('id_token');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-pink-200 p-6 text-gray-800">
      <div className="flex items-center flex-shrink-0 mr-6 lg:mr-0 lg:mb-0 mb-4">
        <h1 className="font-semibold text-2xl tracking-tight">Wustl Bakes</h1>
      </div>
      <div className="block lg:hidden">
        <button onClick={toggleMenu} className="flex items-center px-3 py-2 border rounded text-gray-800 border-pink-500 hover:text-pink-500 hover:border-pink-500">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z"/>
          </svg>
        </button>
      </div>
      <div className={`w-full ${isOpen ? 'block' : 'hidden'} lg:block  lg:flex lg:items-center lg:w-auto lg:space-x-4`}>
        <div className="text-sm lg:flex-grow lg:flex">

          { Object.keys(currentUser).length !== 0 && !isGoodbye  ? (
            <>
          <a href="/" className='font-bold text-gray-800 hover:text-pink-600 lg:mx-4'>Home</a>
          <a href="/cart" className='font-bold text-gray-800 hover:text-pink-600 lg:mx-4'>Cart</a>
          </>
          ) : (
            null
          )}

        </div>
        <div>
          {Object.keys(currentUser).length !== 0 && !isGoodbye ? (
            <button onClick={handleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-800 border-pink-500 hover:border-transparent hover:text-pink-600 hover:bg-pink-200 mt-4 lg:mt-0 lg:mx-2">Logout</button>
          ) : (
            <>
              <a href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-800 border-pink-500 hover:border-transparent hover:text-pink-600 hover:bg-pink-200 mt-4 lg:mt-0 lg:mx-2">Login</a>
              <a href="/signup" className="inline-block text-sm px-4 py-2 ml-4 leading-none border rounded text-gray-800 border-pink-500 hover:border-transparent hover:text-pink-600 hover:bg-pink-200 mt-4 lg:mt-0 lg:mx-2">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;