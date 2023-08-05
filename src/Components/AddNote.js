import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext'

const AddNote = (props) => {
    const context = useContext(NoteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    return (
        <div>
            <h2>Add Note: -</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label">
                        Title: -
                    </label>
                    <input
                        className="form-control"
                        type='title'
                        id='title'
                        name='title'
                        onChange={onchange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor='description' className="form-label">
                        Description: -
                    </label>
                    <textarea
                        className="form-control"
                        rows="3"
                        id='description'
                        name='description'
                        onChange={onchange}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor='tag' className="form-label">
                        Tag: -
                    </label>
                    <input
                        type='text'
                        className="form-control"
                        id='tag'
                        name='tag'
                        onChange={onchange}
                    ></input>
                </div>
                <button type="submit" className="btn btn-outline-success" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote