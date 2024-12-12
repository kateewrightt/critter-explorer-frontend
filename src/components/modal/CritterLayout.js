import React from "react";
import { Row, Col } from "reactstrap";
import TimeDial from "./sections/AvailabilityDial";
import MonthCalendar from "./sections/AvailabilityCalendar";

const CritterLayout = ({ isLargeScreen, hemisphere, critter, availability, timeRange }) => {
  const northernAvailability = critter?.north;
  const southernAvailability = critter?.south;

  return isLargeScreen ? (
    hemisphere ? (
      <Row className="full-height">
        <Col className="image-container">
          <div className="image-wrapper">
            <img className="large-critter-image" src={critter.render_url} alt={critter.name} />
          </div>
        </Col>
        <Col className="hemisphere-container">
          <h2 className="month-header">Seasonality</h2>
          <MonthCalendar
            northernMonthsArray={hemisphere === "Northern Hemisphere" ? northernAvailability?.months_array || [] : []}
            southernMonthsArray={hemisphere === "Southern Hemisphere" ? southernAvailability?.months_array || [] : []}
          />
        </Col>
        <Col className="time-dial-container">
          <h2 className="hours-header">Current Active Hours</h2>
          <div className="subheader">{timeRange}</div>
          <TimeDial availability={availability} />
        </Col>
      </Row>
    ) : (
      <Row className="full-height">
        <Col className="image-container">
          <div className="image-wrapper">
            <img className="large-critter-image" src={critter.render_url} alt={critter.name} />
          </div>
        </Col>
        <Col className="hemisphere-container">
          <h2 className="month-header">Seasonality</h2>
          <div className="hemisphere-section-wrapper" style={{ display: "flex", gap: "20px" }}>
            <div className="hemisphere-section" style={{ flex: "1 1 50%" }}>
              <MonthCalendar northernMonthsArray={northernAvailability?.months_array || []} />
            </div>
            <div className="hemisphere-section" style={{ flex: "1 1 50%" }}>
              <MonthCalendar southernMonthsArray={southernAvailability?.months_array || []} />
            </div>
          </div>
        </Col>
        <Col className="time-dial-container">
          <h2 className="hours-header">Current Active Hours</h2>
          <div className="subheader">{timeRange}</div>
          <TimeDial availability={availability} />
        </Col>
      </Row>
    )
  ) : (
    hemisphere ? (
      <>
        <Row>
          <Col className="image-container">
            <div className="image-wrapper">
              <img className="large-critter-image" src={critter.render_url} alt={critter.name} />
            </div>
          </Col>
        </Row>
        <Row className="small-screen-row justify-content-center">
          <Col className="hemisphere-container">
            <h2 className="month-header">Seasonality</h2>
            <MonthCalendar
              northernMonthsArray={hemisphere === "Northern Hemisphere" ? northernAvailability?.months_array || [] : []}
              southernMonthsArray={hemisphere === "Southern Hemisphere" ? southernAvailability?.months_array || [] : []}
            />
          </Col>
          <Col className="time-dial-container">
            <h2 className="hours-header">Current Active Hours</h2>
            <div className="subheader">{timeRange}</div>
            <TimeDial availability={availability} />
          </Col>
        </Row>
      </>
    ) : (
      <>
        <Row>
          <Col className="image-container">
            <div className="image-wrapper">
              <img className="large-critter-image" src={critter.render_url} alt={critter.name} />
            </div>
          </Col>
        </Row>
        <Row className="small-screen-row justify-content-center mx-auto">
          <Col className="hemisphere-container">
            <h2 className="month-header">Seasonality</h2>
            <div className="hemisphere-section-wrapper" style={{ display: "flex", gap: "20px" }}>
              <div className="hemisphere-section" style={{ flex: "1 1 50%" }}>
                <MonthCalendar northernMonthsArray={northernAvailability?.months_array || []} />
              </div>
              <div className="hemisphere-section" style={{ flex: "1 1 50%" }}>
                <MonthCalendar southernMonthsArray={southernAvailability?.months_array || []} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="time-dial-container">
            <h2 className="hours-header">Current Active Hours</h2>
            <div className="subheader">{timeRange}</div>
            <TimeDial availability={availability} />
          </Col>
        </Row>
      </>
    )
  );
};

export default CritterLayout;