import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchGlobalData = async () => {
  const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
  return data;
};

export const useGlobalCovidData = () => {
  return useQuery({
    queryKey: ['globalCovidData'],
    queryFn: fetchGlobalData
  });
};

const fetchCountryData = async () => {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
    return data;
  };
  
  export const useCountryCovidData = () => {
    return useQuery({
      queryKey: ['countryCovidData'],
      queryFn: fetchCountryData
    });
  };

  const fetchHistoricalData = async () => {
    const { data } = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    return data;
  };
  
  export const useHistoricalCovidData = () => {
    return useQuery({
      queryKey: ['historicalCovidData'],
      queryFn: fetchHistoricalData
    });
  };