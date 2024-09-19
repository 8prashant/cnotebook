import React,{useContext, useState} from "react";
import notesContext from "../contexts/notes/notesContext";

function AddNotes() {
    const [form, setForm] = useState({title:"",description:"",tag:""})
    const change=(event)=>{
        setForm({...form,[event.target.name]:event.target.value});
    };
    const context=useContext(notesContext);
    const{addNote}=context;
    const handelSubmit=(event)=>{
        event.preventDefault();
        addNote(form);
    };
  return (
    <div>
      <h1 className="my-2">Add a Note.</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={change}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea type="text" className="form-control" id="description" name="description" onChange={change}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange={change}/>
        </div>
        <button className="btn btn-primary" onClick={handelSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default AddNotes;
