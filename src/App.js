import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./App.css";
import flick from "./assets/flick.png";
import Search from "./components/CitySearch";
// import PageCount from "./components/PageCount";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };

  return (
    <div className="App">
      <Container className="text-center mt-5">
        <Row>
          <Col className="image-col">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img src={flick} alt="Flick" className="image" />
              {/* <PageCount /> */}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="center-content">
              <h1 className="header">Critter Explorer</h1>
              <p className="subheader">
                Find what ACNH critters are out and about in your city!
              </p>
            </div>
            <Search onSearchChange={handleOnSearchChange} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
