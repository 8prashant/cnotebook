import React, { useContext, useState } from 'react'
import noteContext from '../contexts/notes/notesContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    //context Api
    const context = useContext(noteContext);
    const { fetchNotes,setWarning } = context;
    //Form data
    const [form, setForm] = useState({ mail: "", password: "" });
    const onchange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };
    const login = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        if (data.success === "true") {
            setWarning("You have successfully logged in.","success");
            localStorage.setItem('token', data.authToken);
            await fetchNotes();
            navigate("/");
        }
        else {
            setWarning(`${data.error}`,"danger");
        }
    };
    //Function Handaling the form
    const handelSubmit = (event) => {
        event.preventDefault();
        login();
    };
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="mail">Email address</label>
                    <input type="email" className="form-control" id="mail" name='mail' onChange={onchange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Submit</button>
            </form>
        </div>
    )
}
