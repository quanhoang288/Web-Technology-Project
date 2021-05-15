import React, { Component } from "react";

export class CourseDetailModal extends Component {
  render() {
    return (
      <div
        className="modal-wrapper"
        style={{
          transform: show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <p>Editing</p>
          <span onClick={closeHandler} className="close-modal-btn">
            x
          </span>
        </div>
        <div className="modal-content">
          <div className="modal-body">
            {this.props.children}
          </div>
          <div className="modal-footer">
            <button onClick={closeHandler} className="btn-cancel">
              Close
            </button>
            <button onClick={closeHandler} className="btn-cancel">
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseDetailModal;
