'use client'

import { Switch as HeadlessSwitch } from '@headlessui/react'

interface SwitchProps {
  enabled: boolean
  onChange: () => void
  size?: 'sm' | 'md'
}

export default function Switch({ enabled, onChange, size = 'md' }: SwitchProps) {
  const sizes = {
    sm: {
      switch: 'h-5 w-9',
      dot: 'h-3 w-3',
      translate: enabled ? 'translate-x-4' : 'translate-x-1'
    },
    md: {
      switch: 'h-6 w-11',
      dot: 'h-4 w-4',
      translate: enabled ? 'translate-x-6' : 'translate-x-1'
    }
  }

  const currentSize = sizes[size]

  return (
    <HeadlessSwitch
      checked={enabled}
      onChange={onChange}
      className={`${
        enabled ? 'bg-green-600' : 'bg-gray-200'
      } relative inline-flex ${currentSize.switch} items-center rounded-full transition-colors focus:outline-none`}
    >
      <span
        className={`${
          currentSize.translate
        } inline-block ${currentSize.dot} transform rounded-full bg-white transition-transform`}
      />
    </HeadlessSwitch>
  )
} 