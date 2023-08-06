import React, { useContext, useState } from 'react';
import NoteContext from '../Context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const onchange = (e) => {
        console.log(e.target.value)
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note created successfully!", "success")
    }
    return (
        <div>
            <h2>Add Note: -</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label">
                        Title: -
                    </label>
                    <input className="form-control" type='title' id='title' name='title' value={note.title} onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor='description' className="form-label">
                        Description: -
                    </label>
                    <textarea
                        className="form-control" rows="3" id='description' name='description' value={note.description} onChange={onchange} minLength={5} required ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor='tag' className="form-label">
                        Tag: -
                    </label>
                    <input type='text' className="form-control" id='tag' name='tag' value={note.tag} onChange={onchange} minLength={5} required />
                </div>
                <button type="submit" disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} className="btn btn-outline-success" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;