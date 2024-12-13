'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Pencil } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'

const tabs = ['Account', 'Security', 'Payment Methods', 'Notification']

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('Account')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <Image
                  src="https://picsum.photos/100"
                  alt="Profile"
                  width={100}
                  height={100}
                  className="rounded-full"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md">
                  <Pencil className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Roberto Souza</h2>
                <p className="text-green-600">Active</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-6">
              <div>
                <p className="mb-1">Account No:</p>
                <p className="font-medium">217723/987/349</p>
              </div>
              <div>
                <p className="mb-1">Pin No:</p>
                <p className="font-medium">0121</p>
              </div>
              <div>
                <p className="mb-1">Joined:</p>
                <p className="font-medium">13 Nov, 2024</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                <LogOut className="w-5 h-5" />
                Logout
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>

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
              <form className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value="Roberto Souza"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value="rabbitrix@hotmail.com"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Gender
                  </label>
                  <input
                    type="text"
                    value="Male"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value="10 May, 1985"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value="91094808"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Identity Type
                  </label>
                  <input
                    type="text"
                    value="National Id"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value="Portugal"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value="Lisboa"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value="Cadaval"
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </form>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-600 mb-4">Identity Documents</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">National Id</p>
                    <Image
                      src="https://picsum.photos/800/400"
                      alt="National ID"
                      width={800}
                      height={400}
                      className="w-full rounded-lg border"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Signature</p>
                    <Image
                      src="https://picsum.photos/800/400"
                      alt="Signature"
                      width={800}
                      height={400}
                      className="w-full rounded-lg border"
                    />
                  </div>
                </div>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Edit KYC
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 