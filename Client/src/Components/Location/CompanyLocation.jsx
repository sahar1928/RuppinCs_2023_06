import React from 'react';
import citiesData from '../../Data/citydata.json';

function CompanyLocation({ selectedCity }) {
  const cityData = citiesData.find((data) => data.city === selectedCity);

  if (!cityData) {
    return null;
  }

  const { city, lat, lng } = cityData;

  const encodedName = encodeURIComponent(city);

  const mapURL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.8041443003613!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${encodedName}!5e0!3m2!1sen!2sus!4v1671361596282!5m2!1sen!2sus`;

  return (
    <div className="jm-candidate-profile-overview-portion">
      <div className="jm-company-sidebar-map">
        <iframe src={mapURL}></iframe>
      </div>
    </div>
  );
}

export default CompanyLocation;