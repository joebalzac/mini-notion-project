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

  const handleAddNote = () => {
    if (!newNote.trim()) return null;

    const addNewNote: Note = {
      title: newNote.trim(),
      id: Date.now() + Math.floor(Math.random() * 1000),
      tags: newTag ? [newTag] : [...tags],
    };

    setNotes([...notes, addNewNote]);
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
    if (editingId !== null && editingNote.trim()) {
      setNotes(
        notes.map((note) =>
          note.id === editingId ? { ...note, title: editingNote } : note
        )
      );
    }
    setEditingId(null);
  };

  return (
    <div>
      Mini Notion Project
      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />

        <select
          value={newTag}
          name=""
          id=""
          onChange={(e) => setNewTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option value={tag}>{tag}</option>
          ))}
        </select>
        <button onClick={handleAddNote}>Add Note</button>
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
                <button onClick={handleSaveNote}>Save</button>
              </div>
            ) : (
              <div>
                <div key={note.id}>
                  <h2>{note.title}</h2>
                  <h3>
                    {note.tags.map((tag) => (
                      <div>{tag}</div>
                    ))}
                  </h3>
                  <button onClick={() => handleDeleteNote(note.id)}>
                    Delete
                  </button>
                  <button onClick={() => handleEditNote(note.id, note.title)}>
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
