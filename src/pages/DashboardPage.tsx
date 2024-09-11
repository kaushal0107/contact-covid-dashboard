import React from 'react';
import { useGlobalCovidData, useHistoricalCovidData, useCountryCovidData } from '../hooks/useCovidData';
import GlobalStats from '../components/GlobalStats';
import LineChart from '../components/LineChart';
import CovidMap from '../components/CovidMap';

const DashboardPage = () => {
  const { data: globalData } = useGlobalCovidData();
  const { data: countryData } = useCountryCovidData();
  const { data: historicalData } = useHistoricalCovidData();

  const lineChartData = {
    labels: historicalData?.cases ? Object.keys(historicalData.cases) : [],
    datasets: [
      {
        label: 'Cases',
        data: historicalData?.cases ? Object.values(historicalData.cases).map(value => Number(value)) : [],
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {globalData && <GlobalStats data={globalData} />}
      <LineChart data={lineChartData} />
      {countryData && <CovidMap data={countryData} />}
    </div>
  );
};

export default DashboardPage;
