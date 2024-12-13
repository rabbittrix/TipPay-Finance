'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Shield, Smartphone, Key, Lock } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const tabs = ['Account', 'Security', 'Payment Methods', 'Notification']

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState('Security')
  const [devices] = useState([
    {
      name: 'iPhone 13 Pro Max',
      location: 'New York City',
      date: 'June 20 at 14:00'
    },
    {
      name: 'iPad Pro',
      location: 'New York City',
      date: 'June 20 at 14:00'
    },
    {
      name: 'iMac OSX',
      location: 'New York City',
      date: 'June 20 at 14:00'
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
                {/* Two Factor Authentication Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h3 className="text-lg font-medium">Two Factor Authentication</h3>
                    </div>
                    <button className="text-green-600 bg-green-50 px-4 py-1 rounded-full text-sm">
                      Enable
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Two Factor Authentication (2FA) can be used to help protect your account
                  </p>
                </div>

                {/* Change Password Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    You can always change your password for security reasons or reset your password in case you forgot it.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Current password
                      </label>
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        New password
                      </label>
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Confirm New password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm New password"
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                      Update password
                    </button>
                    <button className="text-green-600 text-sm hover:underline">
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Additional Security Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Additional security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">SMS recovery</p>
                          <p className="text-sm text-gray-600">Number ending with 1234</p>
                        </div>
                      </div>
                      <button className="text-green-600 font-medium">
                        Disable SMS
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Key className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">Authentication App</p>
                          <p className="text-sm text-gray-600">Google Authenticator</p>
                        </div>
                      </div>
                      <button className="text-green-600 font-medium">
                        Configure
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-medium">SSL Certificate</p>
                          <p className="text-sm text-gray-600">Secure Sockets Layer</p>
                        </div>
                      </div>
                      <button className="text-green-600 font-medium">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                {/* Your Devices Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Your devices</h3>
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      Log out of all devices
                    </button>
                  </div>
                  <div className="space-y-4">
                    {devices.map((device, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <p className="text-sm text-gray-600">
                              {device.location} • {device.date}
                            </p>
                          </div>
                        </div>
                        <button className="text-gray-600 hover:text-gray-900">
                          Log out
                        </button>
                      </div>
                    ))}
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