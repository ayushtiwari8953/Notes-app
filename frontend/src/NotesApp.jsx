import React, { useEffect, useState } from 'react'
import { fetchNotes, createNote, updateNote, deleteNote } from './api'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'

export default function NotesApp({ onLogout, user }) {
  const [notes, setNotes] = useState([])
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState(null)

  const load = async () => {
    const data = await fetchNotes({ q: query })
    setNotes(data)
  }

  useEffect(() => { load() }, [query])

  const handleCreate = async (note) => {
    const created = await createNote(note)
    setNotes(prev => [created, ...prev])
  }

  const handleUpdate = async (id, note) => {
    const updated = await updateNote(id, note)
    setNotes(prev => prev.map(n => n._id === id ? updated : n))
    setEditing(null)
  }

  const handleDelete = async (id) => {
    await deleteNote(id)
    setNotes(prev => prev.filter(n => n._id !== id))
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Notes App</h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-slate-600">Hello, {user?.name}</div>
            <button onClick={onLogout} className="px-3 py-1 border rounded">Logout</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full mb-4 border px-3 py-2 rounded"
            />
            <NoteList notes={notes} onEdit={(n) => setEditing(n)} onDelete={handleDelete} />
          </div>
          <div>
            <NoteEditor
              key={editing ? editing._id : 'new'}
              note={editing}
              onCreate={handleCreate}
              onUpdate={handleUpdate}
              onCancel={() => setEditing(null)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
