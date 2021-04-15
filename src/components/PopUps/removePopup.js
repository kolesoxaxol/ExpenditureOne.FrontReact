import { Modal, Button } from "react-bootstrap";
import React from "react";

function RemovePopUp(props) {
  function RemoveCategory() {
    const category = props.category;
    
    if (category.id) {
      fetch(`http://expenditure.uteam-dev.com/api/Category/${category.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(props.setRemovePopupShow(false))
        .then(() => {
          const atIndex = props.categories.findIndex(cat => cat.id === category.id);
    
          props.setCategories([
            ...props.categories.slice(0, atIndex),
            ...props.categories.slice(atIndex + 1)
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
            Remove Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Are you sure you want to delete the category{" "}
            {props.category?.categoryName}?
          </div>
          <Button variant="success" onClick={() => RemoveCategory()}>
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
