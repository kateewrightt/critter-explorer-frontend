import { useState } from "react";
import '../../assets/stylesheets/CitySearch.css';
import { AsyncPaginate } from "react-select-async-paginate";
import { components } from "react-select";
import Critter from "../critter/CritterGrid";
import InfoBar from "./InfoBar";
import { fetchConfig } from "../../utils/fetchConfig";
import { FaSearch } from 'react-icons/fa'; 
import axios from "axios";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [cityDateTime, setCityDateTime] = useState(null);
  const [hemisphere, setHemisphere] = useState(null);
  const [monthNum, setMonthNum] = useState("");
  const [userTime, setUserTime] = useState(null);
  const [minute, setMinute] = useState(null);
  const [formattedDateTime, setFormattedDateTime] = useState("");

  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <FaSearch
        style={{
          color: "#c1c1c1",
          position: "absolute",
          right: "16px",
          top: "50%",
          fontSize: "0.8em",
          transform: "translateY(-50%)",
          pointerEvents: "none"
        }}
      />
    </components.DropdownIndicator>
  );

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);

    if (searchData && searchData.value) {
      setHemisphere(
        searchData.latitude > 0 ? "Northern Hemisphere" : "Southern Hemisphere"
      );
      fetchCityDateTime(searchData.value);
    } else {
      clearSearch();
    }
  };

  const clearSearch = () => {
    setSearch(null);
    setCityDateTime(null);
    setHemisphere(null);
    setMonthNum("");
    setUserTime(null);
    setFormattedDateTime("");
    onSearchChange(null);
  };

  const loadOptions = async (inputValue) => {
    if (inputValue.length < 1) {
      return Promise.resolve({ options: [] });
    }
    try {
      const backendURL = await fetchConfig();
      const response = await axios.get(
        `${backendURL}/citySearch?query=${inputValue}`
      );
      const { options } = response.data;

      return { options };
    } catch (error) {
      console.error("Error fetching search results:", error);
      return Promise.resolve({ options: [] });
    }
  };

  const fetchCityDateTime = async (cityId) => {
    try {
      const backendURL = await fetchConfig();
      const response = await axios.get(
        `${backendURL}/cityDateTime/${cityId}/dateTime`
      );
      const { cityDateTime } = response.data;

      const [datePart, timePart] = cityDateTime.split("T");
      const [year, month, day] = datePart.split("-");
      const [hour, minute] = timePart.split(":");

      const months = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
      ];
      const monthName = months[parseInt(month, 10) - 1];

      const hourInt = parseInt(hour, 10);
      const minuteInt = parseInt(minute, 10);
      const amPm = hourInt >= 12 ? "PM" : "AM";
      const formattedHour = hourInt % 12 || 12;

      const formattedDateTime = `${monthName} ${parseInt(day)} at ${formattedHour}:${minute} ${amPm}`;
      setCityDateTime(cityDateTime);
      setFormattedDateTime(formattedDateTime);
      setMonthNum(parseInt(month, 10));
      setUserTime(hourInt);
      setMinute(minuteInt);
    } catch (error) {
      console.error("Error fetching city date and time:", error);
    }
  };

  return (
    <div className="search-bar">
      <AsyncPaginate
        classNamePrefix="custom"
        components={{ DropdownIndicator: CustomDropdownIndicator }}
        styles={{
          control: (provided) => ({
            ...provided,
            backgroundColor: "#f9f3d2",
            borderColor: "#c1c1c1",
            color: "#4a442e",
            paddingLeft: "8px",
          }),
          placeholder: (provided) => ({
            ...provided,
            color: "#4a442e",
          }),
          singleValue: (provided) => ({
            ...provided,
            color: "#4a442e",
          }),
          input: (provided) => ({
            ...provided,
            color: "#4a442e",
            textAlign: "center",
          }),
          menu: (provided) => ({
            ...provided,
            backgroundColor: "#fffbe6",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#dace94" : "#fffbe6",
            color: state.isSelected ? "#ffffff" : "#4a442e",
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            display: "none",
          }),
          loadingIndicator: (provided) => ({
            ...provided,
            paddingRight: "20px",
          }),
        }}
        placeholder="Search for City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
      <InfoBar
        search={search}
        formattedDateTime={formattedDateTime}
        hemisphere={hemisphere}
        clearSearch={clearSearch}
      />
      <div className="critter-grid">
        <Critter
          hemisphere={hemisphere}
          month={monthNum}
          timeOfDay={userTime}
          minute={minute}
        />
      </div>
    </div>
  );
};

export default Search;