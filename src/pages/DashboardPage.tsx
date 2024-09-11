import React from 'react';
import { useGlobalCovidData, useHistoricalCovidData, useCountryCovidData } from '../hooks/useCovidData';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,    // For x-axis categorical scales
  LinearScale,      // For y-axis linear scales
  PointElement,     // For points on the line chart
  LineElement,      // For the line itself
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const { data: globalData } = useGlobalCovidData();
  const { data: countryData } = useCountryCovidData();
  const { data: historicalData } = useHistoricalCovidData();

  const lineChartData = {
    labels: historicalData?.cases ? Object.keys(historicalData.cases) : [],
    datasets: [
      {
        label: 'Cases',
        data: historicalData?.cases ? Object.values(historicalData.cases) : [],
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
    {/* <h2 className="text-3xl font-extrabold text-gray-900 text-center">COVID-19 Global Dashboard</h2> */}
  
    {/* Global Stats */}
    {globalData && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Cases</h3>
            <p className="text-lg text-gray-700">{globalData.cases.toLocaleString()}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Deaths</h3>
            <p className="text-lg text-gray-700">{globalData.deaths.toLocaleString()}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">Recovered</h3>
            <p className="text-lg text-gray-700">{globalData.recovered.toLocaleString()}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12l5 5L20 7" />
            </svg>
          </div>
        </div>
      </div>
    )}
  

      {/* Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Cases Over Time</h3>
        <div className="sm:h-80">
          <Line data={lineChartData} />
        </div>
      </div>

      {/* Map */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">COVID-19 Map</h3>
        <div className="h-96 w-full">
          <MapContainer center={[51.505, -0.09]} zoom={2} className="h-full w-full z-0">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {countryData?.map((country: any) => (
              <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
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
    </div>
  );
};

export default DashboardPage;
