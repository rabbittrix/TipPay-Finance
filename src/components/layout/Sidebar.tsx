'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  SendHorizontal, 
  Download, 
  Users, 
  Bitcoin,
  Upload,
  LogOut,
  HelpCircle,
  User
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ArrowLeftRight, label: 'Transactions', href: '/transactions' },
  { icon: SendHorizontal, label: 'Pay', href: '/pay' },
  { icon: Download, label: 'Receive', href: '/receive' },
  { icon: ArrowLeftRight, label: 'Exchange', href: '/exchange' },
  { icon: Users, label: 'Recipients', href: '/recipients' },
  { icon: Bitcoin, label: 'Crypto', href: '/crypto' },
  { icon: Upload, label: 'Deposit Money', href: '/deposit' },
  { icon: Download, label: 'Withdraw Money', href: '/withdraw' },
  { icon: User, label: 'Account', href: '/account' },
  { icon: HelpCircle, label: 'Support', href: '/support' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-4">
        <Image
          src="/logo.svg"
          alt="TipPay Logo"
          width={120}
          height={40}
          className="mb-8"
        />
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-700"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-2">
            <span className="text-2xl font-bold text-green-600">$25</span>
          </div>
          <p className="text-sm text-gray-600">Invite your friend and get $25</p>
          <button className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
            Invite Now
          </button>
        </div>

        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <LogOut className="w-5 h-5" />
          <span>Quit</span>
        </button>
      </div>
    </aside>
  )
} 