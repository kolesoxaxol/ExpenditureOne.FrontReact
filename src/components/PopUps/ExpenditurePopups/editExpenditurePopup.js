import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EditPopUp(props) {
  function updateTitle(e) {
    props.setCurrentExpenditure((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  }

  function updateDescription(e) {
    props.setCurrentExpenditure((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  }

  function updateDate(date) {
    props.setCurrentExpenditure((prev) => {
      return {
        ...prev,
        dateOfExpenditure: date,
      };
    });
  }

  function onHide() {
    props.setEditPopupShow(false);
  }

  function checkDate(date) {
    if (!date) return "";
    return new Date(date);
  }

  function ChangeExpenditure() {
    const expenditure = props.expenditure;

    if (expenditure.id) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(expenditure),
      };

      fetch(
        `https://localhost:44352/api/Expenditure/${expenditure.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => props.setCurrentExpenditure(data))
        .then(() => {
          props.setEditPopupShow(false);
          const atIndex = props.expendituries.findIndex(
            (cat) => cat.id === expenditure.id
          );

          props.setExpendituries([
            ...props.expendituries.slice(0, atIndex),
            { ...expenditure },
            ...props.expendituries.slice(atIndex + 1),
          ]);
        });
    }
  }

  return (
    <>
      <Modal
        size="lg"
        show={props.editPopupShow}
        onHide={onHide}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Expenditure
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            Title:
            <input
              type="text"
              onChange={updateTitle}
              value={props.expenditure?.title}
            />
          </label>
          <label>
            Description: 
            <input
              type="text"
              onChange={updateDescription}
              value={props.expenditure?.description}
            />
          </label>
          <label>
            Date: 
            <DatePicker
              selected={checkDate(props.expenditure?.dateOfExpenditure)}
              onChange={(date) => updateDate(date)}
            />
          </label>
          <Button onClick={ChangeExpenditure}>Apply</Button>
          {/* <input type="text" value={expenditure.data.color} /> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPopUp;
