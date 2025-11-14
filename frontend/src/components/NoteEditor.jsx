import React, { useEffect, useState } from 'react'

export default function NoteEditor({ note, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState(note?.title || '')
  const [body, setBody] = useState(note?.body || '')
  const [tags, setTags] = useState((note?.tags || []).join(', '))

  useEffect(() => {
    setTitle(note?.title || '')
    setBody(note?.body || '')
    setTags((note?.tags || []).join(', '))
  }, [note])

  const submit = async (e) => {
    e.preventDefault()
    const payload = { title, body, tags: tags.split(',').map(t => t.trim()).filter(Boolean) }
    if (note && note._id) await onUpdate(note._id, payload)
    else await onCreate(payload)
    setTitle(''); setBody(''); setTags('')
  }

  return (
    <form onSubmit={submit} className="p-4 bg-white rounded shadow">
      <h2 className="font-semibold mb-2">{note ? 'Edit Note' : 'New Note'}</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required className="w-full mb-2 border px-2 py-1 rounded" />
      <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Body" rows={6} className="w-full mb-2 border px-2 py-1 rounded" />
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags, comma, separated" className="w-full mb-3 border px-2 py-1 rounded" />
      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded" type="submit">{note ? 'Update' : 'Create'}</button>
        {note && <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>}
      </div>
    </form>
  )
}
