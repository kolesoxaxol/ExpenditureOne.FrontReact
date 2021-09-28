import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import * as expenditureActions from "../../../store/actions/expenditureActions";

function AddPopUp(props) {
  const [expenditureTitle, setExpenditureTitle] = useState("");
  const [expenditureDescription, setExpenditureDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  const clearState = () => {
    setExpenditureTitle("");
    setExpenditureDescription("");
    setDate(new Date());
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (expenditureTitle !== "") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          title: expenditureTitle,
          description: expenditureDescription,
          dateOfExpenditure: date,
        }),
      };

      const newExpenditure = {
        title: expenditureTitle,
        description: expenditureDescription,
        date: date,
      };

      dispatch(
        expenditureActions.addExpenditure(newExpenditure, requestOptions)
      );
      clearState();
    }
  };

  function onHide() {
    dispatch(expenditureActions.toggleAddPopup());
  }

  return (
    <>
      <Modal
        size="lg"
        show={props.addPopupShow}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add New Expenditure
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={expenditureTitle}
                onChange={(e) => setExpenditureTitle(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={expenditureDescription}
                onChange={(e) => setExpenditureDescription(e.target.value)}
              />
            </label>
            <label>
              Date:
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </label>
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddPopUp;
