import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Error from "./Error.jsx";
import Loading from "./Loading.jsx";
import ModalDelete from "./ModalDelete.jsx";
import FlashMessage from "./FlashMessage.jsx";
import { useLocation } from "react-router-dom";

function ListCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [selectedCarId, setSelectedCarId] = useState(null);
  const location = useLocation();
  const [flashMsg, setFlashMsg] = useState(null); // State untuk pesan flash

  useEffect(() => {
    getCars();
    // Bersihkan pesan flash saat komponen dibongkar (unmount)
    return () => {
      clearFlashMsg();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function GetCars
  const getCars = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/cars");
      // Urutkan array cars berdasarkan id terkecil
      const sortedCars = response.data.data.cars.sort((a, b) => a.id - b.id);
      setCars(sortedCars);
      setLoading(false); // Set loading menjadi false setelah data diterima

      // Set pesan flash jika ada
      const msg = location.state?.flashMsg;
      if (msg) {
        setFlashMsg(msg);
        window.history.replaceState(null, "");
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  // Hapus pesan flash saat komponen unmount
  const clearFlashMsg = () => {
    setFlashMsg(null);
  };

  if (error) {
    return <Error title="Failed To Fetch Data" message={error.message} />;
  }

  // Function format date
  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-GB",
      options
    );
    return formattedDate;
  };

  // Function format price
  const formatPrice = (price) => {
    return "Rp." + price.toLocaleString("id-ID") + " / hari";
  };

  const handleCloseModal = () => {
    setSelectedCarId(null); // Reset selectedCarId setelah modal tertutup
  };

  return (
    <>
      {/* Header */}

      {flashMsg && <FlashMessage flashMsg={flashMsg} />}

      {/* Card */}
      <Container className="container-card" style={{ marginTop: "20px" }}>
        {loading ? ( // Tambahkan kondisi loading
          <Loading />
        ) : cars.length > 0 ? (
          cars.map(
            (
              car // Hapus parameter index dari map
            ) => (
              <div key={car.id} className="card-list">
                {" "}
                {/* Gunakan id sebagai key */}
                <Card>
                  <Card.Img variant="top" src={car.photo} />
                  <Card.Body>
                    <Card.Title>{car.name}</Card.Title>
                    <Card.Text>
                      <strong>{formatPrice(car.price)}</strong>
                      <strong>
                        {" "}
                        <p
                          style={{
                            fontSize: "15px",
                            textTransform: "capitalize",
                          }}
                        >
                          {car.size} Capacity
                        </p>
                      </strong>
                      <p
                        style={{
                          fontSize: "13px",
                        }}
                      >
                        Update At {formatDate(car.updatedAt)}
                      </p>{" "}
                      {/* Panggil fungsi formatDate untuk memformat tanggal */}
                    </Card.Text>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ marginRight: "15px" }}>
                        <ModalDelete
                          className="modal-delete"
                          picCarId={selectedCarId}
                          carId={car.id}
                          onClose={handleCloseModal} // Callback untuk menutup modal
                          getCars={getCars} // Melewatkan properti getCars
                          flashMsg="Deleted"
                        />
                      </div>
                      <div>
                        <Link to={`update/${car.id}`}>
                          {" "}
                          <Button className="btn-update" variant="primary">
                            Update
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            )
          )
        ) : (
          <p className="no-available">No Cars Available !!!</p>
        )}
      </Container>
    </>
  );
}

export default ListCars;
