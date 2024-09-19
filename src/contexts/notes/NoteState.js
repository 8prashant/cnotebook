import React, { useState, useEffect } from "react";
import noteContext from "./notesContext";

const host = "http://localhost:5000/api";
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [alert, setalert] = useState(null);
  const setWarning = (msg,type) => {
    setalert({msg,type});
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };

  //Fetch all Notes
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${host}/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            `${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setNotes(data);
      //console.log(data);
      // setWarning("All Notes Have been Fetched successfully.","success");
    } catch (error) {
      throw new Error(`HTTP error! status`);
    }

  };
  useEffect(() => {
    fetchNotes();
  }, []);

  //Add a Note
  const addNote = async (newNote) => {
    //console.log("state");
    const { title, description, tag } = newNote;
    const response = await fetch(`${host}/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const data = await response.json();
    setNotes(notes.concat(data));
    setWarning("A New Note has been created successfully.","info");
    //console.log(data);
  };

  //Delelte a Note
  const deleteNote=async(id)=>{
    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('token')}`,
      }
    });

    // const data = await response.json();
    // console.log("DeletedNote");
    const newNote=notes.filter((note)=>(note._id!==id));
    setNotes(newNote);
    setWarning("A Note has been deleted successfully.","success");
  }

  //Update a note
  const updateNote=async(newNote,id)=>{
    const { title, description, tag } = newNote;
    // console.log(newNote);
    // console.log(id);
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          `${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // const data = await response.json();
    // console.log("Updated");
    fetchNotes();
    setWarning("A Note has been updated successfully.","info");
  }

  return (
    <noteContext.Provider value={{ notes,fetchNotes, addNote,deleteNote,updateNote,alert,setWarning }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
