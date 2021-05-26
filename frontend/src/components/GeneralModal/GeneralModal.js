import { React} from 'react';


export const GeneralModal = (props) => {
  
  return (
    <div className="modal-wrapper"
      style={{
        transform: props.show ? 'translateY(0vh) translate(-50%,-50%)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      <div className="modal-header">
        <p>{props.title}</p>
        <span onClick={props.closeHandler} className="close-modal-btn">x</span>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          {props.children}
    </div>
       
      </div>
    </div>
  )
};
export default GeneralModal