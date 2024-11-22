import '../assets/stylesheets/CritterModal.css';
import '../assets/stylesheets/ThemedSpinner.css';
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "reactstrap";
import { useMediaQuery } from 'react-responsive';
import TimeDial from "./TimeDial";
import MonthCalendar from "./MonthCalendar";
import FlickrGallery from "./FlickrGallery";

const CritterModal = ({ isOpen, onRequestClose, critter, hemisphere }) => {
  const isLargeScreen = useMediaQuery({ minWidth: 1200 });
  const handleClose = () => onRequestClose(false);

  if (!critter) return null;

  const northernAvailability = critter?.north;
  const southernAvailability = critter?.south;
  const availability = hemisphere === "Northern Hemisphere" ? northernAvailability : southernAvailability;
  const timeRange = availability?.availability_array?.[0]?.time || "Unavailable";

  return (
    <Modal show={isOpen} onHide={handleClose} centered size="xl">
      <Modal.Header className="modal-background top-right-close" closeButton>
        {/* Display critter name and small image */}
        <div className="critter-name">
          <img src={critter.image_url} alt={critter.name} className="small-critter-image" />
          {critter.name}
        </div>
      </Modal.Header>

      <Modal.Body className="modal-background">
        {/* Layout based on screen size and hemisphere availability */}
        {isLargeScreen ? (
          hemisphere ? (
            // Large screen layout with single hemisphere
            <Row className="full-height">
              <Col className="image-container">
                <div className="image-wrapper">
                  <img className="large-critter-image" src={critter.render_url} alt={critter.name} />
                </div>
              </Col>
              <Col className="hemisphere-container">
                {/* Display month calendar for selected hemisphere */}
                <h2 className="critter-content">Active Months</h2>
                <MonthCalendar
                  northernMonthsArray={hemisphere === "Northern Hemisphere" ? northernAvailability?.months_array || [] : []}
                  southernMonthsArray={hemisphere === "Southern Hemisphere" ? southernAvailability?.months_array || [] : []}
                />
              </Col>
              <Col className="time-dial-container">
                {/* Display critter's active hours */}
                <h2 className="critter-content">Active Hours</h2>
                <div className="subheader">{timeRange}</div>
                <TimeDial availability={availability} />
              </Col>
            </Row>
          ) : (
            // Large screen layout with both hemispheres
            <Row className="full-height">
              <Col className="image-container">
                <div className="image-wrapper">
                  <img className="large-critter-image" src={critter.render_url} alt={critter.name} />
                </div>
              </Col>
              <Col className="hemisphere-container">
                <h2 className="critter-content">Active Months</h2>
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
                <h2 className="critter-content">Active Hours</h2>
                <div className="subheader">{timeRange}</div>
                <TimeDial availability={availability} />
              </Col>
            </Row>
          )
        ) : (
          hemisphere ? (
            // Small screen layout with single hemisphere
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
                  <h2 className="critter-content">Active Months</h2>
                  <MonthCalendar
                    northernMonthsArray={hemisphere === "Northern Hemisphere" ? northernAvailability?.months_array || [] : []}
                    southernMonthsArray={hemisphere === "Southern Hemisphere" ? southernAvailability?.months_array || [] : []}
                  />
                </Col>
                <Col className="time-dial-container">
                  <h2 className="critter-content">Active Hours</h2>
                  <div className="subheader">{timeRange}</div>
                  <TimeDial availability={availability} />
                </Col>
              </Row>
            </>
          ) : (
            // Small screen layout with both hemispheres
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
                  <h2 className="critter-content">Active Months</h2>
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
                  <h2 className="critter-content">Active Hours</h2>
                  <div className="subheader">{timeRange}</div>
                  <TimeDial availability={availability} />
                </Col>
              </Row>
            </>
          )
        )}

        {/* Flickr Gallery */}
        <Row>
          <Col>
            <h2 className="gallery-title">Real World Gallery</h2>
          </Col>
        </Row>
        <FlickrGallery critterName={critter.name} critterImage={critter.image_url} critterType={critter.type} />
      </Modal.Body>

      <Modal.Footer className="modal-background"></Modal.Footer>
    </Modal>
  );
};

export default CritterModal;
