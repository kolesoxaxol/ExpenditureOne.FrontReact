import React from "react";
import "./../../css/expenditure.css";
import { Button } from "react-bootstrap";

function Expenditure(props) {
  function editExpenditureHandler(id, editPopupShow) {
    var currentExpenditure = props.expendituries.find((x) => x.id === id);
    props.setCurrentExpenditure(currentExpenditure);
    props.setEditPopupShow(editPopupShow);
  }

  function removeExpenditureHandler(id, removePopupShow) {
    var currentExpenditure = props.expendituries.find((x) => x.id === id);
    props.setCurrentExpenditure(currentExpenditure);
    props.setRemovePopupShow(removePopupShow);
  }

  function dateFormat(dateString) {
    if (!dateString) return;
  
    let date = new Date(dateString);
    return date.toLocaleDateString()
  }

  var maxLength = 20;
  var description = props.expenditure?.description;
  if (description && description.length > maxLength) {
    description = description.substring(0, maxLength);
  }

  return (
    <div className={"expenditure"}>
      <div>Title: {props.expenditure?.title}</div>
      <div>Description: {description}</div>
      <div>Date: {dateFormat(props.expenditure?.dateOfExpenditure)}</div>
      <div>Id: {props.expenditure.id}</div>
      {/* <div>
        <span>Color:</span> <span>{props.expenditure.color} </span>
        <span className="color" style={{ backgroundColor: props.expenditure.color }}></span>
      </div> */}
      <Button
        variant="warning"
        onClick={() => editExpenditureHandler(props.expenditure.id, true)}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => removeExpenditureHandler(props.expenditure.id, true)}
      >
        Remove
      </Button>
    </div>
  );
}

export default Expenditure;
