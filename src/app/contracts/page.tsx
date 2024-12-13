'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { 
  Folder, 
  File, 
  Upload, 
  Share2, 
  Plus, 
  Search,
  MoreVertical,
  FileText,
  FilePdf,
  FileJson,
  FileSpreadsheet,
  FileCode
} from 'lucide-react'
import DocumentViewer from '@/components/features/contracts/DocumentViewer'
import ShareModal from '@/components/features/contracts/ShareModal'
import NewFolderModal from '@/components/features/contracts/NewFolderModal'

interface Document {
  id: string
  name: string
  type: string
  size: string
  modified: string
  folder: string
}

export default function ContractsPage() {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showNewFolderModal, setShowNewFolderModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FilePdf className="w-6 h-6 text-red-500" />
      case 'doc':
      case 'docx': return <FileText className="w-6 h-6 text-blue-500" />
      case 'csv': return <FileSpreadsheet className="w-6 h-6 text-green-500" />
      case 'json': return <FileJson className="w-6 h-6 text-yellow-500" />
      case 'xml': return <FileCode className="w-6 h-6 text-purple-500" />
      default: return <File className="w-6 h-6 text-gray-500" />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-tippay-gray-800">Contratos e Documentos</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowNewFolderModal(true)}
                  className="flex items-center gap-2 px-4 py-2 text-tippay-primary hover:bg-tippay-light rounded-lg"
                >
                  <Plus className="w-5 h-5" />
                  <span>Nova Pasta</span>
                </button>
                <label className="flex items-center gap-2 px-4 py-2 bg-tippay-primary text-white rounded-lg hover:bg-tippay-secondary cursor-pointer">
                  <Upload className="w-5 h-5" />
                  <span>Upload</span>
                  <input type="file" className="hidden" multiple accept=".doc,.docx,.pdf,.csv,.json,.xml" />
                </label>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-tippay-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Folders Sidebar */}
              <div className="col-span-3 bg-white rounded-xl shadow-sm p-4">
                <h2 className="font-medium text-tippay-gray-800 mb-4">Pastas</h2>
                <ul className="space-y-2">
                  <li>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-left rounded-lg hover:bg-tippay-light text-tippay-primary">
                      <Folder className="w-5 h-5" />
                      <span>Todos os Documentos</span>
                    </button>
                  </li>
                  {/* Add folder list here */}
                </ul>
              </div>

              {/* Documents List */}
              <div className="col-span-9 bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamanho</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Modificado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Document rows */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon('pdf')}
                          <span className="text-sm text-gray-900">Contrato_001.pdf</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">PDF</td>
                      <td className="px-6 py-4 text-sm text-gray-500">2.5 MB</td>
                      <td className="px-6 py-4 text-sm text-gray-500">13/12/2024 14:30</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowShareModal(true)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Share2 className="w-4 h-4 text-gray-500" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {/* Document Preview Modal */}
        {selectedDocument && (
          <DocumentViewer
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        )}

        {/* Share Modal */}
        {showShareModal && (
          <ShareModal
            onClose={() => setShowShareModal(false)}
          />
        )}

        {/* New Folder Modal */}
        {showNewFolderModal && (
          <NewFolderModal
            onClose={() => setShowNewFolderModal(false)}
          />
        )}
      </div>
    </div>
  )
} 