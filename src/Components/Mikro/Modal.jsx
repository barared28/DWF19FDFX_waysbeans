import React from "react";

function Modal({ children, show, setShow, custom = null }) {
  const close = () => {
    setShow(false);
    custom !== null && custom();
  };
  return (
    <div className={`modal ${show ? "" : "none"}`}>
      <div className="modal-content">
        <span className="close close-container align-center" onClick={close}>
          &times;
        </span>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
