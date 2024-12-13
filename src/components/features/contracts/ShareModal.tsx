'use client'

import { useState } from 'react'
import { X, Mail, Users, Link } from 'lucide-react'

interface ShareModalProps {
  onClose: () => void
}

export default function ShareModal({ onClose }: ShareModalProps) {
  const [email, setEmail] = useState('')
  const [shareType, setShareType] = useState<'email' | 'user' | 'link'>('email')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Compartilhar Documento</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setShareType('email')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border ${
                shareType === 'email' ? 'border-tippay-primary bg-tippay-light' : 'border-gray-200'
              }`}
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setShareType('user')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border ${
                shareType === 'user' ? 'border-tippay-primary bg-tippay-light' : 'border-gray-200'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Usuários</span>
            </button>
            <button
              onClick={() => setShareType('link')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border ${
                shareType === 'link' ? 'border-tippay-primary bg-tippay-light' : 'border-gray-200'
              }`}
            >
              <Link className="w-5 h-5" />
              <span>Link</span>
            </button>
          </div>

          {shareType === 'email' && (
            <div>
              <input
                type="email"
                placeholder="Digite o email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-tippay-primary focus:border-transparent"
              />
            </div>
          )}

          {shareType === 'user' && (
            <div>
              <input
                type="text"
                placeholder="Buscar usuários"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-tippay-primary focus:border-transparent"
              />
            </div>
          )}

          {shareType === 'link' && (
            <div className="flex gap-2">
              <input
                type="text"
                value="https://tippay.com/share/abc123"
                readOnly
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
              />
              <button className="px-4 py-2 bg-tippay-primary text-white rounded-lg hover:bg-tippay-secondary">
                Copiar
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button className="px-4 py-2 bg-tippay-primary text-white rounded-lg hover:bg-tippay-secondary">
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  )
} 