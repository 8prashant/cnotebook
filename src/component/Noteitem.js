import React, { useContext } from "react";
import noteContext from "../contexts/notes/notesContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <div className="mr-auto p-2">
              <h5 className="card-title">{props.note.title}</h5>
            </div>
            <div className="ml-auto p-2">
              <i
                className="fa-solid fa-trash"
                onClick={() => {
                  deleteNote(props.note._id);
                }}
              ></i>
            </div>
            <div className="ml-auto p-2">
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => {
                  props.setId(props.note._id);
                  props.updateNote();
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{props.note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
