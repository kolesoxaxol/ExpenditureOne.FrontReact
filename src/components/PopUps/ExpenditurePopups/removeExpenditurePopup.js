import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import * as expenditureActions from "../../../store/actions/expenditureActions";

function RemovePopUp(props) {
  const dispatch = useDispatch();

  function RemoveExpenditure() {
    const expenditure = props.expenditure;

    if (expenditure.id) {
      const requestOptions = { method: "DELETE" };
      dispatch(
        expenditureActions.removeExpenditure(expenditure.id, requestOptions)
      );
    }
  }

  function onHide() {
    dispatch(expenditureActions.toggleRemovePopup());
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
