import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext'

const NoteItem = (props) => {
    const context = useContext(NoteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props;

    return (
        <div className='col-md-3'>
            <div className='card my-2'>
                <div className='card-body'>
                    <div className='d-flex align-item-center justify-content-between'>
                        <h5 className='card-title'>{note.title}</h5>
                        <div>
                            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>updateNote(note)} ></i>
                            <i className="fa-regular fa-trash-can mx-2" onClick={() => deleteNote(note._id)}></i>
                        </div>
                    </div>
                    <p className='card-descripion'>{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;