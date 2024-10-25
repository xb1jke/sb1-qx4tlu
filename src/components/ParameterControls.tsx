import React from 'react';
import { type QueryConfig } from '../types';

interface ParameterControlsProps {
  config: QueryConfig;
  onChange: (config: QueryConfig) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({ config, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Temperature
          <span className="text-gray-400 ml-2">{config.temperature}</span>
        </label>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={config.temperature}
          onChange={e => onChange({ ...config, temperature: parseFloat(e.target.value) })}
          className="form-range"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Max Tokens
          <span className="text-gray-400 ml-2">{config.max_tokens}</span>
        </label>
        <input
          type="range"
          min="1"
          max="2048"
          value={config.max_tokens}
          onChange={e => onChange({ ...config, max_tokens: parseInt(e.target.value) })}
          className="form-range"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Top P
          <span className="text-gray-400 ml-2">{config.top_p}</span>
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={config.top_p}
          onChange={e => onChange({ ...config, top_p: parseFloat(e.target.value) })}
          className="form-range"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Frequency Penalty
          <span className="text-gray-400 ml-2">{config.frequency_penalty}</span>
        </label>
        <input
          type="range"
          min="-2"
          max="2"
          step="0.1"
          value={config.frequency_penalty}
          onChange={e => onChange({ ...config, frequency_penalty: parseFloat(e.target.value) })}
          className="form-range"
        />
      </div>
    </div>
  );
};

export default ParameterControls;