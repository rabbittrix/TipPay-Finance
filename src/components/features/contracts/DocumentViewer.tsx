'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Document, Page } from 'react-pdf'
import { Worker } from '@react-pdf-viewer/core'

interface DocumentViewerProps {
  document: {
    id: string
    name: string
    type: string
  }
  onClose: () => void
}

export default function DocumentViewer({ document, onClose }: DocumentViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-lg flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">{document.name}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {document.type === 'pdf' ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Document
                file={`/api/documents/${document.id}`}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </Worker>
          ) : (
            <iframe
              src={`/api/documents/${document.id}`}
              className="w-full h-full border-0"
              title={document.name}
            />
          )}
        </div>

        {document.type === 'pdf' && (
          <div className="p-4 border-t flex items-center justify-center gap-4">
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {pageNumber} de {numPages}
            </span>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
              className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 