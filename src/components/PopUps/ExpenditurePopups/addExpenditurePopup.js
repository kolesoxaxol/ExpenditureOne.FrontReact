import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddPopUp(props) {
  const [expenditureTitle, setExpenditureTitle] = useState("");
  const [expenditureDescription, setExpenditureDescription] = useState("");
  const [date, setDate] = useState(new Date());

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

      fetch(`https://localhost:44352/api/Expenditure`, requestOptions)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          props.setExpendituries([
            ...props.expendituries,
            {
              title: expenditureTitle,
              description: expenditureDescription,
              dateOfExpenditure: date,
              id: data.data.id,
            },
          ]);
        })
        .then(props.setAddPopupShow(false));
    }
  };

  function onHide() {
    props.setAddPopupShow(false);
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
