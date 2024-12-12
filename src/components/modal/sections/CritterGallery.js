import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import '../../../assets/stylesheets/CritterModal.css';
import { fetchConfig } from "../../../utils/fetchConfig";
import ThemedSpinner from "../../common/ThemedSpinner";

const FlickrGallery = ({ critterName, critterImage, critterType }) => {
  const [flickrImages, setFlickrImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const fetchFlickrPhotos = async () => {
      try {
        setImagesLoaded(false);
        const backendURL = await fetchConfig();
        const response = await fetch(`${backendURL}/critterImages?critterName=${critterName}`);
        if (!response.ok) throw new Error("Failed to fetch critter images");
        const data = await response.json();

        // Preload images
        const imageUrls = data.images.slice(0, 12).map(
          (image) => `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`
        );

        await Promise.all(
          imageUrls.map(
            (src) =>
              new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = reject;
              })
          )
        );

        setFlickrImages(data.images.slice(0, 12));
      } catch (error) {
        console.error("Error fetching or preloading Flickr photos:", error);
        setFlickrImages([]);
      } finally {
        setImagesLoaded(true);
      }
    };

    if (critterName) fetchFlickrPhotos();
  }, [critterName]);

  if (!imagesLoaded) {
    return (
      <div className="flickr-gallery-loading">
        <ThemedSpinner critterType={critterType} critterImage={critterImage} />
      </div>
    );
  }

  if (!flickrImages.length) {
    return (
      <div className="flickr-gallery-no-images">
        <p>No images found</p>
      </div>
    );
  }

  return (
    <Row className="gallery-container g-0">
      {flickrImages.map((image) => (
        <Col xs={6} sm={5} md={5} lg={3} xl={2} key={image.id}>
          <a href={`https://www.flickr.com/photos/${image.owner}/${image.id}`} target="_blank" rel="noopener noreferrer">
            <div className="flickr-image-container">
              <img
                className="flickr-image"
                src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`}
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