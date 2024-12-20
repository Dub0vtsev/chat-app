import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {

    return (
        <>
            {isOpen && (
                <div className={"modal"}>
                    <div className="modal-wrapper">
                        <div className="modal-content">
                            <button
                                className="modal-close-button"
                                onClick={() => onClose()}
                            >
                                X
                            </button>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;