import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './features/dashboard/Dashboard';
import Profile from './features/profile/Profile';
import Navbar from './components/Navbar';
import ReduxTest from './ResuxTest';

// Public Route Component (for auth pages)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Private Route Component (for protected pages)
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Auth routes - only accessible when NOT logged in */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* Protected routes - only accessible when logged in */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/test" element={
          <PrivateRoute>
            <ReduxTest />
          </PrivateRoute>
        } />
        
        <Route path="/:username" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
          } />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;