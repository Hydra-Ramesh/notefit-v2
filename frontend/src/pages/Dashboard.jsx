import React, { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Edit2, LogOut, Check, X, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const userName = localStorage.getItem('userName') || 'User';
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/auth');
    } else {
      fetchNotes();
    }
  }, [userId, navigate]);

  const fetchNotes = async () => {
    try {
      const res = await api.get('/notes');
      setNotes(res.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        navigate('/auth');
      }
      console.error("Error fetching notes:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      if (editingId) {
        await api.put(`/notes/${editingId}`, { title, content });
        setEditingId(null);
      } else {
        await api.post('/notes', { title, content });
      }
      setTitle('');
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10">
        <Link to="/" className="text-2xl font-black text-indigo-600 tracking-tight">NoteFit</Link>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <span>Logged in as <strong>{userName}</strong></span>
          <Link to="/" onClick={handleLogout} className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors">
            <LogOut size={16} /> Logout
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto p-6 flex flex-col md:flex-row gap-8 mt-4">
        {/* Form Section */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              {editingId ? <><Edit2 size={20} className="text-indigo-500"/> Edit Note</> : <><Plus size={20} className="text-indigo-500"/> Create Note</>}
            </h2>
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors"
                  placeholder="Note title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors min-h-[120px] resize-y"
                  placeholder="Write your thoughts here..."
                  required
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex justify-center items-center gap-2 cursor-pointer">
                  {editingId ? <><Check size={18} /> Update</> : <><Plus size={18} /> Add Note</>}
                </button>
                {editingId && (
                  <button type="button" onClick={cancelEdit} className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer">
                    <X size={18} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Notes List Section */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Notes</h2>
          
          {notes.length === 0 ? (
            <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 text-center text-slate-500">
              <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-lg font-medium text-slate-600">No notes yet</p>
              <p>Create your first note using the form.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map(note => (
                <div key={note._id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group flex flex-col h-full">
                  <h3 className="font-bold text-lg text-slate-800 mb-2">{note.title}</h3>
                  <p className="text-slate-600 whitespace-pre-wrap flex-1 text-sm">{note.content}</p>
                  
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(note)}
                      className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(note._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

