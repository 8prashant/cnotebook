import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import noteContext from '../contexts/notes/notesContext';

export default function Navbar() {
  const location = useLocation();
  const context=useContext(noteContext);
  const{setWarning}=context;
  
  useEffect(() => {
    //console.log(location.pathname)
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "black" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">cNoteBook</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token')?<form className="form-inline my-2 my-lg-0" role="search">
              <Link className="btn btn-outline-success my-2 my-sm-0 mx-2" to="/login">Login</Link>
              <Link className="btn btn-outline-success my-2 my-sm-0 mx-2" to="/signup">Signup</Link>
            </form>:<Link className="btn btn-outline-success my-2 my-sm-0 mx-2" onClick={()=>{setWarning("You have successfully logged out!","success");localStorage.removeItem('token')}}>LogOut</Link>}
          </div>
        </div>
      </nav>
    </>
  );
}
