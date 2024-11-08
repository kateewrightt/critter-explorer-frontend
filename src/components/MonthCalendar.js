import React from "react";
import '../assets/stylesheets/CritterModal.css';

const months = [
  "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
];

const MonthCalendar = ({ northernMonthsArray = [], southernMonthsArray = [] }) => (
    <div className="availability-grid">
      {/* Render both hemispheres if both arrays are provided */}
      {northernMonthsArray.length > 0 && southernMonthsArray.length > 0 ? (
        <>
          <div className="hemisphere-section">
            <div className="month-grid">
              {months.map((month, index) => (
                <div
                  key={`north-${month}`}
                  className={`calendar-item ${northernMonthsArray.includes(index + 1) ? "active" : "inactive"}`}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
          <div className="hemisphere-section">
            <div className="month-grid">
              {months.map((month, index) => (
                <div
                  key={`south-${month}`}
                  className={`calendar-item ${southernMonthsArray.includes(index + 1) ? "active" : "inactive"}`}
                >
                  {month}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // Render only the available hemisphere array
        <div className="hemisphere-section">
          <div className='subheader'>{northernMonthsArray.length > 0 ? "Northern Hemisphere" : "Southern Hemisphere"}</div>
          <div className="month-grid">
            {months.map((month, index) => (
              <div
                key={month}
                className={`calendar-item ${(northernMonthsArray.length ? northernMonthsArray : southernMonthsArray).includes(index + 1) ? "active" : "inactive"}`}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
);
  
  
  export default MonthCalendar;
  