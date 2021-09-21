import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import React from "react";

function Input(props) {
  return (
    <>
      <FormGroup controlId="formControlsSelect">
        <FormLabel>{props.label}</FormLabel>
        <FormControl
          as={props.type}
          onChange={props.onChange}
          value={props.value}
        >
          <option key="0" value="">
            {props.customPlaceHolder}
          </option>
          {props.optionsList.map((option) => (
            <option key={option.key} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </FormControl>
      </FormGroup>
    </>
  );
}

export default Input;
