import React, { useState,useEffect, useContext, useRef } from "react";
import notesContext from "../contexts/notes/notesContext";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";

export default function Notes() {
  const [form, setForm] = useState({ title: "", description: "", tag: "" });
  const [id, setId] = useState("dzf");
  const change = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const context = useContext(notesContext);
  const { notes } = context;
  const btnref = useRef(null);
  const updateNote = () => {
    btnref.current.click();
  };

  const updateButtonClicked = () => {
    context.updateNote(form, id);
    btnref.current.click();
  };

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  return (
    <>
      <AddNotes />

      {/* Button trigger modal */}
      <button ref={btnref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" name="title" onChange={change} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="description" name="description" onChange={change} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="tag" name="tag" onChange={change} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={updateButtonClicked}>Save changes</button>
            </div>
          </div>
        </div>
      </div>



      <h2>Your Notes.</h2>
      <div className="row my-2">
        {notes.map((element) => (
          <div className="col-md-4 my-2" key={element._id}>
            <Noteitem note={element} updateNote={updateNote} setId={setId} />
          </div>
        ))}
      </div>
    </>
  );
}
