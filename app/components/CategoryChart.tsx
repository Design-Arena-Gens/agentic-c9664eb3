'use client'

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CategoryChart({ byCategory }: { byCategory: Record<string, number>; }) {
  const labels = Object.keys(byCategory);
  const data = {
    labels,
    datasets: [
      {
        label: 'Spending by Category',
        data: labels.map(l => byCategory[l] ?? 0),
        backgroundColor: 'rgba(59, 130, 246, 0.5)'
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false, text: 'Spending by Category' }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="rounded border bg-white p-4">
      <h2 className="text-lg font-medium mb-3">Spending by Category</h2>
      {labels.length === 0 ? (
        <div className="text-gray-500">No data yet.</div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
}
