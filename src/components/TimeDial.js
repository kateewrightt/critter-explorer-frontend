import React, { useState, useEffect } from 'react';
import '../assets/stylesheets/TimeDial.css';

const TimeDial = ({ availability }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const [filledHours, setFilledHours] = useState({ am: [], pm: [] });

  useEffect(() => {
    const parseAvailability = () => {
        const newFilledHours = { am: [], pm: [] };
        if (!availability || !availability.availability_array) return;
      
        availability.availability_array.forEach(({ time }) => {
          if (!time) return; 
      
          if (time === "All day") {
            newFilledHours.am = hours;
            newFilledHours.pm = hours;
            return;
          }
      
          const timeRanges = time.split(" & ");
          timeRanges.forEach((timeRange) => {
            const [start, end] = timeRange.split(" – ");
            const [startHour, startPeriod] = parseTime(start);
            const [endHour, endPeriod] = parseTime(end);
      
            const adjustedStartHour = startHour === 12 ? 12 : startHour;
            const fillFromHour = adjustedStartHour === 12 ? 1 : adjustedStartHour + 1;
      
            if (startPeriod === "PM" && endPeriod === "PM" && startHour > endHour) {
              fillHours(newFilledHours, adjustedStartHour, 12, "PM");
              fillHours(newFilledHours, 1, endHour, "PM");
              fillHours(newFilledHours, 1, 12, "AM");
            } else if (startPeriod === endPeriod) {
              fillHours(newFilledHours, fillFromHour, endHour, startPeriod);
            } else {
              if (startPeriod === "AM") {
                fillHours(newFilledHours, fillFromHour, 12, "AM");
                fillHours(newFilledHours, 1, endHour, "PM");
              } else if (startPeriod === "PM") {
                fillHours(newFilledHours, fillFromHour, 12, "PM");
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
  
    const [hour, period] = time.split(" ");
    const hourNum = hour === "12" ? 12 : parseInt(hour) % 12;
    return [hourNum, period];
  };
  
  const fillHours = (filledHours, start, end, period) => {
    const target = period === "AM" ? filledHours.am : filledHours.pm;
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        if (!target.includes(i)) target.push(i);
      }
    } else {
      for (let i = start; i <= 12; i++) {
        if (!target.includes(i)) target.push(i);
      }
      for (let i = 1; i <= end; i++) {
        if (!target.includes(i)) target.push(i);
      }
    }
  };

  const isFilled = (hour, period) => filledHours[period].includes(hour);
  const isTallLine = (index) => [0, 3, 6, 9, 12].includes(index);

  return (
    <div className="time-dial-outer-container">
      <div className="time-dial">
        <div className="dial-row">
          {hours.map((hour, index) => (
            <React.Fragment key={`am-${index}`}>
              <div className={`line ${isTallLine(index) ? 'tall-line' : 'short-line'}`}>
                {index === 0 && <span className="label">12AM</span>}
                {index === 6 && <span className="label">6AM</span>}
              </div>
              <div className={`hour-square ${isFilled(hour, 'am') ? 'filled' : ''}`}></div>
            </React.Fragment>
          ))}
          <div className="line tall-line"></div>
        </div>
        <div className="dial-row">
          {hours.map((hour, index) => (
            <React.Fragment key={`pm-${index}`}>
              <div className={`line ${isTallLine(index) ? 'tall-line' : 'short-line'}`}>
                {index === 0 && <span className="label">12PM</span>}
                {index === 6 && <span className="label">6PM</span>}
              </div>
              <div className={`hour-square ${isFilled(hour, 'pm') ? 'filled' : ''}`}></div>
            </React.Fragment>
          ))}
          <div className="line tall-line"></div>
        </div>
      </div>
    </div>
  );
};

export default TimeDial;
