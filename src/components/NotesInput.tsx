import { useState } from 'react';

interface Note {
  title: string;
  id: number;
  tags: string[];
}

export const NotesInput = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>(['home', 'work', 'school']);
  const [newTag, setNewTag] = useState<string>('');
  const [editingTag, setEditingTag] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return null;

    const addNewNote: Note = {
      title: newNote.trim(),
      id: Date.now() + Math.floor(Math.random() * 1000),
      tags: newTag ? [newTag] : ['home'],
    };

    setNotes([...notes, addNewNote]);
    setTags([...tags, newTag]);
    setNewNote('');
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (id: number, title: string) => {
    setEditingId(id);
    setEditingNote(title);
  };

  const handleSaveNote = () => {
    if (editingId !== null && editingNote.trim() && editingTag !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: editingNote,
                tags: editingTag ? [editingTag] : note.tags,
              }
            : note
        )
      );
    }
    setEditingId(null);
  };

  return (
    <div>
      <h1 className="text-5xl pb-4"> Add Notes </h1>
      <div className="flex flex-col gap-4 mb-16">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border border-gray-300 rounded-md"
        />

        <button
          className="bg-gray-200 text-gray-900 p-2 rounded-md"
          onClick={handleAddNote}
        >
          Add Note
        </button>

        <select
          value={newTag}
          name=""
          id=""
          onChange={(e) => setNewTag(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          {tags.map((tag) => (
            <option value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div>
        {notes.map((note) => (
          <div>
            {editingId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editingNote}
                  onChange={(e) => setEditingNote(e.target.value)}
                />
                <select
                  value={editingTag}
                  name=""
                  id=""
                  onChange={(e) => setEditingTag(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  {tags.map((tag) => (
                    <option value={tag}>{tag}</option>
                  ))}
                </select>
                <button onClick={handleSaveNote}>Save</button>
              </div>
            ) : (
              <div>
                <div key={note.id} className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{note.title}</h2>
                  <span className="">
                    {note.tags.map((tag) => (
                      <div className="bg-blue-200 text-gray-900 px-3  rounded-full text-center">
                        {tag}
                      </div>
                    ))}
                  </span>
                  <button
                    className="bg-red-700 text-white p-2 rounded-md"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-700 text-white p-2 rounded-md"
                    onClick={() => handleEditNote(note.id, note.title)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
