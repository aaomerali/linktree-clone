import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../auth/authSlice';
import { addLink, removeLink, updateLink } from './linksSlice';

export default function Dashboard() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const links = useSelector(state => state.links);
    const [newLink, setNewLink] = useState({ title: '', url: '' });

    const handleAddLink = () => {
        dispatch(addLink({ ...newLink, id: Date.now() }));
        setNewLink({ title: '', url: '' });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onloadend = () => {
        dispatch(updateProfile({ 
            ...user,
            profilePicture: reader.result 
        }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            {/* Profile Section */}
            <div className="mb-8 w-full max-w-2xl">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {user?.profilePicture ? (
                                <img 
                                src={user.profilePicture}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400">No photo</span>
                            )}
                        </div>
                        
                        <label
                            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-all"
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
                        value={user?.bio || ''}
                        onChange={(e) => dispatch(updateProfile({ bio: e.target.value }))}
                        placeholder="Add a bio..."
                        className="w-full p-2 border rounded-lg resize-none"
                        rows="3"
                    />
                </div>
            </div>
            
            {/* Links Section */}
            <div className="w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">My Links</h1>
                
                {/* Add Link Form */}
                <div className="mb-4 flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Title"
                        className="border p-2 rounded"
                        value={newLink.title}
                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    />
                    <input
                        type="url"
                        placeholder="URL"
                        className="border p-2 rounded"
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    />
                    <button 
                        onClick={handleAddLink} 
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Add Link
                    </button>
                </div>

                {/* Links List */}
                <div className="flex flex-col gap-2">
                    {links.map(link => (
                        <div key={link.id} className="flex gap-2">
                            <input
                                value={link.title}
                                onChange={(e) => dispatch(updateLink({ ...link, title: e.target.value }))}
                                className="border p-2 rounded flex-1"
                            />
                            <input
                                value={link.url}
                                onChange={(e) => dispatch(updateLink({ ...link, url: e.target.value }))}
                                className="border p-2 rounded flex-1"
                            />
                            <button
                                onClick={() => dispatch(removeLink(link.id))}
                                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}