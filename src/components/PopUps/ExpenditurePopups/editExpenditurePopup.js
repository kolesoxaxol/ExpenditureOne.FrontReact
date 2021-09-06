import { Modal, Button } from "react-bootstrap";

function EditPopUp(props) {
  function updateExpenditureName(e) {
    props.setCurrentExpenditure((prev) => {
      return {
        ...prev,
        expenditureName: e.target.value,
      };
    });
  }

  function updateColor(e) {
    props.setCurrentExpenditure((prev) => {
      return {
        ...prev,
        color: e.target.value,
      };
    });
  }

  function onHide() {
    props.setEditPopupShow(false);
  }

  function ChangeExpenditure() {
    const expenditure = props.expenditure;
debugger;
    if (expenditure.id) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(expenditure),
      };

      fetch(
        `https://localhost:44352/api/expendure/${expenditure.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => props.setCurrentExpenditure(data))
        .then(props.setEditPopupShow(false))
        .then(() => {
          const atIndex = props.expendituries.findIndex(cat => cat.id === expenditure.id);
 
          props.setExpendituries([
            ...props.expendituries.slice(0, atIndex),
            { ...expenditure },
            ...props.expendituries.slice(atIndex + 1)
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
          <input
            type="text"
            onChange={updateExpenditureName}
            value={props.expenditure?.expenditureName}
          />
          <input
            type="text"
            onChange={updateColor}
            value={props.expenditure?.color}
          />
          <Button onClick={ChangeExpenditure}>Apply</Button>
          {/* <input type="text" value={expenditure.data.color} /> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPopUp;
