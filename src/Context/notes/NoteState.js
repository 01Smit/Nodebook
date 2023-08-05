import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {

  const host = 'http://localhost:5000';

  const [notes, setNotes] = useState([]);

  // Fetch all notes --> working perfectly.
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNDgyZjhjNGJmZjljOTBkZTY5ZDczIn0sImlhdCI6MTY4ODUwNDQzOX0.gPdYbS7cByRNp4qDtO2fhDWYFcoh1c_S6nogsEGJB34',
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  // Add a note --> working perfectly.
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNDgyZjhjNGJmZjljOTBkZTY5ZDczIn0sImlhdCI6MTY4ODUwNDQzOX0.gPdYbS7cByRNp4qDtO2fhDWYFcoh1c_S6nogsEGJB34",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  }


  // Delete a note --> working perfectly
  const deleteNote = async (id) => {
    // Todo: API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNDgyZjhjNGJmZjljOTBkZTY5ZDczIn0sImlhdCI6MTY4ODUwNDQzOX0.gPdYbS7cByRNp4qDtO2fhDWYFcoh1c_S6nogsEGJB34',
      },
    });
    const json = await response.json();
    console.log(json)
    // Logic to delete note
    // const newNotes = notes.filter((note) => { return note._id !== id })
    
    getNotes()
  }


  // Edit a note --> pending
  const editNote = async (id, title, descripion, tag) => {
    // Todo: API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRhNDgyZjhjNGJmZjljOTBkZTY5ZDczIn0sImlhdCI6MTY4ODUwNDQzOX0.gPdYbS7cByRNp4qDtO2fhDWYFcoh1c_S6nogsEGJB34",
      },
      body: JSON.stringify({ title, descripion, tag }),
    });
    const json = await response.json();
    console.log(json)

    // Logic to edit the note
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = descripion;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
    // getNotes()
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;