import React, { Component } from "react";
import "./InputField.css";
export class InputField extends Component {
  state = {
    input : this.props.value
  }
  
  
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
          
          value={this.state.input}
          onChange={(e) => {
            
            this.inputOnChange(e)
            this.props.onChange(this.props.field, e.target.value)
            
          }}
        />
        <label>{this.props.label}</label>
      </div>
    );
  }
}

export default InputField;
