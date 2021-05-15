import { React, useState,useEffect } from 'react';
import './Modal.css';
import axios from 'axios'
import { HOST_URL } from '../../config'
export const Modal = ({ show, closeHandler, info , disabled_field}) => {
  const [update_info, setInfo] = useState(info)
  const fieldOnChangeHandler = (field, e) => {
    const processed_info = {...update_info}
    processed_info[field] = e.target.value
    setInfo(processed_info)
  }
  useEffect(() => {
    
    setInfo(info)
  },[info]);
  return (
    <div className="modal-wrapper"
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0'
      }}
    >
      <div className="modal-header">
        <p>Editing</p>
        <span onClick={closeHandler} className="close-modal-btn">x</span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h4>Modal</h4>
          <form>
            {Object.keys(update_info).map((field, idx) => {
              return (
                <div className="field" key={idx}>
                  <input value={update_info[field]}
                    disabled = {disabled_field.indexOf(field) > -1 ? true :false}
                    onChange={(e) => {fieldOnChangeHandler(field, e)}}
                  ></input>
                  <label>{field}</label>
                </div>
              )
            })}
          </form>




        </div>
        <div className="modal-footer">
          <button onClick={closeHandler} className="btn-cancel">Close</button>
          <button onClick={onSubmit} className="btn-cancel">Update</button>
        </div>
      </div>
    </div>
  )
};
export default Modal