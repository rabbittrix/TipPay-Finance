'use client'

import Image from 'next/image'

interface PaymentCardProps {
  type: 'mastercard'
  number: string
  name: string
  balance: number
  color: 'silver' | 'gold'
}

export default function PaymentCard({
  type,
  number,
  name,
  balance,
  color
}: PaymentCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 ${
        color === 'silver' 
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
          ${balance.toFixed(2)}
        </span>
      </div>

      {/* Card Details */}
      <div className="flex justify-between items-end">
        <div className="text-white">
          <p className="text-lg mb-1">{name}</p>
          <p className="font-mono">{number}</p>
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
  )
} 