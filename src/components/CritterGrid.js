import "../App.css";
import { useEffect, useState } from "react";
import BugModal from "./BugModal";
import { fetchConfig } from "../utils/fetchConfig";
import axios from "axios";

// Critter Grid Component
const Critter = ({ hemisphere, month, timeOfDay }) => {
  const [bugs, setBugs] = useState([]);
  const [selectedBug, setSelectedBug] = useState(null);

  // Check if a user has selected a bug or not - opens and closes the modal
  const openModal = (bug) => {
    setSelectedBug(bug);
  };
  const closeModal = () => {
    setSelectedBug(null);
  };

  // Calculates what bugs will be displayed on the screen, uses the user's date/time info and searches the nookipedia results
  const isTimeWithinRange = (timeRange, timeOfDay) => {
    let userHour24 = parseInt(timeOfDay, 10);

    try {
      const [startStr, endStr] = timeRange.split(" – ");
      const [time1, period1] = startStr.split(" ");
      const [time2, period2] = endStr.split(" ");

      let hour24_start = parseInt(time1, 10);
      if (period1 === "PM" && time1 !== 12) {
        hour24_start += 12;
      } else if (period1 === "AM" && time1 === 12) {
        hour24_start = 0;
      }

      let hour24_end = parseInt(time2, 10);
      if (period2 === "PM" && time2 !== 12) {
        hour24_end += 12;
      } else if (period2 === "AM" && time2 === 12) {
        hour24_end = 0;
      }

      if (hour24_start <= hour24_end) {
        return userHour24 >= hour24_start && userHour24 <= hour24_end;
      } else {
        return userHour24 >= hour24_start || userHour24 <= hour24_end;
      }
    } catch (error) {
      return false;
    }
  };

  // UseEffect so if the user changes data (searches another city) then the bugs are changed
  useEffect(() => {
    const fetchData = async () => {
      const backendURL = await fetchConfig();

      try {
        const response = await axios.get(`http://${backendURL}/critterGrid`);

        const data = response.data.critters;
        const filteredBugs = data.filter((bug) => {
          const availability =
            hemisphere === "Northern Hemisphere" ? bug.south : bug.north;
          const availableMonths = availability.months_array;
          const availableTimeOfDay =
            availability.times_by_month[month.toString()];

          let bugTime = [false];

          if (availableTimeOfDay?.includes("&")) {
            const [firstStr, secondStr] = availableTimeOfDay?.split(" & ");

            bugTime = isTimeWithinRange(firstStr, timeOfDay);
            if (bugTime !== true) {
              bugTime = isTimeWithinRange(secondStr, timeOfDay);
            }
          } else if (availableTimeOfDay?.includes("–")) {
            bugTime = isTimeWithinRange(availableTimeOfDay, timeOfDay);
          } else if (availableTimeOfDay === "All day") {
            bugTime = true;
          }
          return availableMonths.includes(month) && bugTime === true; // Displays only relevant bugs
        });
        setBugs(filteredBugs);
      } catch (error) {
        console.error("Error fetching bug data: ", error);
      }
    };
    fetchData();
  }, [hemisphere, month, timeOfDay]); // Useffect dependencies - if any of these change it rerenders

  //Displays the bug grid
  return (
    <div className="bug-grid">
      {bugs.map((bug, index) => (
        <div
          className="bug-card"
          key={bug.number}
          onClick={() => openModal(bug)}
        >
          <img src={bug.image_url} alt={bug.name} />
          <p>{bug.name}</p>
        </div>
      ))}

      <BugModal
        isOpen={!!selectedBug}
        onRequestClose={closeModal}
        bug={selectedBug}
      />
    </div>
  );
};

export default Critter;
