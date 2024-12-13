'use client'

import { useState } from 'react'
import { FormData } from '@/types/questionnaire'
import { Check, ChevronRight } from 'lucide-react'

const stages = [
  { name: 'Preliminary', completed: true },
  { name: 'Non-Disclosure Agreement', completed: true },
  { name: 'General Confidentiality', completed: false, current: true },
  { name: 'Purpose', completed: false },
  { name: 'Confidentiality Provisions', completed: false },
]

export default function QuestionnaireForm() {
  const [formData, setFormData] = useState<FormData>({
    buyerName: '',
    sellerName: '',
    hasGuarantor: false,
    targetName: ''
  })

  return (
    <div className="bg-white rounded-xl shadow-lg">
      {/* Progress Header */}
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-sm text-secondary-light">Progress</div>
            <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[30%] h-full bg-primary-main rounded-full"></div>
            </div>
            <div className="text-sm font-medium text-primary-main">3/10</div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-sm text-secondary-light hover:text-secondary-main">
              Preview
            </button>
            <button className="px-4 py-2 text-sm text-secondary-light hover:text-secondary-main">
              View
            </button>
            <button className="tippay-button tippay-button-primary">
              Save & Close
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 min-h-[600px]">
        {/* Stages Sidebar */}
        <div className="col-span-1 border-r p-6">
          <ul className="space-y-3">
            {stages.map((stage, index) => (
              <li key={stage.name}>
                <div className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
                  ${stage.current ? 'bg-primary-light/10 text-primary-main' : 
                    stage.completed ? 'text-success-main' : 'text-secondary-light'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center
                    ${stage.completed ? 'bg-success-main' : 
                      stage.current ? 'border-2 border-primary-main' : 'border-2 border-gray-200'}`}>
                    {stage.completed && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium">{stage.name}</span>
                  {stage.current && <ChevronRight className="w-4 h-4 ml-auto" />}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Content */}
        <div className="col-span-4 p-8">
          <form className="space-y-8 max-w-3xl">
            <section>
              <h2 className="tippay-subheading">Buyer and Seller</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-main mb-1">
                    What is the name of the Buyer?
                  </label>
                  <input
                    type="text"
                    className="tippay-input"
                    value={formData.buyerName}
                    onChange={(e) => setFormData({...formData, buyerName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary-main mb-1">
                    What is the name of the Seller?
                  </label>
                  <input
                    type="text"
                    className="tippay-input"
                    value={formData.sellerName}
                    onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="tippay-subheading">Guarantor</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-main mb-3">
                    Is the Agreement to have a Guarantor?
                  </label>
                  <div className="flex space-x-4">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          className="w-4 h-4 text-primary-main focus:ring-primary-light"
                          checked={formData.hasGuarantor === (option === 'Yes')}
                          onChange={() => setFormData({...formData, hasGuarantor: option === 'Yes'})}
                        />
                        <span className="text-sm text-secondary-main">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="tippay-subheading">Target Company</h2>
              <div>
                <label className="block text-sm font-medium text-secondary-main mb-1">
                  What is the name of the target?
                </label>
                <input
                  type="text"
                  className="tippay-input"
                  value={formData.targetName}
                  onChange={(e) => setFormData({...formData, targetName: e.target.value})}
                />
              </div>
            </section>

            <div className="flex justify-end pt-6">
              <button type="submit" className="tippay-button tippay-button-primary">
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 