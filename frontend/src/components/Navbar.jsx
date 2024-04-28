import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import carImage1 from "./../assets/beep.png";

function NavbarComponent() {
  return (
    <Navbar fixed="top" className="navbar bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          {" "}
          <img src={carImage1} height="50px"></img> Rental Car Management
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {" "}
            <img
              src="https://github.com/mdo.png"
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />{" "}
            <a href="#login">Rendi H</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
