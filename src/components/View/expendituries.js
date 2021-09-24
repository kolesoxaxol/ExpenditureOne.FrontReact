import React, { useState, useEffect } from "react";
import EditPopUp from "../PopUps/ExpenditurePopups/editExpenditurePopup";
import AddPopUp from "../PopUps/ExpenditurePopups/addExpenditurePopup";
import Expenditure from "./expenditure";
import RemovePopUp from "../PopUps/ExpenditurePopups/removeExpenditurePopup";
import "./../../css/expenditure.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Input from "../ui/Input/Input";
import * as categoryActions from "./../../store/actions/categoryActions";
import * as expenditureActions from "./../../store/actions/expenditureActions";
import { useDispatch, useSelector } from "react-redux";

function Expendituries() {
  const [expendituries, setExpendituries] = useState([]);
  const [filteredExpendituries, setFilteredExpendituries] = useState([]);
  const [currentExpenditure, setCurrentExpenditure] = useState();
  const [editPopupShow, setEditPopupShow] = useState(false);
  const [removePopupShow, setRemovePopupShow] = useState(false);
  const [addPopupShow, setAddPopupShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.getCategoriesOptions());
    //  dispatch(expenditureActions.getExpenditures());

    fetch(`https://localhost:44352/api/Expenditure`)
      .then((response) => response.json())
      .then((json) => {
        setExpendituries(json.data);
        setFilteredExpendituries(json.data);
      });
  }, []);

  const categoriesOptions = useSelector((state) => state.categories.options);
  // const expenditures = useSelector((state) => state.expenditures.items);
  // setExpendituries(expenditures);
  // setFilteredExpendituries(expenditures);

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

  return (
    <>
      <Container>
        <h1>Expenditures</h1>
        <div>
          <Input
            type="select"
            value={selectedCategory}
            onChange={onHandleSelectedCategory}
            label="Filter"
            customPlaceHolder="Select Category"
            optionsList={categoriesOptions}
          />
        </div>
        <div>
          <Button variant="success" onClick={() => addExpenditureHandler(true)}>
            Add
          </Button>
        </div>
        <div className="Expenditures">
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
