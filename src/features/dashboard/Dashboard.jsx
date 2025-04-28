import { useDispatch, useSelector } from 'react-redux';
import { addLink, removeLink, updateLink } from './linksSlice';
import { useState } from 'react';


export default function Dashboard() {
  const dispatch = useDispatch();
  const links = useSelector(state => state.links);
  const [newLink, setNewLink] = useState({ title: '', url: '' });

  const handleAddLink = () => {
    dispatch(addLink({ ...newLink, id: Date.now() }));
    setNewLink({ title: '', url: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Links</h1>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mr-2"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
        />
        <input
          type="url"
          placeholder="URL"
          className="border p-2 mr-2"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <button onClick={handleAddLink} className="bg-blue-500 text-white p-2">
          Add Link
        </button>
      </div>

      {links.map(link => (
        <div key={link.id} className="flex items-center mb-2">
          <input
            value={link.title}
            onChange={(e) => dispatch(updateLink({ ...link, title: e.target.value }))}
            className="border p-2 mr-2"
          />
          <input
            value={link.url}
            onChange={(e) => dispatch(updateLink({ ...link, url: e.target.value }))}
            className="border p-2 mr-2 flex-1"
          />
          <button
            onClick={() => dispatch(removeLink(link.id))}
            className="bg-red-500 text-white p-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}