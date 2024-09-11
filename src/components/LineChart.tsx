import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

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

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      fill: boolean;
    }[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Cases Over Time</h3>
      <div className="sm:h-80">
        <Line data={data} />
      </div>
    </div>
  );
};

export default LineChart;
