import React from "react";
import '../../../assets/stylesheets/Calendar.css';

const months = [
  "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
];

const MonthCalendar = ({ northernMonthsArray = [], southernMonthsArray = [], currentMonth }) => (
  <div className="availability-grid">
    {northernMonthsArray.length > 0 && southernMonthsArray.length > 0 ? (
      <>
        <div className="hemisphere-section">
          <div className="month-grid">
            {months.map((month, index) => (
              <div
                key={`north-${month}`}
                className={`calendar-item 
                  ${northernMonthsArray.includes(index + 1) ? "active" : "inactive"} 
                  ${currentMonth === index + 1 ? "current-month" : ""}`}
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
                className={`calendar-item 
                  ${southernMonthsArray.includes(index + 1) ? "active" : "inactive"} 
                  ${currentMonth === index + 1 ? "current-month" : ""}`}
              >
                {month}
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      <div className="hemisphere-section">
        <div className='subheader'>{northernMonthsArray.length > 0 ? "North" : "South"}</div>
        <div className="month-grid">
          {months.map((month, index) => (
            <div
              key={month}
              className={`calendar-item 
                ${(northernMonthsArray.length ? northernMonthsArray : southernMonthsArray).includes(index + 1) ? "active" : "inactive"} 
                ${currentMonth === index + 1 ? "current-month" : ""}`}
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