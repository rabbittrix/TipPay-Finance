'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import CurveChart from '@/components/features/market/CurveChart'
import TradingTable from '@/components/features/market/TradingTable'
import CurrencySelector from '@/components/features/market/CurrencySelector'
import { Info } from 'lucide-react'

export default function MarketPage() {
  const [selectedCurrency, setSelectedCurrency] = useState('TipPay CP')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1">
        <Header />
        
        <main className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Market Info */}
            <div className="bg-tippay-light rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-tippay-primary mt-1" />
                <div>
                  <h2 className="text-lg font-semibold text-tippay-primary mb-2">
                    TipPay Digital Debt Market
                  </h2>
                  <p className="text-tippay-gray-700 text-sm">
                    A primeira e única plataforma regulamentada do mundo para emissão e negociação 
                    de dívida primária, oferecendo fluxo de trabalho digital seguro de ponta a ponta.
                  </p>
                </div>
              </div>
            </div>

            {/* Currency Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-2xl font-semibold mb-6 text-tippay-gray-800">Curva de Rendimento</h1>
              <CurrencySelector 
                selected={selectedCurrency}
                onSelect={setSelectedCurrency}
              />
            </div>

            {/* Trading Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CurrencyCard
                currency="EUR"
                total={10000}
                type="TipPay CP"
                received={10000}
              />
              <CurrencyCard
                currency="GBP"
                total={10000}
                type="TipPay CP"
                received={10000}
              />
              <CurrencyCard
                currency="USD"
                total={10000}
                type="TipPay CP"
                received={10000}
              />
            </div>

            {/* Curve Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-tippay-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">€</span>
                  </div>
                  <div>
                    <p className="text-sm text-tippay-gray-600">Volume Total Máximo</p>
                    <p className="text-xl font-semibold text-tippay-gray-800">100 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-tippay-light text-tippay-primary rounded-full text-sm">
                    ao vivo
                  </span>
                </div>
              </div>

              <CurveChart />

              <div className="grid grid-cols-4 gap-6 mt-6 text-sm">
                <MetricCard title="Emitido" value="50 000 000" />
                <MetricCard title="Restante" value="50 000 000" />
                <MetricCard title="Recebido" value="0" />
                <MetricCard title="Enviado" value="0" />
              </div>

              <div className="flex items-center gap-4 mt-6">
                <button className="flex items-center gap-2 px-4 py-2 border border-tippay-primary text-tippay-primary rounded-lg hover:bg-tippay-light">
                  <span>Adicionar Linha</span>
                </button>
                <button className="px-4 py-2 border border-tippay-gray-300 text-tippay-gray-600 rounded-lg hover:bg-gray-50">
                  Resetar
                </button>
                <button className="px-4 py-2 bg-tippay-primary text-white rounded-lg hover:bg-tippay-secondary">
                  Pausar Curva
                </button>
                <button className="px-4 py-2 border border-tippay-primary text-tippay-primary rounded-lg hover:bg-tippay-light">
                  Salvar
                </button>
              </div>
            </div>

            {/* Trading Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <TradingTable />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 