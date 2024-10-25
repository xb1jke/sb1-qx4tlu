import React, { useState } from 'react';
import { X, Wand2 } from 'lucide-react';

interface SystemPromptGeneratorProps {
  onGenerate: (prompt: string) => void;
  onClose: () => void;
}

interface PromptTemplate {
  role: string;
  traits: string[];
  constraints: string[];
  format: string;
}

const SystemPromptGenerator: React.FC<SystemPromptGeneratorProps> = ({ onGenerate, onClose }) => {
  const [role, setRole] = useState('assistant');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState('');
  const [customTraits, setCustomTraits] = useState('');
  const [customConstraints, setCustomConstraints] = useState('');

  const templates: Record<string, PromptTemplate> = {
    assistant: {
      role: 'AI Assistant',
      traits: ['helpful', 'creative', 'knowledgeable', 'friendly', 'professional', 'concise'],
      constraints: ['use simple language', 'provide examples', 'be direct', 'avoid speculation'],
      format: 'conversational'
    },
    expert: {
      role: 'Domain Expert',
      traits: ['analytical', 'technical', 'detailed', 'precise', 'authoritative'],
      constraints: ['use technical terms', 'cite sources', 'provide in-depth analysis', 'maintain objectivity'],
      format: 'technical'
    },
    teacher: {
      role: 'Educational Guide',
      traits: ['patient', 'encouraging', 'clear', 'thorough', 'adaptable'],
      constraints: ['break down complex topics', 'use analogies', 'check understanding', 'provide practice exercises'],
      format: 'educational'
    },
    writer: {
      role: 'Content Creator',
      traits: ['creative', 'engaging', 'articulate', 'persuasive', 'authentic'],
      constraints: ['maintain consistent tone', 'use active voice', 'engage readers', 'tell stories'],
      format: 'narrative'
    }
  };

  const generatePrompt = () => {
    const template = templates[role];
    const traits = [...selectedTraits, ...customTraits.split(',').filter(t => t.trim())];
    const constraints = [...selectedConstraints, ...customConstraints.split(',').filter(c => c.trim())];
    
    let prompt = `You are a ${template.role}`;
    
    if (traits.length > 0) {
      prompt += ` who is ${traits.join(', ')}`;
    }
    
    prompt += '.\n\n';
    
    if (constraints.length > 0) {
      prompt += 'Instructions:\n';
      constraints.forEach(constraint => {
        prompt += `- ${constraint}\n`;
      });
    }
    
    if (selectedFormat) {
      prompt += `\nRespond in a ${selectedFormat} format.`;
    }
    
    onGenerate(prompt.trim());
  };

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">System Prompt Generator</h3>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Role Template</label>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
              setSelectedTraits([]);
              setSelectedConstraints([]);
              setSelectedFormat(templates[e.target.value].format);
            }}
            className="form-select"
          >
            <option value="assistant">AI Assistant</option>
            <option value="expert">Domain Expert</option>
            <option value="teacher">Educational Guide</option>
            <option value="writer">Content Creator</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Traits</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {templates[role].traits.map((trait) => (
              <button
                key={trait}
                onClick={() => {
                  setSelectedTraits(prev =>
                    prev.includes(trait)
                      ? prev.filter(t => t !== trait)
                      : [...prev, trait]
                  );
                }}
                className={`px-2 py-1 rounded-full text-xs ${
                  selectedTraits.includes(trait)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 text-gray-200'
                }`}
              >
                {trait}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={customTraits}
            onChange={(e) => setCustomTraits(e.target.value)}
            placeholder="Add custom traits (comma-separated)"
            className="form-input text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Constraints</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {templates[role].constraints.map((constraint) => (
              <button
                key={constraint}
                onClick={() => {
                  setSelectedConstraints(prev =>
                    prev.includes(constraint)
                      ? prev.filter(c => c !== constraint)
                      : [...prev, constraint]
                  );
                }}
                className={`px-2 py-1 rounded-full text-xs ${
                  selectedConstraints.includes(constraint)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 text-gray-200'
                }`}
              >
                {constraint}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={customConstraints}
            onChange={(e) => setCustomConstraints(e.target.value)}
            placeholder="Add custom constraints (comma-separated)"
            className="form-input text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Response Format</label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="form-select"
          >
            <option value="conversational">Conversational</option>
            <option value="technical">Technical</option>
            <option value="educational">Educational</option>
            <option value="narrative">Narrative</option>
            <option value="analytical">Analytical</option>
          </select>
        </div>

        <button
          type="button"
          onClick={generatePrompt}
          className="btn-primary w-full"
        >
          <Wand2 className="w-4 h-4 mr-2" />
          Generate System Prompt
        </button>
      </div>
    </div>
  );
};

export default SystemPromptGenerator;