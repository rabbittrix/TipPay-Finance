Create detailed components with these requirements:

1. TipPay Brand Colors:
- Primary: #E4B528 (Gold)
- Secondary: #333333 (Dark Gray)
- Background: #FFFFFF (White)
- Light Background: #F5F5F5
- Text: #333333
- Success: #4CAF50
- Error: #F44336

2. Component Requirements:
- Use 'use client' directive for client-side components
- Style with Tailwind CSS utility classes for responsive design
- Use Lucide React icons
- Configure next.config.js for any external images
- Implement proper navigation structure

3. Contract Questionnaire Features:
- Progress indicator showing completion (3/10)
- Questionnaire stages sidebar:
  • Preliminary
  • Non-Disclosure Agreement
  • General Confidentiality
  • Purpose
  • Confidentiality Provisions
- Main form sections:
  • Buyer and Seller Information
  • Guarantor Options
  • Target Company Details
- Action buttons:
  • Preview
  • View
  • Save & Close
  • Submit

4. Form Structure:
- Text input fields for:
  • Buyer name
  • Seller name
  • Target company name
- Radio buttons for guarantor selection
- Progress tracking
- Save & Continue functionality
- Form validation

5. Layout Components:
- Left sidebar with stages (20% width)
- Main content area (80% width)
- Top header with progress and actions
- Responsive design breakpoints

6. Navigation:
- Product
- Features
- Pricing
- Careers
- Help
- Privacy

7. Project Structure:
src/
├── components/
│   ├── questionnaire/
│   │   ├── StagesSidebar.tsx
│   │   ├── QuestionnaireForm.tsx
│   │   ├── ProgressHeader.tsx
│   │   └── ActionButtons.tsx
│   └── shared/
│       ├── Input.tsx
│       ├── RadioGroup.tsx
│       └── Button.tsx
├── styles/
│   └── questionnaire.scss
└── types/
    └── questionnaire.ts

8. Form Validation:
- Required field validation
- Real-time validation feedback
- Error state handling
- Success confirmations

9. Responsive Design:
- Desktop-first approach
- Tablet breakpoint: 768px
- Mobile breakpoint: 640px
- Collapsible sidebar on mobile

10. Accessibility:
- ARIA labels
- Keyboard navigation
- Focus management
- Error announcements