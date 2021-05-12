import React, { Component } from "react";
import "./InputField.css";
export class InputField extends Component {
  state = {
    input: "",
  };
  inputOnChange = (e)=> {
      this.setState({input:e.target.value})
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
            this.props.onChange(this.props.field, this.state.input)
          }}
        />
        <label>{this.props.label}</label>
      </div>
    );
  }
}

export default InputField;
