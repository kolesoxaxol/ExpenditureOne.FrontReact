import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import { useSelector } from "react-redux";

function EditPopUp(props) {
  const categories = useSelector((state) => state.categories.options);

  //TODO:
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

  function isChecked(category) {
    let isExist = props.expenditure?.categories?.some(
      (cat) => cat.id === category.value
    );
    return isExist ? "checked" : "";
  }

  function ToggleCategory(e) {
    debugger;
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
          <FormGroup>
            <FormLabel>Categories</FormLabel>
            {categories.map((item) => {
              return (
                <Form.Check
                  inline
                  defaultChecked={isChecked(item)}
                  label={item.displayValue}
                  name={`group-${item.value}`}
                  type="checkbox"
                  id={item.value}
                  onClick={(e) => ToggleCategory(item)}
                />
              );
            })}
          </FormGroup>

          <Button onClick={ChangeExpenditure}>Apply</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPopUp;
