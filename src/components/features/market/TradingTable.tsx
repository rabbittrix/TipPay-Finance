'use client'

import { useState } from 'react'
import { 
  CheckCircle,
  Clock,
  Users,
  ChevronDown,
  MoreHorizontal 
} from 'lucide-react'

interface Trade {
  id: string
  maturity: string
  valueDate: string
  fixedRate: number
  floatingRate: string
  min: number
  max: number
  issuedTotal: number
  recipient: string
  status: 'submitted' | 'pending' | 'completed'
  expiry: string
}

export default function TradingTable() {
  const [trades] = useState<Trade[]>([
    {
      id: '1',
      maturity: '1 week',
      valueDate: 'T+1',
      fixedRate: -0.45,
      floatingRate: '-',
      min: 100000,
      max: 10000000,
      issuedTotal: 4,
      recipient: 'All Members',
      status: 'submitted',
      expiry: '21:00'
    },
    // Add more trades...
  ])

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            {[
              'Maturity',
              'Value Date',
              'Fixed Rate',
              'Floating Rate',
              'Min',
              'Max',
              'Issued/Total in Million',
              'Recipient',
              'Status',
              'Local Time Expiry',
              ''
            ].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
                {header && <ChevronDown className="inline-block w-4 h-4 ml-1" />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {trades.map((trade) => (
            <tr key={trade.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" className="rounded border-gray-300" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.maturity}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {trade.valueDate}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.fixedRate}%</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.floatingRate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.min.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.max.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{trade.issuedTotal}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  {trade.recipient}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {trade.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {trade.expiry}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 