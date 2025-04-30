import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import loadUser from '../auth/authSlice';




function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = loadUser(username);
        if (!userData) {
          setError('User not found');
        } else {
          setUser(userData);
        }
      } catch (error) {
        setError('Error loading profile');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [username]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        {user?.profilePicture && (
          <img 
            src={user.profilePicture} 
            alt={`${username}'s profile`}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold text-center mb-2">{username}</h1>
        {user?.bio && (
          <p className="text-gray-600 text-center mb-6">{user.bio}</p>
        )}
        
        <div className="space-y-3">
          {user?.links?.map(link => (
            <a
              key={link.id}
              href={link.url}
              className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile