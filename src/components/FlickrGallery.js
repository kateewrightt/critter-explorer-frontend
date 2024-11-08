import React, { useState, useEffect } from "react";
import { Col, Row, Spinner } from "reactstrap";
import "../assets/stylesheets/CritterModal.css";
import { fetchConfig } from "../utils/fetchConfig";

const FlickrGallery = ({ critterName }) => {
  const [flickrImages, setFlickrImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFlickrPhotos = async () => {
      try {
        setLoading(true);
        const backendURL = await fetchConfig();
        const response = await fetch(`${backendURL}/critterImages?critterName=${critterName}`);
        if (!response.ok) throw new Error("Failed to fetch critter images");
        const data = await response.json();
        setFlickrImages(data.images.slice(0, 12)); 
      } catch (error) {
        console.error("Error fetching Flickr photos:", error);
        setFlickrImages([]);
      } finally {
        setLoading(false);
      }
    };
  
    if (critterName) fetchFlickrPhotos();
  }, [critterName]);
  

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "200px" }}>
        <Spinner color="secondary" />
      </div>
    );
  }

  return (
    <Row className="gallery-container g-0">
      {flickrImages.map((image) => (
        <Col xs={6} sm={5} md={5} lg={3} xl={2} key={image.id}>
          <a href={`http://www.flickr.com/photos/${image.owner}/${image.id}`} target="_blank" rel="noopener noreferrer">
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
  );
};

export default FlickrGallery;
