'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import ContractEditor from '@/components/features/contracts/ContractEditor'

// Template de exemplo para contrato
const contractTemplate = `
<h1>EUROPEAN LOAN AGREEMENT</h1>

<p>THIS EUROPEAN LOAN AGREEMENT (the "Agreement") is made and entered into on this {Date}, by and between:</p>

<p><strong>Lender:</strong> {Lender's Name}, a company duly organized and existing under the laws of {Country}, with its registered office at {Address} (hereinafter referred to as the "Lender");</p>

<p><strong>Borrower:</strong> {Borrower's Name}, an individual/company duly organized and existing under the laws of {Country}, with its registered office at {Address} (hereinafter referred to as the "Borrower");</p>

<h2>RECITALS:</h2>

<p>WHEREAS, the Lender agrees to provide a loan to the Borrower, and the Borrower agrees to accept the loan under the terms and conditions set forth in this Agreement;</p>

<p>WHEREAS, the loan is provided in accordance with the applicable laws and regulations of the European Union and the relevant Member State(s);</p>

<p>NOW, THEREFORE, in consideration of the mutual covenants and agreements herein contained, the parties hereto agree as follows:</p>

<h2>1. DEFINITIONS</h2>

<p>Unless otherwise defined herein, the following terms shall have the meanings set forth below:</p>

<ul>
  <li>"Business Day" means any day other than a Saturday, Sunday, or public holiday in [relevant jurisdiction];</li>
  <li>"Effective Date" means the date on which the Loan Amount is disbursed to the Borrower;</li>
  <li>"Interest Rate" means the rate of interest applicable to the Loan Amount as specified in Section 3;</li>
  <li>"Loan Amount" means the principal amount of the loan as specified in Section 2;</li>
</ul>
`

export default function ContractEditPage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState(contractTemplate)

  const handleSave = async (newContent: string) => {
    setContent(newContent)
    // Implementar lógica de salvamento
    console.log('Saving contract...', newContent)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto">
            <ContractEditor
              contractId={params.id}
              initialContent={content}
              onSave={handleSave}
            />
          </div>
        </main>
      </div>
    </div>
  )
} 