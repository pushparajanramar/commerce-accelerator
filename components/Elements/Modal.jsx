"use client";
import React, { createRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({
  onClose,
  children,
  title,
  backText,
  middleText,
  classname,
  subtitle,
}) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalRef = createRef();

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'ul, li , a[href], button'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

      console.log(focusableModalElements, lastElement)

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([[27, onClose], [9, handleTabKey]]);
  const modalContent = (
    <div className={`modal-overlay ${classname}`} onClick={handleCloseClick}>
      <div
        className="modal-wrapper"
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={modalRef}
      >
        <div className="modal" >
          <div className="modal-header">
            <div className="first">
              <span className="back">{"<"}</span>
              <span className="back-text">{backText}</span>
              {subtitle && <p className="p-md">{title}</p>}
            </div>
            <div className="middle">{middleText}</div>
            <div className="last">
              <button onClick={handleCloseClick} aria-label="Close"></button>
            </div>
          </div>
          {title && !subtitle && <h1>{title}</h1>}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root")
  );
};

export default Modal;
