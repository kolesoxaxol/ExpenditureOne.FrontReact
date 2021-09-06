import { Modal, Button } from "react-bootstrap";

function EditPopUp(props) {
  function updateCategoryName(e) {
    props.setCurrentCaregory((prev) => {
      return {
        ...prev,
        categoryName: e.target.value,
      };
    });
  }

  function updateColor(e) {
    props.setCurrentCaregory((prev) => {
      return {
        ...prev,
        color: e.target.value,
      };
    });
  }

  function onHide() {
    props.setEditPopupShow(false);
  }

  function ChangeCategory() {
    const category = props.category;

    if (category.id) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(category),
      };

      fetch(
        `http://expenditure.uteam-dev.com/api/Category/${category.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => props.setCurrentCaregory(data))
        .then(props.setEditPopupShow(false))
        .then(() => {
          const atIndex = props.categories.findIndex(cat => cat.id === category.id);
 
          props.setCategories([
            ...props.categories.slice(0, atIndex),
            { ...category },
            ...props.categories.slice(atIndex + 1)
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
            Edit Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            onChange={updateCategoryName}
            value={props.category?.categoryName}
          />
          <input
            type="text"
            onChange={updateColor}
            value={props.category?.color}
          />
          <Button onClick={ChangeCategory}>Apply</Button>
          {/* <input type="text" value={category.data.color} /> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPopUp;
