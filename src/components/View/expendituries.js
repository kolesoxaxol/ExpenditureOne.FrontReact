import React, { useState, useEffect } from "react";
import EditPopUp from "../PopUps/editPopup";
import AddPopUp from "../PopUps/addPopup";
import Expenditure from "./expenditure";
import RemovePopUp from "../PopUps/removePopup";
import "./../../css/expenditure.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Expendituries() {
  const [expendituries, setExpendituries] = useState([]);
  const [currentExpenditure, setCurrentExpenditure] = useState();
  const [editPopupShow, setEditPopupShow] = useState(false);
  const [removePopupShow, setRemovePopupShow] = useState(false);
  const [addPopupShow, setAddPopupShow] = useState(false);

  useEffect(() => {
    fetch(`http://expenditure.uteam-dev.com/api/expenditure`)
      .then((response) => response.json())
      .then((json) => setExpendituries(json.data));
  }, []);

  function addExpenditureHandler(addPopupShow) {
    setAddPopupShow(addPopupShow);
  }

  return (
    <>
      <Container>
        <h1>Expendituries</h1>
        <div>
          <Button variant="success" onClick={() => addExpenditureHandler(true)}>
            Add
          </Button>
        </div>
        <div className="Expendituries">
          {expendituries.map((item) => {
            return (
              <Expenditure
                key={item.Id}
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
