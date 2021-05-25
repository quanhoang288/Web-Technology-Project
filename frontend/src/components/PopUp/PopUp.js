import { React } from "react";
import './PopUp.css'
export const PopUp = ({ show, msg, closeHandler , redirect}) => {
  return (
    <div
      className="popup-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="popup-header">
        <p>Pop Up</p>
        <span onClick={closeHandler} className="close-modal-btn">
          x
        </span>
      </div>
      <div className="popup-content">
        <div className="popup-body">{msg === 201 ?  "Created" :"Error" }</div>
        
        
      </div>
      <div className="popup-footer">
      {
          msg === 201 ? <button onClick={redirect} >Ok</button> : null
      }
      </div>
    </div>
  );
};
export default PopUp;
