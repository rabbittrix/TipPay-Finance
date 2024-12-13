'use client'

import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageSelector() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-gray-500" />
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-transparent text-sm text-gray-600 focus:outline-none"
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
  )
} 