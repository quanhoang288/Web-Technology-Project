import { React } from "react";
import './PopUp.css'
export const PopUp = ({ show, msg, closeHandler , redirect}) => {
  
  return (
    <div
      className="popup-wrapper"
      style={{
        transform: show ? "translateY(0vh) translate(-50%,-50%)" : "translateY(-100vh)",
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
        <div className="popup-body">
          {msg.msg}
        </div>
        
      </div>
      <div className="popup-footer">
      {
          [200,201,303].includes(msg.code) ? <button onClick={redirect} >Ok</button> : null
      }
      </div>
    </div>
  );
};
export default PopUp;
