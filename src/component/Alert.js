import React, { useContext } from "react";
import noteContext from "../contexts/notes/notesContext";

function Alert() {
  const context = useContext(noteContext);
  const { alert } = context;

  return (
    alert && (
      <div className="alert-container">
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{alert.msg}</strong>
        </div>
      </div>
    )
  );
}

export default Alert;
