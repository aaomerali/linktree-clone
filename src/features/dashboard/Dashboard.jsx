import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../auth/authSlice';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Dashboard() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [links, setLinks] = useState(currentUser?.links || []);

  // Sync local state with Redux state changes
  useEffect(() => {
    if (currentUser) {
      setBio(currentUser.bio || '');
      setLinks(currentUser.links || []);
    }
  }, [currentUser]);

  const handleAddLink = () => {
    if (!newLink.title || !newLink.url) return;
    
    const updatedLinks = [
      ...links,
      {
        id: uuidv4(),
        title: newLink.title,
        url: newLink.url.startsWith('http') ? newLink.url : `https://${newLink.url}`
      }
    ];
    
    dispatch(updateUserProfile({
      ...currentUser,
      links: updatedLinks
    }));
    setNewLink({ title: '', url: '' });
  };

  const handleUpdateLink = (linkId, updatedFields) => {
    const updatedLinks = links.map(link => 
      link.id === linkId ? { ...link, ...updatedFields } : link
    );
    dispatch(updateUserProfile({
      ...currentUser,
      links: updatedLinks
    }));
  };

  const handleDeleteLink = (linkId) => {
    const updatedLinks = links.filter(link => link.id !== linkId);
    dispatch(updateUserProfile({
      ...currentUser,
      links: updatedLinks
    }));
  };

  const handleReorderLinks = (newOrder) => {
    dispatch(updateUserProfile({
      ...currentUser,
      links: newOrder
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Resize and compress image before storing
    compressImage(file, 200, 0.7).then(compressedFile => {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateUserProfile({
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(compressedFile);
    });
  };

  const compressImage = (file, maxWidth, quality) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          canvas.toBlob(
            (blob) => resolve(blob),
            'image/jpeg',
            quality
          );
        };
      };
      reader.readAsDataURL(file);
    });
  };
  

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Profile Section */}
      <div className="mb-8 text-center">
        <div className="relative inline-block group mb-6">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mx-auto">
            {currentUser?.profilePicture ? (
              <img 
                src={currentUser.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No photo</span>
            )}
          </div>
          <label
            className="absolute bottom-0 right-2 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all"
            htmlFor="profile-upload"
          >
            📷
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <textarea
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            dispatch(updateUserProfile({
              ...currentUser,
              bio: e.target.value
            }));
          }}
          placeholder="Tell us about yourself..."
          className="w-full max-w-md p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      {/* Links Management */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Your Links</h1>
        
        {/* Add New Link Form */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Link Title"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="url"
            placeholder="https://example.com"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddLink}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Add New Link
          </button>
        </div>

        {/* Links List */}
        <div className="space-y-4">
          {links.map((link, index) => (
            <div key={link.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <input
                  value={link.title}
                  onChange={(e) => handleUpdateLink(link.id, { title: e.target.value })}
                  className="w-full p-2 border-b focus:outline-none focus:border-blue-500"
                />
                <input
                  value={link.url}
                  onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                  className="w-full p-2 border-b focus:outline-none focus:border-blue-500 text-sm text-gray-600"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Link */}
        {currentUser?.username && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-2">Your public profile:</p>
            <Link
              to={`/${currentUser.username}`}
              className="text-blue-500 hover:text-blue-600 font-medium"
              target="_blank"
            >
              {window.location.origin}/{currentUser.username}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;