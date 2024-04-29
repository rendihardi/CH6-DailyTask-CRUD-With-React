import { Container } from "react-bootstrap"; // Import Spinner dari react-bootstrap
import UploadImg from "./../assets/fi_upload.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Error from "./Error.jsx";
import Loading from "./Loading.jsx";
import HomeImg from "./../assets/fi_menu.svg";

function UpdateCar() {
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("small");
  const [existingPhoto, setExistingPhoto] = useState("");
  const [loading, setLoading] = useState(false); // State untuk menandai sedang memuat atau tidak
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState();

  useEffect(() => {
    getCarById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set state loading menjadi true saat mulai memproses

      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("size", size);

      const response = await axios.put(
        `http://localhost:3000/api/v1/cars/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);
      setLoading(false); // Set state loading menjadi false setelah selesai memproses
      //   cek dan redirect
      if (response.status === 200) {
        navigate("/", { state: { flashMsg: "Updated" } });
      }
    } catch (error) {
      setLoading(false); // Set state loading menjadi false jika terjadi kesalahan
      setError(error);
    }
  };

  if (error) {
    return <Error title="An error occured!" message={error.message} />;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCarById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/cars/${id}`
      );
      const carData = response.data.data.car;
      setName(carData.name);
      setExistingPhoto(carData.photo);
      setPrice(carData.price);
      setSize(carData.size);
    } catch (error) {
      console.log(error);
    }
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
              <img src={HomeImg} alt="Home" /> Update Car
            </h4>
          </div>
        </div>
      </Container>

      {/* Form */}
      <Container className="container-form" style={{ marginTop: "50px" }}>
        <form id="myForm" onSubmit={updateCar}>
          <div className="container-form2">
            <div className="row pt-4" style={{ fontSize: "14px" }}>
              <div className="col-md-3">
                <label htmlFor="name">Nama*</label>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  id="name"
                  className="col-text"
                  placeholder="Nama/Tipe Mobil"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="row pt-4" style={{ fontSize: "14px" }}>
              <div className="col-md-3">
                <label htmlFor="price">Sewa Per Hari*</label>
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  id="price"
                  className="col-text"
                  placeholder="Rp.0"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="row pt-4" style={{ fontSize: "14px" }}>
              <div className="col-md-3">
                <label htmlFor="size">Ukuran*</label>
              </div>
              <div className="col-md-6">
                <select
                  id="size"
                  className="col-text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
            <div className="row pt-4" style={{ fontSize: "14px" }}>
              <div className="col-md-3">
                <label>Foto*</label>
              </div>
              <div className="col-md-6">
                <label className="custom-file-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <img
                    className="justify-content-end"
                    src={UploadImg}
                    alt="Upload Image"
                  />
                </label>
                <p style={{ fontSize: "12px", color: "#646464" }}>
                  File size max 2 Mb
                </p>
                {existingPhoto && (
                  <div>
                    Existing Photos :
                    <img
                      src={existingPhoto}
                      alt="Existing"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  </div>
                )}
                {photoPreview && (
                  <div>
                    Updated Photos :
                    <img
                      src={photoPreview}
                      alt="Selected"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                )}
                {/* Menampilkan Spinner saat loading */}
                {loading && <Loading />}
              </div>
            </div>
          </div>
          <div className="button-cu mt-5 mt-5">
            <a href="/">
              <button className="cancel-btn" type="button">
                Cancel
              </button>
            </a>
            <button className="save-btn" type="submit">
              Update
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}

export default UpdateCar;
