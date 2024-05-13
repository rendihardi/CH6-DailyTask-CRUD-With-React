import { Container, Button } from "react-bootstrap";
import HomeImg from "./../assets/fi_menu.svg";
import { Link } from "react-router-dom";

const HeaderList = () => {
  return (
    <div>
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
    </div>
  );
};

export default HeaderList;
