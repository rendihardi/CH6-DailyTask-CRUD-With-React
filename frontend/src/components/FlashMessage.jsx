import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

function FlashMessage({ flashMsg, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Cek nilai flashMsg dan tentukan jenis alert berdasarkan nilai
  const alertVariant =
    flashMsg === "Added" || flashMsg === "Updated"
      ? "success"
      : flashMsg === "Deleted"
      ? "dark"
      : "";

  return (
    <>
      {/* Tampilkan FlashMessage jika isVisible true */}
      {isVisible && (
        <Container
          className="container-header"
          style={{ marginTop: "90px", marginLeft: "25%" }}
        >
          <Alert variant={alertVariant}>Data Success {flashMsg}</Alert>
        </Container>
      )}
    </>
  );
}

export default FlashMessage;
