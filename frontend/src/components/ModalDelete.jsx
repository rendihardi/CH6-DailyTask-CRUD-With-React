import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Error from "./Error.jsx";
import { useNavigate } from "react-router-dom";

function ModalDelete({ carId, onClose }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCar = async (carId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/cars/${carId}`
      );
      handleClose(); // Tutup modal setelah hapus berhasil
      if (response.status === 200) {
        navigate("/", { state: { flashMsg: "Deleted" } });
        window.location.reload();
      }
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  const handleDelete = () => {
    // Panggil fungsi deleteCar dengan id mobil
    deleteCar(carId);
  };

  const handleClosed = () => {
    setShow(false); // Tutup modal
    onClose(); // Panggil callback untuk menutup modal di komponen ListCar
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete car with ID: {carId}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosed}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelete;
