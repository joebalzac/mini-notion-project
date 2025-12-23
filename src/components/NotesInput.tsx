import { useState } from 'react';
import { SearchBar } from './SearchBar';

interface Note {
  title: string;
  content: string;
  id: number;
  tags: string[];
}

export const NotesInput = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [newContent, setNewContent] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [editingNote, setEditingNote] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>(['home', 'work', 'school']);
  const [newTag, setNewTag] = useState<string>('');
  const [editingTag, setEditingTag] = useState('');
  const [search, setSearch] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return null;

    const addNewNote: Note = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title: newNote.trim(),
      content: newContent.trim(),
      tags: newTag ? [newTag] : ['home'],
    };

    setNotes([...notes, addNewNote]);
    setTags([...tags, newTag]);
    setNewContent('');
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
    if (
      editingId !== null &&
      editingNote.trim() &&
      editingTag !== null &&
      editingContent !== null
    ) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: editingNote,
                content: editingContent,
                tags: editingTag ? [editingTag] : note.tags,
              }
            : note
        )
      );
    }
    setEditingId(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      search.toLowerCase() === ''
  );

  return (
    <div>
      <h1 className="text-5xl pb-4"> Add Notes </h1>
      <SearchBar search={search} setSearch={setSearch} />
      <div className="flex flex-col gap-4 mb-16">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border border-gray-300 rounded-md"
        />
        <textarea
          name=""
          id=""
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        ></textarea>

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
        {filteredNotes.map((note) => (
          <div>
            {editingId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editingNote}
                  onChange={(e) => setEditingNote(e.target.value)}
                />
                <textarea
                  name=""
                  id=""
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                ></textarea>
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
                  <textarea name="" id="">
                    {note.content}
                  </textarea>
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
