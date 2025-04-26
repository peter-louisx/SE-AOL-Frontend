import React from 'react';
import { Tag, AlertCircle } from 'lucide-react';
import { SustainabilityLabels } from '../../types';
import './SustainabilityLabelSelector.css';

interface SustainabilityLabelSelectorProps {
  selectedLabels: string[];
  onChange: (labels: string[]) => void;
  maxLabels?: number;
}

const SustainabilityLabelSelector: React.FC<SustainabilityLabelSelectorProps> = ({
  selectedLabels,
  onChange,
  maxLabels = 3
}) => {
  const handleToggleLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      // Remove the label if it's already selected
      onChange(selectedLabels.filter(l => l !== label));
    } else if (selectedLabels.length < maxLabels) {
      // Add the label if under the maximum limit
      onChange([...selectedLabels, label]);
    }
  };

  const isMaxReached = selectedLabels.length >= maxLabels;

  return (
    <div className="sustainability-labels-container">
      {/* {isMaxReached && (
        <div className="max-labels-warning">
          <AlertCircle size={16} />
          <span>Maximum of {maxLabels} labels selected</span>
        </div>
      )} */}
      
      <div className="labels-grid">
        {SustainabilityLabels.map((label) => {
          const isSelected = selectedLabels.includes(label);
          const isDisabled = !isSelected && isMaxReached;
          
          return (
            <button
              key={label}
              type="button"
              onClick={() => handleToggleLabel(label)}
              disabled={isDisabled}
              className={`label-button ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              title={isDisabled ? `Maximum of ${maxLabels} labels allowed` : ''}
            >
              <Tag size={16} className="label-icon" />
              <span>{label}</span>
              {/* {isSelected && <span className="checkmark">✓</span>} */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SustainabilityLabelSelector;