import '../assets/stylesheets/CritterGrid.css';
import { useEffect, useState } from "react";
import CritterModal from "./CritterModal";
import { fetchConfig } from "../utils/fetchConfig"; 
import axios from "axios";

// CritterGrid component displays a grid of critters based on user-selected filters for hemisphere, month, and time of day.
const CritterGrid = ({ hemisphere, month, timeOfDay }) => {
  const [critters, setCritters] = useState([]); 
  const [selectedCritter, setSelectedCritter] = useState(null); 

  // Modal open and close handlers for displaying critter details
  const openModal = (critter) => setSelectedCritter(critter);
  const closeModal = () => setSelectedCritter(null);

  // Converts 12-hour time range to 24-hour format and checks if a given hour is within the range
  const isTimeWithinRange = (timeRange, timeOfDay) => {
    let userHour24 = parseInt(timeOfDay, 10);
    try {
      const [startStr, endStr] = timeRange.split(" – ");
      const [time1, period1] = startStr.split(" ");
      const [time2, period2] = endStr.split(" ");
      let hour24_start = period1 === "PM" && time1 !== "12" ? parseInt(time1, 10) + 12 : parseInt(time1, 10) % 12;
      let hour24_end = period2 === "PM" && time2 !== "12" ? parseInt(time2, 10) + 12 : parseInt(time2, 10) % 12;
      return hour24_start <= hour24_end ? userHour24 >= hour24_start && userHour24 <= hour24_end
                                        : userHour24 >= hour24_start || userHour24 <= hour24_end;
    } catch {
      return false;
    }
  };

  // Fetches and filters critter data from backend based on the selected hemisphere, month, and time.
  useEffect(() => {
    const fetchData = async () => {
      const backendURL = await fetchConfig();
      try {
        const [bugResponse, fishResponse, seaCreatureResponse] = await Promise.all([
          axios.get(`${backendURL}/bugs`),
          axios.get(`${backendURL}/fish`),
          axios.get(`${backendURL}/sea-creatures`)
        ]);
        const combinedCritters = [
          ...bugResponse.data.critters,
          ...fishResponse.data.critters,
          ...seaCreatureResponse.data.critters,
        ];
        setCritters(combinedCritters.filter(critter => {
          const availability = hemisphere === "Northern Hemisphere" ? critter.north : critter.south;
          const availableMonths = availability.months_array;
          const availableTimeOfDay = availability.times_by_month[month.toString()];
          return availableMonths.includes(month) && (
            availableTimeOfDay === "All day" || 
            availableTimeOfDay?.split(" & ").some(range => isTimeWithinRange(range, timeOfDay))
          );
        }));
      } catch (error) {
        console.error("Error fetching critter data: ", error);
      }
    };
    fetchData();
  }, [hemisphere, month, timeOfDay]);

  // Renders the critter grid with modal for critter details
  return (
    <div className="critter-grid">
      {critters.map((critter, index) => (
        <div
          key={index}
          className="critter-card"
          onClick={() => openModal(critter)}
        >
          <img src={critter.image_url} alt={critter.name} />
          <span className="tooltip">{critter.name}</span>
        </div>
      ))}

      <CritterModal
        isOpen={!!selectedCritter}
        onRequestClose={closeModal}
        critter={selectedCritter}
        hemisphere={hemisphere} 
      />
    </div>
  );
};

export default CritterGrid;
