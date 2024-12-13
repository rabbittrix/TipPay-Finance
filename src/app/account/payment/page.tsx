'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const tabs = ['Account', 'Security', 'Payment Methods', 'Notification']

interface PaymentCard {
  id: string
  type: 'mastercard'
  number: string
  name: string
  balance: number
  color: 'silver' | 'gold'
}

export default function PaymentMethodsPage() {
  const [activeTab, setActiveTab] = useState('Payment Methods')
  const [cards] = useState<PaymentCard[]>([
    {
      id: '1',
      type: 'mastercard',
      number: '•••• •••• •••• 0000',
      name: 'Karthik',
      balance: 110.00,
      color: 'silver'
    },
    {
      id: '2',
      type: 'mastercard',
      number: '•••• •••• •••• 0000',
      name: 'Karthik Kat',
      balance: 110.00,
      color: 'gold'
    }
  ])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="border-b">
                <div className="flex gap-4 px-6">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      className={`py-4 px-2 border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-green-600 text-green-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium mb-6">Linked Payment system</h3>
                
                <div className="space-y-6">
                  {/* Payment Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {cards.map((card) => (
                      <div
                        key={card.id}
                        className={`relative rounded-2xl p-6 ${
                          card.color === 'silver' 
                            ? 'bg-gradient-to-br from-gray-300 to-gray-100' 
                            : 'bg-gradient-to-br from-yellow-400 to-yellow-200'
                        }`}
                      >
                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-8">
                          <Image
                            src="/tippay-logo-white.svg"
                            alt="TipPay"
                            width={80}
                            height={24}
                            className="opacity-80"
                          />
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-white/20 rounded-full" />
                            <div className="w-6 h-6 bg-white/20 rounded-full" />
                          </div>
                        </div>

                        {/* Card Balance */}
                        <div className="text-white mb-8">
                          <span className="text-2xl font-bold">
                            ${card.balance.toFixed(2)}
                          </span>
                        </div>

                        {/* Card Details */}
                        <div className="flex justify-between items-end">
                          <div className="text-white">
                            <p className="text-lg mb-1">{card.name}</p>
                            <p className="font-mono">{card.number}</p>
                          </div>
                          <Image
                            src="/mastercard-logo.svg"
                            alt="Mastercard"
                            width={48}
                            height={32}
                            className="opacity-90"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Small Card Icons */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-10 bg-blue-600 rounded flex items-center justify-center">
                      <Image
                        src="/paypal-logo.svg"
                        alt="PayPal"
                        width={32}
                        height={20}
                      />
                    </div>
                    <div className="w-16 h-10 bg-blue-100 rounded flex items-center justify-center">
                      <Image
                        src="/blockchain-logo.svg"
                        alt="Blockchain"
                        width={32}
                        height={20}
                      />
                    </div>
                    <button className="w-16 h-10 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 