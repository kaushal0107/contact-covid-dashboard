import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface CovidMapProps {
  data: {
    countryInfo: {
      _id: string;
      lat: number;
      long: number;
    };
    country: string;
    cases: number;
    recovered: number;
    deaths: number;
  }[];
}

const CovidMap: React.FC<CovidMapProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        COVID-19 Map
      </h3>
      <div className="h-96 w-full">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={2}
          className="h-full w-full z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((country) => (
            <Marker
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <b>{country.country}</b>
                <p>Cases: {country.cases.toLocaleString()}</p>
                <p>Recovered: {country.recovered.toLocaleString()}</p>
                <p>Deaths: {country.deaths.toLocaleString()}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CovidMap;
