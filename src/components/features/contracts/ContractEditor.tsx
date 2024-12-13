'use client'

import { useState, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { 
  Save,
  History,
  Download,
  FileSignature,
  Users,
  Lock,
  Eye,
  Settings
} from 'lucide-react'

interface ContractVersion {
  id: string
  version: number
  date: string
  author: string
  changes: string
}

interface ContractEditorProps {
  contractId: string
  initialContent: string
  onSave: (content: string) => void
}

export default function ContractEditor({ contractId, initialContent, onSave }: ContractEditorProps) {
  const editorRef = useRef<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showVersions, setShowVersions] = useState(false)
  const [currentVersion, setCurrentVersion] = useState(1)

  const [versions] = useState<ContractVersion[]>([
    {
      id: '1',
      version: 1,
      date: '13/12/2024 14:30',
      author: 'Roberto Souza',
      changes: 'Versão inicial do contrato'
    },
    {
      id: '2',
      version: 2,
      date: '13/12/2024 15:45',
      author: 'Maria Silva',
      changes: 'Atualização das cláusulas 3 e 4'
    }
  ])

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent()
      onSave(content)
      setIsEditing(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Editor Toolbar */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-tippay-gray-800">
              Contrato de Empréstimo Europeu v{currentVersion}
            </h2>
            <span className="px-3 py-1 bg-tippay-light text-tippay-primary text-sm rounded-full">
              Rascunho
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-tippay-primary text-white rounded-lg hover:bg-tippay-secondary"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 border border-tippay-primary text-tippay-primary rounded-lg hover:bg-tippay-light"
              >
                <FileSignature className="w-4 h-4" />
                <span>Editar</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Toolbar */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowVersions(!showVersions)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <History className="w-4 h-4" />
              <span>Histórico de Versões</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Users className="w-4 h-4" />
              <span>Compartilhar</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Lock className="w-4 h-4" />
              <span>Permissões</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Eye className="w-4 h-4" />
              <span>Visualizar</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 divide-x">
        {/* Version History Sidebar */}
        {showVersions && (
          <div className="col-span-3 p-4 bg-gray-50">
            <h3 className="font-medium text-gray-900 mb-4">Histórico de Versões</h3>
            <div className="space-y-4">
              {versions.map((version) => (
                <button
                  key={version.id}
                  onClick={() => setCurrentVersion(version.version)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    currentVersion === version.version
                      ? 'border-tippay-primary bg-white'
                      : 'border-gray-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">Versão {version.version}</span>
                    <span className="text-sm text-gray-500">{version.date}</span>
                  </div>
                  <p className="text-sm text-gray-600">{version.author}</p>
                  <p className="text-sm text-gray-500 mt-1">{version.changes}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Editor Content */}
        <div className={`${showVersions ? 'col-span-9' : 'col-span-12'} p-6`}>
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue={initialContent}
            disabled={!isEditing}
            init={{
              height: 'calc(100vh - 250px)',
              menubar: isEditing,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: isEditing ? 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' : false,
              content_style: `
                body { 
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  font-size: 14px;
                  line-height: 1.6;
                  padding: 20px;
                }
              `,
              branding: false,
              statusbar: isEditing,
              readonly: !isEditing
            }}
          />
        </div>
      </div>
    </div>
  )
} 