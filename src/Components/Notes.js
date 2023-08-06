import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {

  const context = useContext(NoteContext)
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    } else {
      navigate('/login')
    }
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: '' })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }
  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note: -</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor='etitle' className="form-label">
                    Title: -
                  </label>
                  <input className="form-control" type='etitle' id='etitle' name='etitle' value={note.etitle} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor='edescription' className="form-label">
                    Description: -
                  </label>
                  <textarea className="form-control" rows="3" id='edescription' name='edescription' value={note.edescription} onChange={onchange} minLength={5} required ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor='etag' className="form-label">
                    Tag: -
                  </label>
                  <input type='text' className="form-control" id='etag' name='etag' value={note.etag} onChange={onchange} minLength={5} required ></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-outline-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your notes: -</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes;