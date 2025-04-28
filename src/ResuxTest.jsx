import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateProfile } from './features/auth/authSlice';
import { addLink, removeLink, updateLink, reorderLinks } from './features/dashboard/linksSlice';

const ResuxTest = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const links = useSelector((state) => state.links);

  const [newLink, setNewLink] = useState('');

  const handleLogin = () => {
    const userData = { id: 1, name: 'John Doe' };
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateProfile = () => {
    const updatedUser = { ...user, name: 'John Updated' };
    dispatch(updateProfile(updatedUser));
  };

  const handleAddLink = () => {
    if (newLink) {
      dispatch(addLink({ id: Date.now(), url: newLink }));
      setNewLink('');
    }
  };

  const handleRemoveLink = (id) => {
    dispatch(removeLink(id));
  };

  const handleUpdateLink = (id) => {
    const updatedLink = { id, url: 'https://updated-link.com' };
    dispatch(updateLink(updatedLink));
  };

  const handleReorderLinks = () => {
    const reorderedLinks = [...links].reverse();
    dispatch(reorderLinks(reorderedLinks));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Redux Testing Page</h1>

        {/* Authentication Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {isAuthenticated ? `Welcome, ${user?.name}` : 'Not logged in'}
          </h2>
          <div className="flex gap-4">
            <button
              onClick={isAuthenticated ? handleLogout : handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
            {isAuthenticated && (
              <button
                onClick={handleUpdateProfile}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
              >
                Update Profile
              </button>
            )}
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Links</h2>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="Add a new link"
              className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleAddLink}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Add
            </button>
          </div>
          <button
            onClick={handleReorderLinks}
            className="mb-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
          >
            Reorder Links
          </button>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.id} className="flex justify-between items-center bg-gray-50 p-4 rounded shadow">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {link.url}
                </a>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateLink(link.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResuxTest;
