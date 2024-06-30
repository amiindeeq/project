// src/components/LineChart.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart: React.FC = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,  // Adjust this value for more or less smoothing
      },
    ],
  };

  const options:any = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        cubicInterpolationMode: 'monotone', // Smooths the line
      },
    },
  };

  return (
    <div className="relative h-64">
      <Line data={data} options={options}  />
    </div>
  );
}

export default LineChart;
