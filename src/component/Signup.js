import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/notesContext';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();
  //context Api
  const context = useContext(noteContext);
  const { setWarning } = context;
  //Form data
  const [form, setForm] = useState({name:"", mail: "", password: "" });
  const onchange = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
  };

  const signup = async () => {
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.success === "true") {
        setWarning("You have successfully registered and logged in.","success");
        localStorage.setItem('token', data.authToken);
        navigate("/");
    }
    else {
        setWarning(`${data.error}`,"danger");
    }
    console.log(data);
};
  //Function Handaling the form
  const handelSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    signup();
};
  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onchange}  />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Mail Id:</label>
          <input type="text" className="form-control" id="mail" name='mail' onChange={onchange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="text" className="form-control" id="password" name='password' onChange={onchange}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Submit</button>
      </form>
    </div>
  )
}
