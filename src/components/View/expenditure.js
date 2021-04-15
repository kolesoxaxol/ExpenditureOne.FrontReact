import React from "react";
import "./../../css/expenditure.css";
import { Button } from "react-bootstrap";

function Expenditure(props) {
  function editExpenditureHandler(id, editPopupShow) {
    var currentExpenditure = props.expendituries.find((x) => x.id === id);
    props.setCurrentCaregory(currentExpenditure);
    props.setEditPopupShow(editPopupShow);
  }

  function removeExpenditureHandler(id, removePopupShow) {
    var currentExpenditure = props.expendituries.find((x) => x.id === id);
    props.setCurrentCaregory(currentExpenditure);
    props.setRemovePopupShow(removePopupShow);
  }

  return (
    <div className="expenditure" key={props.expenditure.id}>
      <div>Expenditure: {props.expenditure?.expenditureName}</div>
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
