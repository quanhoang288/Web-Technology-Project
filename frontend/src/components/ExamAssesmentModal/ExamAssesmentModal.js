import { React, useState,useEffect } from 'react';


export const ExamAssesmentModal = (props) => {
  
  return (
    <div className="modal-wrapper"
      style={{
        transform: props.show ? 'translateY(0vh) translate(-50%,-50%)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      <div className="modal-header">
        <p>{props.title ? props.title : "Assesment"}</p>
        <span onClick={props.closeHandler} className="close-modal-btn">x</span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          {props.children}
    </div>
        <div className="modal-footer">
          <button onClick={props.updateHandler} className="btn-cancel">Update</button>
          <button onClick={props.closeHandler} className="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  )
};
export default ExamAssesmentModal