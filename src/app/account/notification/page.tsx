'use client'

import { useState } from 'react'
import { Switch } from '@headlessui/react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'

const tabs = ['Account', 'Security', 'Payment Methods', 'Notification']

interface NotificationSetting {
  id: string
  title: string
  enabled: boolean
}

export default function NotificationPage() {
  const [activeTab, setActiveTab] = useState('Notification')
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'announcements',
      title: 'Announcements',
      enabled: true
    },
    {
      id: 'send_payment',
      title: 'Send payment',
      enabled: true
    },
    {
      id: 'receive_payment',
      title: 'Receive a payment',
      enabled: true
    },
    {
      id: 'request_payment',
      title: 'Request payment',
      enabled: true
    },
    {
      id: 'payment_problem',
      title: 'Have a problem with a payment',
      enabled: false
    },
    {
      id: 'special_offers',
      title: 'Special Offers',
      enabled: true
    }
  ])

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ))
  }

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
                <div className="space-y-6">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-700">{notification.title}</span>
                      <Switch
                        checked={notification.enabled}
                        onChange={() => toggleNotification(notification.id)}
                        className={`${
                          notification.enabled ? 'bg-green-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                      >
                        <span
                          className={`${
                            notification.enabled ? 'translate-x-6' : 'translate-x-1'
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 