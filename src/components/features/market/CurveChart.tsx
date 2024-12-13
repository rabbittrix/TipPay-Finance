'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function CurveChart() {
  const data = {
    labels: ['1W', '2W', '1M', '2M', '3M', '6M', '9M', '12M'],
    datasets: [
      {
        label: 'Curva de Rendimento',
        data: [-0.45, -0.43, -0.41, -0.38, -0.35, -0.30, -0.25, -0.20],
        borderColor: '#008000', // TipPay primary
        backgroundColor: 'rgba(0, 128, 0, 0.1)', // TipPay primary with opacity
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#008000',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
        padding: 12,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#616161',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#616161',
        }
      },
    },
  }

  return (
    <div className="h-[300px]">
      <Line data={data} options={options} />
    </div>
  )
} 