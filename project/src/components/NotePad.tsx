import React, { useState, useEffect, useRef } from 'react';
import { Save, Plus, Trash2, FolderOpen, Tag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: string;
  category: string;
  tags?: string[];
}

const NotePad: React.FC = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: []
  });
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedNotes = localStorage.getItem(`seo_notes_${user.id}`);
      if (savedNotes) {
        try {
          setNotes(JSON.parse(savedNotes));
        } catch (error) {
          console.error('Error loading notes:', error);
          setNotes([]);
        }
      }
    }
  }, [user]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`seo_notes_${user.id}`, JSON.stringify(notes));
    }
  }, [notes, user]);

  // Focus management for textarea
  useEffect(() => {
    if (showNewNote || currentNote) {
      const textarea = contentRef.current;
      if (textarea) {
        textarea.focus();
        // Place cursor at the end
        const length = textarea.value.length;
        textarea.setSelectionRange(length, length);
      }
    }
  }, [showNewNote, currentNote]);

  const handleSaveNote = () => {
    if (!newNote.title || !newNote.content) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      lastModified: new Date().toISOString(),
      category: newNote.category,
      tags: newNote.tags
    };

    setNotes(prevNotes => [...prevNotes, note]);
    setNewNote({ title: '', content: '', category: 'general', tags: [] });
    setShowNewNote(false);
  };

  const handleUpdateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === noteId
          ? { ...note, ...updates, lastModified: new Date().toISOString() }
          : note
      )
    );
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
    }
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    isEditing: boolean
  ) => {
    const value = e.target.value;
    if (isEditing && currentNote) {
      setCurrentNote({ ...currentNote, content: value });
    } else {
      setNewNote(prev => ({ ...prev, content: value }));
    }
  };

  const NoteModal: React.FC<{
    note?: Partial<Note>;
    onSave: () => void;
    onClose: () => void;
    isEditing?: boolean;
  }> = ({ note = newNote, onSave, onClose, isEditing = false }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? 'Edit Note' : 'Add New Note'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={note.title}
              onChange={(e) => isEditing
                ? setCurrentNote({ ...currentNote!, title: e.target.value })
                : setNewNote(prev => ({ ...prev, title: e.target.value }))
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
              placeholder="Note title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <textarea
              ref={contentRef}
              value={note.content}
              onChange={(e) => handleContentChange(e, isEditing)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
              rows={12}
              placeholder="Write your note here..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={note.category}
                onChange={(e) => isEditing
                  ? setCurrentNote({ ...currentNote!, category: e.target.value })
                  : setNewNote(prev => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
              >
                <option value="general">General</option>
                <option value="seo">SEO</option>
                <option value="content">Content</option>
                <option value="technical">Technical</option>
                <option value="ideas">Ideas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Add tags..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      e.preventDefault();
                      const newTag = e.currentTarget.value.trim();
                      if (isEditing) {
                        setCurrentNote({
                          ...currentNote!,
                          tags: [...(currentNote?.tags || []), newTag]
                        });
                      } else {
                        setNewNote(prev => ({
                          ...prev,
                          tags: [...(prev.tags || []), newTag]
                        }));
                      }
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <Tag className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
          {(note.tags?.length || 0) > 0 && (
            <div className="flex flex-wrap gap-2">
              {note.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEditing ? 'Save Changes' : 'Add Note'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold">Notes</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Keep track of important SEO tasks and ideas</p>
          </div>
          <button
            onClick={() => setShowNewNote(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center"
          >
            <Plus size={16} className="mr-2" />
            New Note
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map(note => (
            <div
              key={note.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{note.title}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Last modified: {new Date(note.lastModified).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentNote(note)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <FolderOpen size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3">
                {note.content}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {note.category}
                </span>
                {note.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNewNote && (
        <NoteModal
          onSave={handleSaveNote}
          onClose={() => setShowNewNote(false)}
        />
      )}

      {currentNote && (
        <NoteModal
          note={currentNote}
          onSave={() => {
            handleUpdateNote(currentNote.id, currentNote);
            setCurrentNote(null);
          }}
          onClose={() => setCurrentNote(null)}
          isEditing
        />
      )}
    </div>
  );
};

export default NotePad;