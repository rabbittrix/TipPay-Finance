interface RadioOption {
  label: string;
  value: boolean;
}

interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function RadioGroup({ label, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-secondary">
        {label}
      </label>
      <div className="space-x-4">
        {options.map((option) => (
          <label key={option.label} className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-primary focus:ring-primary"
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
} 