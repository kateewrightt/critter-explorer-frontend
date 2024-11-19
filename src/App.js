import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./App.css";
import flick from "./assets/images/flick.png";
import cj from "./assets/images/CJ.png";
import Search from "./components/CitySearch";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };

  return (
    <div className="App">
      <Container className="text-center mt-5">

        {/* Small screens: CJ and Flick side by side above the title */}
        <div className="d-flex d-md-none justify-content-center image-container">
          <img src={cj} alt="CJ" className="cj-image" />
          <img src={flick} alt="Flick" className="flick-image" />
        </div>

        {/* Title row with separate CJ and Flick images for larger screens */}
        <Row className="align-items-center header-row">
          <Col md="2" className="d-none d-md-flex justify-content-start image-col">
            <img src={cj} alt="CJ" className="cj-image" />
          </Col>

          <Col xs="12" md="8" className="text-center">
            <h1 className="header">Critter Explorer</h1>
            <p className="subheader">
              Find what ACNH critters are out and about in your city!
            </p>
          </Col>

          <Col md="2" className="d-none d-md-flex justify-content-end image-col">
            <img src={flick} alt="Flick" className="flick-image" />
          </Col>
        </Row>

        <Row>
          <Col>
            <Search onSearchChange={handleOnSearchChange} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
