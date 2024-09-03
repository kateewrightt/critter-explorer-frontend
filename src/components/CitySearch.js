import { useState, useEffect } from "react";
import "../App.css";
import { AsyncPaginate } from "react-select-async-paginate";
import { Row, Col } from "reactstrap";
import Critter from "./CritterGrid";
import { fetchConfig } from "../utils/fetchConfig";
import axios from "axios";

// Search component so the user can easily search for cities
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [cityDateTime, setCityDateTime] = useState(null);
  const [hemisphere, setHemisphere] = useState(null);
  const [userTime, setUserTime] = useState(null);
  const [monthNum, setMonthNum] = useState("");
  const [datePart, setDatePart] = useState("");
  const [timePart, setTimePart] = useState("");

  // When the user starts typing in the search bar we get the data
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);

    if (searchData && searchData.value) {
      setHemisphere(
        searchData.latitude > 0 ? "Northern Hemisphere" : "Southern Hemisphere"
      );
      fetchCityDateTime(searchData.value);
    } else {
      setCityDateTime(null);
      setHemisphere(null);
    }
  };

  // Uses api to provide user city options, makes sure we cant receieve an invalid city
  const loadOptions = async (inputValue) => {
    if (inputValue.length < 1) {
      return Promise.resolve({ options: [] });
    }
    try {
      const backendURL = await fetchConfig();
      const response = await axios.get(
        `http://${backendURL}/citySearch?query=${inputValue}`
      );
      const { options } = response.data;

      return { options };
    } catch (error) {
      console.error("Error fetching search results:", error);
      return Promise.resolve({ options: [] });
    }
  };

  // Gets the date and time of the user's chosen city
  const fetchCityDateTime = async (cityId) => {
    try {
      const backendURL = await fetchConfig();
      const response = await axios.get(
        `http://${backendURL}/cityDateTime/${cityId}/dateTime`
      );
      const { cityDateTime } = response.data;
      const parts = cityDateTime.split("T");
      setDatePart(parts[0].split("-").reverse().join("-"));
      setTimePart(parts[1].split(".")[0]);
    } catch (error) {
      console.error("Error fetching city date and time:", error);
    }
  };

  // Use Effect to update monthNum and userTime when datePart or timePart changes
  useEffect(() => {
    const [year, month, day] = datePart.split("-");
    const [hours, minutes, seconds] = timePart.split(":");
    const cityDate = new Date(year, month - 1, day, hours, minutes, seconds);

    setMonthNum(cityDate.getMonth() + 1);
    setUserTime(cityDate.getHours());
  }, [datePart, timePart]);

  // Displays the Search Bar and DateTime Bubbles
  return (
    <div className="justify-content-center">
      <AsyncPaginate
        placeholder="Search for City"
        debounceTimeout={600} // Debounce to avoid 429 errors
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
      <Row>
        {datePart && (
          <>
            <Col>
              <div className="rounded-box">
                <p style={{ marginTop: "4%" }}>{search.label}</p>
              </div>
            </Col>
            <Col>
              <div className="rounded-box">
                <p style={{ marginTop: "4%" }}>
                  {datePart} {timePart}
                </p>
              </div>
            </Col>
            <Col>
              <div className="rounded-box">
                <p style={{ marginTop: "4%" }}>{hemisphere}</p>
              </div>
            </Col>
          </>
        )}
      </Row>
      <Row>
        <>
          <Critter
            hemisphere={hemisphere}
            month={monthNum}
            timeOfDay={userTime}
          />
        </>
      </Row>
    </div>
  );
};

export default Search;
