import React, { useState, useEffect } from "react";
import EditPopUp from "../PopUps/ExpenditurePopups/editExpenditurePopup";
import AddPopUp from "../PopUps/ExpenditurePopups/addExpenditurePopup";
import Expenditure from "./expenditure";
import RemovePopUp from "../PopUps/ExpenditurePopups/removeExpenditurePopup";
import "./../../css/expenditure.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Input from "../ui/Input/Input";
import * as categoryActions from "../../store/actions/categoryActions";
import * as expenditureActions from "../../store/actions/expenditureActions";
import { useDispatch, useSelector } from "react-redux";

function Expenditures() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const categoriesOptions = useSelector((state) => state.categories.options);
  const expenditures = useSelector((state) => state.expenditures.items);
  const filteredExpenditures = useSelector(
    (state) => state.expenditures.filteredItems
  );
  const currentExpenditure = useSelector(
    (state) => state.expenditures.currentItem
  );
  const editPopupShow = useSelector(
    (state) => state.expenditures.isShowEditPopup
  );
  const removePopupShow = useSelector(
    (state) => state.expenditures.isShowRemovePopup
  );

  const addPopupShow = useSelector(
    (state) => state.expenditures.isShowAddPopup
  );

  useEffect(() => {
    dispatch(categoryActions.getCategoriesOptions());
    dispatch(expenditureActions.getExpenditures());
  }, []);

  function onHandleSelectedCategory(event) {
    var currentValue = event.currentTarget.value;
    setSelectedCategory(currentValue);

    if (!currentValue) {
      dispatch(expenditureActions.filterExpenditures(expenditures));
    } else {
      let filteredExpenditures = expenditures.filter((x) =>
        x.categories.some((z) => z.id.toString() === event.currentTarget.value)
      );
      dispatch(expenditureActions.filterExpenditures(filteredExpenditures));
    }
  }

  function addExpenditureHandler() {
    dispatch(expenditureActions.toggleAddPopup());
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
          <Button variant="success" onClick={() => addExpenditureHandler()}>
            Add
          </Button>
        </div>
        <div className="Expenditures">
          {filteredExpenditures.map((item) => {
            return (
              <Expenditure
                key={item.id}
                expenditure={item}
                expenditures={expenditures}
                editPopupShow={editPopupShow}
                removePopupShow={removePopupShow}
              />
            );
          })}
        </div>
        <EditPopUp
            expenditure={currentExpenditure}
            editPopupShow={editPopupShow}
          />
        <AddPopUp
          addPopupShow={addPopupShow}
          expenditures={expenditures}
        />
        <RemovePopUp
          removePopupShow={removePopupShow}
          expenditure={currentExpenditure}
        />
      </Container>
    </>
  );
}

export default Expenditures;
