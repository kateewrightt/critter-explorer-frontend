import React, { useState, useEffect } from 'react';
import '../../../assets/stylesheets/CritterModal.css';
import '../../../assets/stylesheets/TimeDial.css';

const TimeDial = ({ availability, timeOfDay, minute }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const [filledHours, setFilledHours] = useState({ am: [], pm: [] });

  useEffect(() => {
    const parseAvailability = () => {
      const newFilledHours = { am: [], pm: [] };
  
      if (!availability || !availability.availability_array) {
        return;
      }
    
      availability.availability_array.forEach(({ time }, index) => {
        if (!time) {
          return;
        }
  
        if (time === "All day") {
          newFilledHours.am = hours;
          newFilledHours.pm = hours;
          return;
        }
  
        const timeRanges = time.split(/\s*[;&]\s*/);
        timeRanges.forEach((timeRange) => {
          const timeRangeRegex = /\s*[-–—]\s*/;
          const [start, end] = timeRange.split(timeRangeRegex);
          const [startHour, startPeriod] = parseTime(start);
          const [endHour, endPeriod] = parseTime(end);
  
          if (startPeriod === "PM" && endPeriod === "AM") {
            fillHours(newFilledHours, startHour + 1, 12, "PM");
            fillHours(newFilledHours, 1, endHour, "AM");
          } else if (startPeriod === endPeriod) {
            fillHours(newFilledHours, startHour + 1, endHour, startPeriod);
          } else {
            if (startPeriod === "AM") {
              fillHours(newFilledHours, startHour + 1, 12, "AM");
              fillHours(newFilledHours, 1, endHour, "PM");
            } else if (startPeriod === "PM") {
              fillHours(newFilledHours, startHour + 1, 12, "PM");
              fillHours(newFilledHours, 1, endHour, "AM");
            }
          }  
        });
      });
    
      if (
        JSON.stringify(filledHours.am) !== JSON.stringify(newFilledHours.am) ||
        JSON.stringify(filledHours.pm) !== JSON.stringify(newFilledHours.pm)
      ) {
        setFilledHours(newFilledHours);
      }
    };
  
    parseAvailability();
  }, [availability]);

  const parseTime = (time) => {
    if (!time) return [0, "AM"];
    time = time.trim(); 
    const [hourStr, period] = time.split(" ");
    const hour = hourStr.trim();
    const hourNum = hour === "12" ? 12 : parseInt(hour) % 12;
    if (isNaN(hourNum)) {
      return [0, period || "AM"];
    }
        return [hourNum, period];
  };
  
  const fillHours = (filledHours, start, end, period) => {
    const target = period === "AM" ? filledHours.am : filledHours.pm;
  
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        if (!target.includes(i)) {
          target.push(i);
        }
      }
    } else {
      for (let i = start; i <= 12; i++) {
        if (!target.includes(i)) {
          target.push(i);
        }
      }
      for (let i = 1; i <= end; i++) { 
        if (!target.includes(i)) {
          target.push(i);
        }
      }
    }
  };
  
  const calculateTimeIndicatorPosition = () => {
    if (timeOfDay === null || minute === null) {
      return null;
    }

    const hour24 = (parseInt(timeOfDay, 10) + 1) % 24;
    const isPM = hour24 >= 12;
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    const minutesFraction = minute / 60;

    return {
      row: isPM ? 1 : 0,
      position: (hour12 - 1) + minutesFraction,
    };
  };

  const timeIndicator = calculateTimeIndicatorPosition();

  const getRoundedEdges = () => {
    const edges = { am: { first: null, last: null }, pm: { first: null, last: null } };
    const isAllDay = filledHours.am.length === 12 && filledHours.pm.length === 12;
    if (isAllDay) {
        return {
            am: { first: 1, last: null },
            pm: { first: null, last: 12 },
        };
    }

    const firstAM = filledHours.am[0] || null;
    const lastAM = filledHours.am[filledHours.am.length - 1] || null;
    const firstPM = filledHours.pm[0] || null;
    const lastPM = filledHours.pm[filledHours.pm.length - 1] || null;

    const isWraparound =
        filledHours.pm.length > 0 && filledHours.am.length > 0 && 
        firstPM !== null && lastPM === 12 &&
        firstAM === 1 && lastAM !== null;

    if (isWraparound) {
        edges.pm.first = firstPM; 
        edges.am.last = lastAM;

        if (firstAM === 12 && filledHours.am.length > 1) {
            edges.am.first = null;
        }

        if (lastPM === 12 && filledHours.pm.length > 1) {
            edges.pm.last = null;
        }

        return edges;
    }
    const isWraparoundPM = firstPM !== null && lastPM !== null && firstPM > lastPM;
    
    if (isWraparoundPM) {    
        edges.pm.first = firstPM;
        edges.pm.last = lastPM; 

        if (filledHours.am.length === 0) {
            for (let i = 1; i <= 12; i++) {
                if (!filledHours.am.includes(i)) {
                    filledHours.am.push(i);
                }
            }
        }
    
        edges.am.first = null;
        edges.am.last = null;
    
        return edges;
    }
    
    if (filledHours.am.length > 0) {
        edges.am.first = firstAM;
        edges.am.last = lastAM;

        if (firstAM === 12 && lastAM !== 12) {
            edges.am.first = null;
        }

        if (lastAM === 12 && firstAM !== 12) {
            edges.am.last = null;
        }
    }

      if (filledHours.pm.length > 0) {
      const isTwoRanges = filledHours.am.length > 0;

      if (isTwoRanges) {
          edges.pm.first = firstPM;
      } else {
          edges.pm.first = firstPM;
      }

      edges.pm.last = lastPM;

      if (firstPM === 12 && filledHours.pm.length > 1) {
          edges.pm.first = null;
      }

      if (isTwoRanges && firstPM === 1 && filledHours.am.includes(12)) {
          edges.pm.first = null;
      }
    }

    // Specifically hardcoded for Giant Isopod, 9 AM – 4 PM; 9 PM – 4 AM
    if (filledHours.am.includes(10) && filledHours.pm.includes(4)) {
      edges.am.first = 10; 
      edges.am.last = 4;  
      edges.pm.first = 10; 
      edges.pm.last = 4;  

      if (filledHours.pm.includes(9)) {
          edges.pm.first = 9;
      }
      if (!filledHours.pm.includes(12)) {
          edges.pm.last = 4; 
      }

      return edges;
    }
    return edges;
};

  const roundedEdges = getRoundedEdges();

  const isFilled = (hour, period) => filledHours[period].includes(hour);

  const isTallLine = (index) => [0, 3, 6, 9, 12].includes(index);

  return (
    <div className="time-dial-outer-container">
      <div className="time-dial">
        <div className="dial-row">
          {hours.map((hour, index) => (
            <React.Fragment key={`am-${index}`}>
              <div className={`line ${isTallLine(index) ? "tall-line" : "short-line"}`}>
                {index === 0 && <span className="label">12AM</span>}
                {index === 6 && <span className="label">6AM</span>}
              </div>
              <div
                className={`hour-square 
                  ${isFilled(hour, "am") ? "filled" : ""} 
                  ${hour === roundedEdges.am.first ? "rounded-left" : ""} 
                  ${hour === roundedEdges.am.last ? "rounded-right" : ""}`}
              ></div>
            </React.Fragment>
          ))}
          <div className="line tall-line"></div>
          {timeIndicator && timeIndicator.row === 0 && (
            <div
              className="time-indicator active"
              style={{ left: `${timeIndicator.position * 8.33}%` }}
            >
              <div className="indicator-line"></div>
            </div>
          )}
        </div>

        <div className="dial-row">
          {hours.map((hour, index) => (
            <React.Fragment key={`pm-${index}`}>
              <div className={`line ${isTallLine(index) ? "tall-line" : "short-line"}`}>
                {index === 0 && <span className="label">12PM</span>}
                {index === 6 && <span className="label">6PM</span>}
              </div>
              <div
                className={`hour-square 
                  ${isFilled(hour, "pm") ? "filled" : ""} 
                  ${hour === roundedEdges.pm.first ? "rounded-left" : ""} 
                  ${hour === roundedEdges.pm.last ? "rounded-right" : ""}`}
              ></div>
            </React.Fragment>
          ))}
          <div className="line tall-line"></div>
          {timeIndicator && timeIndicator.row === 1 && (
            <div
              className="time-indicator active"
              style={{ left: `${timeIndicator.position * 8.33}%` }}
            >
              <div className="indicator-line"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeDial;