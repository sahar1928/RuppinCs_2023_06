// import React, { useState, useEffect } from "react";
// import '../style/Distance.css';
// import citydata from '../citydata.json';
// import Button from '@mui/material/Button';



// const DistanceCalculator = (EmployerLocation,CandidateLocation) => {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [distance, setDistance] = useState("");
//   const apiKey = '5b3ce3597851110001cf624846932ce2f5f840f794bee305a9244e2f';

//   useEffect(() => {
//     setOrigin(citydata.cityNames[0].city);
//     setDestination(citydata.cityNames[1].city);
//   }, []);


//   function handleOriginChange(event) {
//     setOrigin(event.target.value);
//   }

//   function handleDestinationChange(event) {
//     setDestination(event.target.value);
//   }

//   function handleCalculateDistance() {
//     const originCity = citydata.cityNames.find(city => city.city === origin);
//     const destinationCity = citydata.cityNames.find(city => city.city === destination);
//     const originUrl = `https://nominatim.openstreetmap.org/search?q=${originCity.lat},${originCity.lng}&format=json&addressdetails=1&limit=1`;
//     const destinationUrl = `https://nominatim.openstreetmap.org/search?q=${destinationCity.lat},${destinationCity.lng}&format=json&addressdetails=1&limit=1`;

//     Promise.all([fetch(originUrl), fetch(destinationUrl)])
//       .then((responses) => Promise.all(responses.map((response) => response.json())))
//       .then((data) => {
//         const originLat = data[0][0].lat;
//         const originLon = data[0][0].lon;
//         const destinationLat = data[1][0].lat;
//         const destinationLon = data[1][0].lon;

//         const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originLon},${originLat}&end=${destinationLon},${destinationLat}`;

//         fetch(url)
//           .then((response) => response.json())
//           .then((data) => {
//             const distanceInMeters = data.features[0].properties.segments[0].distance;
//             const distanceInKilometers = distanceInMeters / 1000;
//             setDistance(distanceInKilometers.toFixed(2));
//           })
//           .catch((error) => console.error(error));
//       })
//       .catch((error) => console.error(error));
//   }


//   return (
//     <div className="map-container">
//       <div className="distance-calculator">
//         <div>
//           <h2>Distance Calculator</h2>
//           <label htmlFor="origin">Origin:</label>
//           <select id="origin" value={origin} onChange={handleOriginChange}>
//             {citydata.cityNames.map(city => (
//               <option key={city.city} value={city.city}>{city.city}</option>
//             ))}
//           </select>

//         </div>
//         <div>
//           <label htmlFor="destination">Destination:</label>
//           <select id="destination" value={destination} onChange={handleDestinationChange}>
//             {citydata.cityNames.map(city => (
//               <option key={city.city} value={city.city}>{city.city}</option>
//             ))}
//           </select>
//         </div>
//         <Button variant="outlined" onClick={handleCalculateDistance}>Calculate Distance</Button>
//         {distance && <p>The distance between {origin} and {destination} is {distance} km.</p>}
//       </div>
//     </div>
//   );
// }

// export default DistanceCalculator;
