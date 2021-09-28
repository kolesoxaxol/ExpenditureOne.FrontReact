import React from "react";
import "./../../css/expenditure.css";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as expenditureActions from "../../store/actions/expenditureActions";

function Expenditure(props) {
  const dispatch = useDispatch();

  function editExpenditureHandler(id) {
    var currentExpenditure = props.expenditures.find((x) => x.id === id);
    dispatch(expenditureActions.setCurrentExpenditure(currentExpenditure));
    dispatch(expenditureActions.toggleEditPopup());
  }

  function removeExpenditureHandler(id) {
    var currentExpenditure = props.expenditures.find((x) => x.id === id);
    dispatch(expenditureActions.setCurrentExpenditure(currentExpenditure));
    dispatch(expenditureActions.toggleRemovePopup());
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
      <div>Categories: {props.expenditure.categories?.map(x => x.categoryName).join(",")}</div>
      <Button
        variant="warning"
        onClick={() => editExpenditureHandler(props.expenditure.id)}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => removeExpenditureHandler(props.expenditure.id)}
      >
        Remove
      </Button>
    </div>
  );
}

export default Expenditure;
