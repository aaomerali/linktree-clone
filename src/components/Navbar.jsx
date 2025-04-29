import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

function Navbar() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">LinkTreeClone</Link>
        
        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
              <button onClick={() => dispatch(logout())} className="hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar