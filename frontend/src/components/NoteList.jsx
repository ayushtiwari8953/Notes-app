import React from 'react'

export default function NoteList({ notes = [], onEdit, onDelete }) {
  if (!notes.length) return <p className="text-sm text-slate-500">No notes yet.</p>

  return (
    <div className="space-y-3">
      {notes.map(note => (
        <article key={note._id} className="p-4 bg-white rounded shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{note.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{note.body?.slice(0, 200)}</p>
              <div className="mt-2 text-xs text-slate-500">
                {note.tags && note.tags.map(t => (
                  <span key={t} className="mr-1">#{t}</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(note)} className="text-sm px-2 py-1 border rounded">Edit</button>
              <button onClick={() => onDelete(note._id)} className="text-sm px-2 py-1 border rounded">Delete</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
