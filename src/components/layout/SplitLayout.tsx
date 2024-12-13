'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

interface SplitLayoutProps {
  children: React.ReactNode
}

export default function SplitLayout({ children }: SplitLayoutProps) {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Panel */}
      <div className="hidden md:flex md:w-1/2 bg-[#E5E7EB] p-6 lg:p-12 flex-col justify-between relative">
        <div className="absolute top-4 right-4">
          <LanguageSelector />
        </div>
        
        <div>
          <Image
            src="/logo.svg"
            alt="TipPay Logo"
            width={120}
            height={40}
            className="mb-8 lg:mb-12"
          />
          <h1 className="text-3xl lg:text-4xl font-bold text-[#333333] mb-4 lg:mb-6">
            {t('marketing.title')}
          </h1>
          <p className="text-[#666666] text-base lg:text-lg mb-6 lg:mb-8">
            {t('marketing.subtitle')}
          </p>
        </div>
        
        <div className="space-y-4">
          {['security', 'analytics', 'support'].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <CheckCircle2 className="text-[#00A651] w-5 h-5" />
              <span className="text-[#333333]">{t(`marketing.features.${feature}`)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 bg-white p-6 lg:p-12">
        <div className="md:hidden mb-6">
          <LanguageSelector />
        </div>
        {children}
      </div>
    </div>
  )
} 