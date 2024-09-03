// import "../App.css";
// import React, { useState, useEffect } from "react";
// import { fetchConfig } from "../utils/fetchConfig";

// // Page Count fetches the /pageCount endpoint and displays the current number of site visits
// function PageCount() {
//   const [pageCount, setPageCount] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const backendURL = await fetchConfig();

//       try {
//         const response = await fetch(`http://${backendURL}/pageCount`);
//         const data = await response.json();
//         setPageCount(data.pageCount);
//       } catch (error) {
//         console.error("Error fetching page count:", error);
//       }
//     }

//     fetchData();
//   }, []); // This useEffect runs only once when the component mounts

//   return <p className="small-rounded-box">Page Count: {pageCount}</p>;
// }

// export default PageCount;
