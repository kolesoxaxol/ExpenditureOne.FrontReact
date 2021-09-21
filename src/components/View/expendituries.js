import React, { useState, useEffect } from "react";
import EditPopUp from "../PopUps/ExpenditurePopups/editExpenditurePopup";
import AddPopUp from "../PopUps/ExpenditurePopups/addExpenditurePopup";
import Expenditure from "./expenditure";
import RemovePopUp from "../PopUps/ExpenditurePopups/removeExpenditurePopup";
import "./../../css/expenditure.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Input from "../ui/Input/Input";

function Expendituries() {
  const [expendituries, setExpendituries] = useState([]);
  const [filteredExpendituries, setFilteredExpendituries] = useState([]);
  const [currentExpenditure, setCurrentExpenditure] = useState();
  const [editPopupShow, setEditPopupShow] = useState(false);
  const [removePopupShow, setRemovePopupShow] = useState(false);
  const [addPopupShow, setAddPopupShow] = useState(false);
  const [filterCategories, setFilterCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(`https://localhost:44352/api/Expenditure`)
      .then((response) => response.json())
      .then((json) => {
        setExpendituries(json.data);
        setFilteredExpendituries(json.data);
        getCategories(json.data);
      });
  }, []);

  function onHandleSelectedCategory(event) {
    var currentValue = event.currentTarget.value;
    setSelectedCategory(currentValue);

    if (!currentValue) {
      setFilteredExpendituries(expendituries);
    } else {
      let filteredExpendituries = expendituries.filter((x) =>
        x.categories.some((z) => z.id.toString() === event.currentTarget.value)
      );
      setFilteredExpendituries(filteredExpendituries);
    }
  }

  function addExpenditureHandler(addPopupShow) {
    setAddPopupShow(addPopupShow);
  }

  function getCategories(data) {
    const categories = [];
    data.forEach(function (expenditure) {
      expenditure.categories.forEach(function (category) {
        let isExist = categories.find(
          (x) => x.categoryName === category.categoryName
        );
        if (!isExist) {
          categories.push(category);
        }
      });
    });

    let options = [];
    categories.map((item, key) => (options.push({ value: item.id, displayValue: item.categoryName, key: key })));

    setFilterCategories(options);
  }

  return (
    <>
      <Container>
        <h1>Expendituries</h1>
        <div>
          <Input
            type="select"
            value={selectedCategory}
            onChange={onHandleSelectedCategory}
            label="Filter"
            customPlaceHolder="Select Category"
            optionsList={filterCategories}
          />
        </div>
        <div>
          <Button variant="success" onClick={() => addExpenditureHandler(true)}>
            Add
          </Button>
        </div>
        <div className="Expendituries">
          {filteredExpendituries.map((item) => {
            return (
              <Expenditure
                key={item.id}
                expenditure={item}
                expendituries={expendituries}
                setCurrentExpenditure={setCurrentExpenditure}
                editPopupShow={editPopupShow}
                setEditPopupShow={setEditPopupShow}
                removePopupShow={removePopupShow}
                setRemovePopupShow={setRemovePopupShow}
              />
            );
          })}
          <EditPopUp
            expenditure={currentExpenditure}
            setCurrentExpenditure={setCurrentExpenditure}
            editPopupShow={editPopupShow}
            setEditPopupShow={setEditPopupShow}
            setExpendituries={setExpendituries}
            expendituries={expendituries}
          />
        </div>
        <AddPopUp
          addPopupShow={addPopupShow}
          setAddPopupShow={setAddPopupShow}
          setExpendituries={setExpendituries}
          expendituries={expendituries}
        />
        <RemovePopUp
          removePopupShow={removePopupShow}
          setRemovePopupShow={setRemovePopupShow}
          expenditure={currentExpenditure}
          setExpendituries={setExpendituries}
          expendituries={expendituries}
        />
      </Container>
    </>
  );
}

export default Expendituries;
