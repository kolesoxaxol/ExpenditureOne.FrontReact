import React, { useState, useEffect } from "react";
import EditPopUp from "../PopUps/editPopup";
import AddPopUp from "../PopUps/addPopup";
import Category from "./category";
import RemovePopUp from "../PopUps/removePopup";
import "./../../css/category.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [currentCaregory, setCurrentCaregory] = useState();
  const [editPopupShow, setEditPopupShow] = useState(false);
  const [removePopupShow, setRemovePopupShow] = useState(false);
  const [addPopupShow, setAddPopupShow] = useState(false);

  useEffect(() => {
    fetch(`http://expenditure.uteam-dev.com/api/Category`)
      .then((response) => response.json())
      .then((json) => setCategories(json.data));
  }, []);

  function addCategoryHandler(addPopupShow) {
    setAddPopupShow(addPopupShow);
  }

  return (
    <>
      <Container>
        <h1>Categories</h1>
        <div>
          <Button variant="success" onClick={() => addCategoryHandler(true)}>
            Add
          </Button>
        </div>
        <div className="Categories">
          {categories.map((item) => {
            return (
              <Category
                key={item.Id}
                category={item}
                categories={categories}
                setCurrentCaregory={setCurrentCaregory}
                editPopupShow={editPopupShow}
                setEditPopupShow={setEditPopupShow}
                removePopupShow={removePopupShow}
                setRemovePopupShow={setRemovePopupShow}
              />
            );
          })}
          <EditPopUp
            category={currentCaregory}
            setCurrentCaregory={setCurrentCaregory}
            editPopupShow={editPopupShow}
            setEditPopupShow={setEditPopupShow}
            setCategories={setCategories}
            categories={categories}
          />
        </div>
        <AddPopUp
          addPopupShow={addPopupShow}
          setAddPopupShow={setAddPopupShow}
          setCategories={setCategories}
          categories={categories}
        />
        <RemovePopUp
          removePopupShow={removePopupShow}
          setRemovePopupShow={setRemovePopupShow}
          category={currentCaregory}
          setCategories={setCategories}
          categories={categories}
        />
      </Container>
    </>
  );
}

export default Categories;
