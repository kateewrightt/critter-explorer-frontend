import React, { useEffect, useState } from 'react';
import '../assets/stylesheets/ThemedSpinner.css';
import bugImage from '../assets/images/bugs.png';
import fishImage from '../assets/images/fish.png';
import seaCreatureImage from '../assets/images/sea-creatures.png';

const ThemedSpinner = ({ critterType, critterImage }) => {
  const themes = ['bug', 'fish', 'sea-creature'];
  const [theme, setTheme] = useState(critterType || '');

  useEffect(() => {
    // Randomly select a theme if no specific critter type is provided
    if (!critterType) {
      setTheme(themes[Math.floor(Math.random() * themes.length)]);
    }
  }, [critterType]);

  const imageSource = critterImage || (theme === 'bug' ? bugImage : theme === 'fish' ? fishImage : seaCreatureImage);
  const imageClass = critterImage ? 'critter-image' : 'default-icon';

  return (
    <div className="spinner-container">
      {theme === 'fish' && (
        <div className="fish-swimming-container">
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              src={imageSource}
              alt="swimming fish"
              className={`swimming-fish ${imageClass} fish-${index}`}
            />
          ))}
        </div>
      )}
      {theme === 'bug' && (
        <div className="bug-crawling-container">
          <img src={imageSource} alt="pulsing bug" className={`pulsing-bug ${imageClass}`} />
        </div>
      )}
      {theme === 'sea-creature' && (
        <div className="sea-creature-loading-container">
          <img src={imageSource} alt="bobbing sea creature" className={`pulsing-octopus ${imageClass}`} />
        </div>
      )}
      {!critterType && <div className="loading-text">Loading</div>}
    </div>
  );
};

export default ThemedSpinner;
