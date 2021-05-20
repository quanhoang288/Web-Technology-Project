import { React, useState,useEffect } from 'react';


export const CourseDetailModal = (props) => {
  
  return (
    <div className="modal-wrapper"
      style={{
        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      <div className="modal-header">
        <p>Pending status</p>
        <span onClick={props.closeHandler} className="close-modal-btn">x</span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          {props.children}
    </div>
        <div className="modal-footer">
          <button onClick={props.leftButtonHandler} className="btn-cancel">{props.leftlabel}</button>
          <button onClick={props.rightButtonHandler} className="btn-cancel">{props.rightlabel}</button>
        </div>
      </div>
    </div>
  )
};
export default CourseDetailModal