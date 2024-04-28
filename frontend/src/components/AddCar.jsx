import { Container } from "react-bootstrap";
import UploadImg from "./../assets/fi_upload.svg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Error from "./Error.jsx";
import Loading from "./Loading.jsx";

function AddCar() {
  const [photo, setPhoto] = useState(null); // State untuk menyimpan file gambar
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("small");
  const [loading, setLoading] = useState(false); // State untuk menandai sedang memuat atau tidak
  const navigate = useNavigate();
  const [previewPhoto, setPreviewPhoto] = useState(""); // State untuk menyimpan URL preview foto
  const [error, setError] = useState();

  const saveCar = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set state loading menjadi true saat mulai memproses

      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("size", size);

      const response = await axios.post(
        "http://localhost:3000/api/v1/cars",
        formData
      );
      console.log("Response:", response);
      setLoading(false); // Set state loading menjadi false setelah selesai memproses
      if (response.status === 200) {
        navigate("/");
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
    setPhoto(file); // Menyimpan file yang dipilih ke dalam state
    setPreviewPhoto(URL.createObjectURL(file)); // Menampilkan preview gambar
  };

  return (
    <Container className="container-form" style={{ marginTop: "90px" }}>
      <form id="myForm" onSubmit={saveCar}>
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
              <label htmlFor="photo">Foto*</label>
            </div>
            <div className="col-md-6">
              <label className="custom-file-upload">
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  required
                  onChange={handleFileChange} // Menggunakan fungsi handleFileChange untuk menangani perubahan file
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
              {/* Menampilkan preview gambar */}
              {previewPhoto && (
                <div>
                  <img
                    src={previewPhoto}
                    alt="Preview"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Menampilkan Spinner saat loading */}
          {loading && <Loading />}
        </div>
        <div className="button-cu mt-5 mt-5">
          <a href="/">
            <button className="cancel-btn" type="button" form="myForm">
              Cancel
            </button>
          </a>
          <button className="save-btn" type="submit" form="myForm">
            Save
          </button>
        </div>
      </form>
    </Container>
  );
}

export default AddCar;
