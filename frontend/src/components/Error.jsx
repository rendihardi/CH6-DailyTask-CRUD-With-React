import { Container } from "react-bootstrap";

export default function Error({ message, title }) {
  return (
    <>
      <Container className="container-header" style={{ marginTop: "90px" }}>
        <div className="error">
          {" "}
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      </Container>
    </>
  );
}
