import { React, useState,useEffect } from 'react';
import './Modal.css';

export const Modal = ({ show, closeHandler,onSubmit, info , disabled_field, handleShowSchedule}) => {
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

        transform: show ? "translateY(0vh) translate(-50%,-50%)" : 'translateY(-100vh)',
        
        opacity: show ? '1' : '0'
      }}
    >
      <div className="modal-header">
        <p>Editing</p>
        <i onClick={closeHandler} class="far fa-window-close fa-3x"></i>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          
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
          {handleShowSchedule ? <button onClick={handleShowSchedule} className="btn-cancel">Show Schedule</button> : ""}
          <button onClick={closeHandler} className="btn-cancel">Close</button>
          <button onClick={()=> {onSubmit(update_info)}} className="btn-cancel">Update</button>
        </div>
      </div>
    </div>
  )
};
export default Modal