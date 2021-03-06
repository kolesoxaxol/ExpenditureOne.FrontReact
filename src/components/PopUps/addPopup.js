import Button from "react-bootstrap/Button";
import Modal  from "react-bootstrap/Modal";
import React, { useState } from "react";

function AddPopUp(props) {
  const [color, setColor] = useState();
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(categoryName !== '' && color !== ''){
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({categoryName: categoryName, color: color}),
          };
      
          fetch(
            `http://expenditure.uteam-dev.com/api/Category`, requestOptions
          )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .then(props.setAddPopupShow(false))
            .then(() => props.setCategories([...props.categories, {categoryName, color}]));
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
            Add New Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label>
              Category Name:
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </label>
            <label>
              Color:
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddPopUp;
