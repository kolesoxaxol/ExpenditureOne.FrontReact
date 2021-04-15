import React from "react";
import "./../../css/category.css";
import { Button } from "react-bootstrap";

function Category(props) {
  function editCategoryHandler(id, editPopupShow) {
    var currentCategory = props.categories.find((x) => x.id === id);
    props.setCurrentCaregory(currentCategory);
    props.setEditPopupShow(editPopupShow);
  }

  function removeCategoryHandler(id, removePopupShow) {
    var currentCategory = props.categories.find((x) => x.id === id);
    props.setCurrentCaregory(currentCategory);
    props.setRemovePopupShow(removePopupShow);
  }

  return (
    <div className="category" key={props.category.id}>
      <div>Category: {props.category?.categoryName}</div>
      <div>Id: {props.category.id}</div>
      <div>
        <span>Color:</span> <span>{props.category.color} </span>
        <span className="color" style={{ backgroundColor: props.category.color }}></span>
      </div>
      <Button
        variant="warning"
        onClick={() => editCategoryHandler(props.category.id, true)}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={() => removeCategoryHandler(props.category.id, true)}
      >
        Remove
      </Button>
    </div>
  );
}

export default Category;
