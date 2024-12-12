import '../../assets/stylesheets/CritterModal.css';
import '../../assets/stylesheets/ThemedSpinner.css';
import NavigationArrows from "./NavigationArrows";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "reactstrap";
import { useMediaQuery } from 'react-responsive';
import FlickrGallery from "./sections/CritterGallery";
import CritterLayout from "./CritterLayout";
import CritterName from './sections/CritterName';

const CritterModal = ({ isOpen, onRequestClose, critter, hemisphere, critterList, currentIndex, onNavigate }) => {
  const isLargeScreen = useMediaQuery({ minWidth: 1200 });
  const handleClose = () => onRequestClose(false);

  if (!critter) return null;

  const availability = hemisphere === "Northern Hemisphere" ? critter?.north : critter?.south;
  const timeRange = availability?.availability_array?.[0]?.time || "Unavailable";

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
      size="xl"
      backdrop="static"
      className="modal-background"
    >
      <div className="modal-content">
      <Modal.Header className="top-right-close" closeButton>
        <div className="critter-name-container">
          <div className="critter-name-text">{critter.name}</div>
        </div>
      </Modal.Header>

        <Modal.Body>
          <NavigationArrows
            currentIndex={currentIndex}
            critterList={critterList}
            onNavigate={onNavigate}
          />
          <CritterLayout
            isLargeScreen={isLargeScreen}
            hemisphere={hemisphere}
            critter={critter}
            availability={availability}
            timeRange={timeRange}
          />
          <Row>
            <Col>
              <h2 className="gallery-title">Real World Gallery</h2>
            </Col>
          </Row>
          <FlickrGallery critterName={critter.name} critterImage={critter.image_url} critterType={critter.type} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </div>
    </Modal>

  );
};

export default CritterModal;