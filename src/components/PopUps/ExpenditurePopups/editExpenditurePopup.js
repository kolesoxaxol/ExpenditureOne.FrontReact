import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import * as expenditureActions from "../../../store/actions/expenditureActions";

function EditPopUp(props) {
  const categories = useSelector((state) => state.categories.options);
  const dispatch = useDispatch();

  function updateTitle(e) {
    dispatch(
      expenditureActions.setCurrentExpenditure({
        title: e.target.value,
      })
    );
  }

  function updateDescription(e) {
    dispatch(
      expenditureActions.setCurrentExpenditure({
        description: e.target.value,
      })
    );
  }

  function updateDate(date) {
    dispatch(
      expenditureActions.setCurrentExpenditure({
        dateOfExpenditure: date,
      })
    );
  }

  function updateCategory(e) {}

  function onHide() {
    dispatch(expenditureActions.toggleEditPopup());
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

      dispatch(
        expenditureActions.updateExpenditures(expenditure, requestOptions)
      );
    }
  }

  function isChecked(category) {
    let isExist = props.expenditure?.categories?.some(
      (cat) => cat.id === category.value
    );
    return isExist ? "checked" : "";
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
                  key={item.id}
                  inline
                  defaultChecked={isChecked(item)}
                  label={item.displayValue}
                  name={`group-${item.value}`}
                  type="checkbox"
                  id={item.value}
                  onClick={(e) => updateCategory(item)}
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
