import "../App.css";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchConfig } from "../utils/fetchConfig";

// Displays the individual bugs and flickr images in a modal
const BugModal = ({ isOpen, onRequestClose, bug }) => {
  const [flickrImages, setFlickrImages] = useState([]);

  // Fetches the flickr images of the bugs using their bug name to search flickr tags
  const fetchFlickrPhotos = async (bugName) => {
    try {
      const backendURL = await fetchConfig();
      const response = await fetch(
        `http://${backendURL}/critterImages?bugName=${bugName}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bug images");
      }

      const data = await response.json();

      if (data.images && data.images.length > 0) {
        return data.images;
      } else {
        throw new Error("No photos found on Flickr");
      }
    } catch (error) {
      console.error("Error fetching Flickr photos:", error);
      throw error;
    }
  };

  // UseEffect runs everytime the dependency is changed,
  // Here we use it to clear the flickr images when the user hasnt selected a bug
  // This improves user experience - without this when the user selects a 2nd bug then
  // it would be prefilled with the previous bug flickr photos and it would take a few seconds to refresh
  useEffect(() => {
    if (!isOpen) {
      setFlickrImages([]);
    }
  }, [isOpen]);

  // UseEffect runs everytime the dependency is changed,
  // So when user selects a bug we get the flickr photos for it
  useEffect(() => {
    if (bug) {
      fetchFlickrPhotos(bug.name)
        .then((images) => {
          setFlickrImages(images);
        })
        .catch((error) => {
          console.error("Error fetching Flickr images:", error);
        });
    }
  }, [bug]);

  const handleClose = () => onRequestClose(false);

  if (!bug) {
    return false;
  }

  // Display for the bug modal component
  return (
    <Modal show={isOpen} onHide={handleClose} centered size="xl">
      <Modal.Header
        style={{ backgroundColor: "#f9f3d2" }}
        closeButton
      ></Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f9f3d2" }}>
        <Row>
          <Col sm={7}>
            <h1 className="bug-name">{bug.name}</h1>
            <h2 className="bug-content">
              Northern Hemisphere: {bug.north.months}
            </h2>
            <h2 className="bug-content">
              Southern Hemisphere: {bug.south.months}
            </h2>
            <h2 className="bug-content">
              Times: {bug.south.availability_array[0].time}
            </h2>
          </Col>
          <Col
            sm={5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img className="bug-render" src={bug.render_url} alt={bug.name} />
          </Col>
        </Row>
        <Col>
          <Row>
            <h1 className="gallery-title"> Real World Gallery</h1>
          </Row>
        </Col>
        <Col>
          <Row className="gallery-container">
            {flickrImages.map((image, index) => (
              <Col xs={6} sm={5} md={5} lg={3} xl={2} key={image.id}>
                <a
                  href={`http://www.flickr.com/photos/${image.owner}/${image.id}`}
                >
                  <div className="flickr-image-container">
                    <img
                      className="flickr-image"
                      src={`http://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
                      alt={image.title}
                    />
                  </div>
                </a>
              </Col>
            ))}
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f9f3d2" }}></Modal.Footer>
    </Modal>
  );
};

export default BugModal;
