import { Modal, Button } from "react-bootstrap";
import React from "react";

function RemovePopUp(props) {
  function RemoveExpenditure() {
    const expenditure = props.expenditure;
    
    if (expenditure.id) {
      fetch(`https://localhost:44352/api/Expenditure/${expenditure.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(props.setRemovePopupShow(false))
        .then(() => {
          const atIndex = props.expendituries.findIndex(cat => cat.id === expenditure.id);
    
          props.setExpendituries([
            ...props.expendituries.slice(0, atIndex),
            ...props.expendituries.slice(atIndex + 1)
          ]);
        });
    }
  }

  function onHide() {
    props.setRemovePopupShow(false);
  }

  return (
    <>
      <Modal
        size="lg"
        show={props.removePopupShow}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Remove Expenditure
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Are you sure you want to delete the expenditure{" "}
            {props.expenditure?.expenditureName}?
          </div>
          <Button variant="success" onClick={() => RemoveExpenditure()}>
            Apply
          </Button>
          <Button variant="secondary" onClick={() => onHide()}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RemovePopUp;
