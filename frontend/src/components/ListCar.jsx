import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Button, Card } from "react-bootstrap";
import HomeImg from "./../assets/fi_menu.svg";
import { Link } from "react-router-dom";
import Error from "./Error.jsx";
import Loading from "./Loading.jsx";

function ListCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // Tambahkan state loading
  const [error, setError] = useState();

  useEffect(() => {
    getCars();
  }, []);

  const getCars = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/cars");
      // Urutkan array cars berdasarkan id terkecil
      const sortedCars = response.data.data.cars.sort((a, b) => a.id - b.id);
      setCars(sortedCars);
      setLoading(false); // Set loading menjadi false setelah data diterima
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/cars/${id}`);
      getCars();
    } catch (error) {
      console.log(error);
    }
  };

  // Fungsi untuk memformat tanggal
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

  // Fungsi untuk memformat harga
  const formatPrice = (price) => {
    return "Rp." + price.toLocaleString("id-ID") + " / hari";
  };

  return (
    <>
      {/* Header */}
      <Container className="container-header" style={{ marginTop: "90px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4>
              {" "}
              <img src={HomeImg} alt="Home" /> List Cars
            </h4>
          </div>
          <div>
            <Link to={`add`}>
              <Button
                style={{
                  background: "#025464",
                }}
                variant="primary"
                className="btn-add"
              >
                + Add Car
              </Button>
            </Link>
          </div>
        </div>
      </Container>

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
                        <Button
                          onClick={() => deleteCar(car.id)}
                          className="btn-delete"
                          variant="danger"
                        >
                          Delete
                        </Button>
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
