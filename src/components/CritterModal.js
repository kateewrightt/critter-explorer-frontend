import '../assets/stylesheets/CritterModal.css';
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "reactstrap";
import TimeDial from "./TimeDial";
import MonthCalendar from "./MonthCalendar";
import FlickrGallery from "./FlickrGallery";

const CritterModal = ({ isOpen, onRequestClose, critter, hemisphere }) => {
  const handleClose = () => onRequestClose(false);

  if (!critter) return null;

  // Retrieve availability based on hemisphere or both
  const northernAvailability = critter?.north;
  const southernAvailability = critter?.south;
  const availability = hemisphere === "Northern Hemisphere" ? northernAvailability : southernAvailability;
  const timeRange = availability?.availability_array?.[0]?.time || "Unavailable";

  return (
    <Modal show={isOpen} onHide={handleClose} centered size="xl">
      <Modal.Header className="modal-background top-right-close" closeButton>
        <div className="critter-name">
          <img src={critter.image_url} alt={critter.name} className="small-critter-image" />
          {critter.name}
        </div>
      </Modal.Header>

      <Modal.Body className="modal-background">
        <Row className="full-height modal-layout">
          {/* Critter Image */}
          <Col className="image-container">
            <div className="image-wrapper" style={{ minWidth: "150px" }}>
              <img className="large-critter-image" src={critter.render_url} alt={critter.name} />
            </div>
          </Col>

          {/* Availability Calendar(s) */}
          <Col className="hemisphere-container">
            <div className="hemisphere-header">
              <h2 className="critter-content">Active Months</h2>
              {hemisphere ? (
                <MonthCalendar
                  northernMonthsArray={hemisphere === "Northern Hemisphere" ? northernAvailability?.months_array || [] : []}
                  southernMonthsArray={hemisphere === "Southern Hemisphere" ? southernAvailability?.months_array || [] : []}
                />
              ) : (
                <div className="hemisphere-section-wrapper">
                  <div className="hemisphere-section">
                    <MonthCalendar northernMonthsArray={northernAvailability?.months_array || []} />
                  </div>
                  <div className="hemisphere-section">
                    <MonthCalendar southernMonthsArray={southernAvailability?.months_array || []} />
                  </div>
                </div>
              )}
            </div>
          </Col>

          {/* Time Dial with Time Range */}
          <Col className="time-dial-container">
            <div className="time-dial-header">
              <h2 className="critter-content">Active Hours</h2>
              <div className='subheader'>{timeRange}</div>
              <TimeDial availability={availability} />
            </div>
          </Col>
        </Row>

                
        {/* Real World Gallery Section */}
        <Row>
          <Col>
            <h2 className="gallery-title">Real World Gallery</h2>
          </Col>
        </Row>
        <FlickrGallery critterName={critter.name} />
      </Modal.Body>
      <Modal.Footer className="modal-background"></Modal.Footer>
    </Modal>
  );
};

export default CritterModal;
