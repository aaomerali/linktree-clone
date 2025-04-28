import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './features/dashboard/Dashboard';
import Profile from './features/profile/Profile';
import Navbar from './components/Navbar';
import ReduxTest from './ResuxTest'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/test" element={<ReduxTest />} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;