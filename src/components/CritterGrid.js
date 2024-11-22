import '../assets/stylesheets/CritterGrid.css';
import '../assets/stylesheets/ThemedSpinner.css';
import { useEffect, useState } from "react";
import CritterModal from "./CritterModal";
import { fetchConfig } from "../utils/fetchConfig";
import axios from "axios";
import allCrittersImg from '../assets/images/all-critters.png';
import bugsImg from '../assets/images/bugs.png';
import fishImg from '../assets/images/fish.png';
import seaCreaturesImg from '../assets/images/sea-creatures.png';
import ThemedSpinner from './ThemedSpinner';

const CritterGrid = ({ hemisphere, month, timeOfDay, minute }) => {
  const [critters, setCritters] = useState([]);
  const [selectedCritter, setSelectedCritter] = useState(null);
  const [filter, setFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true); 

  const openModal = (critter) => setSelectedCritter(critter);
  const closeModal = () => setSelectedCritter(null);

  const isTimeWithinRange = (timeRange, timeOfDay, minute) => {
    let userHour24 = parseInt(timeOfDay, 10);
    try {
      const [startStr, endStr] = timeRange.split(" – ");
      const [time1, period1] = startStr.split(" ");
      const [time2, period2] = endStr.split(" ");
      let hour24_start = period1 === "PM" && time1 !== "12" ? parseInt(time1, 10) + 12 : parseInt(time1, 10) % 12;
      let hour24_end = period2 === "PM" && time2 !== "12" ? parseInt(time2, 10) + 12 : parseInt(time2, 10) % 12;

      if (userHour24 === hour24_end && minute > 0) {
        return false;
      }
      return hour24_start <= hour24_end ? userHour24 >= hour24_start && userHour24 <= hour24_end
                                        : userHour24 >= hour24_start || userHour24 <= hour24_end;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const backendURL = await fetchConfig();
      try {
        const [bugResponse, fishResponse, seaCreatureResponse] = await Promise.all([
          axios.get(`${backendURL}/bugs`),
          axios.get(`${backendURL}/fish`),
          axios.get(`${backendURL}/sea-creatures`)
        ]);

        const bugs = bugResponse.data.critters.map(critter => ({ ...critter, type: "bug" }));
        const fish = fishResponse.data.critters.map(critter => ({ ...critter, type: "fish" }));
        const seaCreatures = seaCreatureResponse.data.critters.map(critter => ({ ...critter, type: "sea-creature" }));

        let combinedCritters = [...bugs, ...fish, ...seaCreatures];

        if (hemisphere && month !== null && timeOfDay !== null) {
          combinedCritters = combinedCritters.filter(critter => {
            const availability = hemisphere === "Northern Hemisphere" ? critter.north : critter.south;
            const availableMonths = availability.months_array;
            const availableTimeOfDay = availability.times_by_month[month.toString()];
            return availableMonths.includes(month) && (
              availableTimeOfDay === "All day" || 
              availableTimeOfDay?.split(" & ").some(range => isTimeWithinRange(range, timeOfDay, minute))
            );
          });
        }

        setCritters(combinedCritters);
      } catch (error) {
        console.error("Error fetching critter data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [hemisphere, month, timeOfDay, minute]);

  const filteredCritters = critters.filter(critter => {
    if (filter === "All") return true;
    if (filter === "Bugs") return critter.type === "bug";
    if (filter === "Fish") return critter.type === "fish";
    if (filter === "Sea Creatures") return critter.type === "sea-creature";
    return false;
  });

  return (
    <div className="critter-grid-container">
      {/* Tab Filter */}
      <div className="filter-tabs">
        <img src={allCrittersImg} alt="All" onClick={() => setFilter("All")} className={filter === "All" ? "active" : ""} />
        <img src={bugsImg} alt="Bugs" onClick={() => setFilter("Bugs")} className={filter === "Bugs" ? "active" : ""} />
        <img src={fishImg} alt="Fish" onClick={() => setFilter("Fish")} className={filter === "Fish" ? "active" : ""} />
        <img src={seaCreaturesImg} alt="Sea Creatures" onClick={() => setFilter("Sea Creatures")} className={filter === "Sea Creatures" ? "active" : ""} />
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="critter-grid-loading">
          <ThemedSpinner  /> 
        </div>
      ) : (
        <div className="critter-grid">
          {filteredCritters.map((critter, index) => (
            <div
              key={index}
              className="critter-card"
              onClick={() => openModal(critter)}
            >
              <img src={critter.image_url} alt={critter.name} />
              <span className="tooltip">{critter.name}</span>
            </div>
          ))}
        </div>
      )}

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
