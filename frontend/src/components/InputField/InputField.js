import React, { Component } from "react";
import "./InputField.css";
export class InputField extends Component {
  ref = React.createRef()
  inputOnChange = (e)=> {
      this.setState(prevState => {
        return({
          ...prevState,
          input:e.target.value
        })
      })
  }
  render() {
    
    return (
      <div className="field">
        <input
          type={this.props.type}
          required
          ref={this.ref}
          onChange={(e) => {
            
            this.inputOnChange(e)
            this.props.onChange(this.props.field, this.ref.current.value)
            
          }}
        />
        <label>{this.props.label}</label>
      </div>
    );
  }
}

export default InputField;
