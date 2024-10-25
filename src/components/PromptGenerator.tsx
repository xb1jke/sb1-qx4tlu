import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PromptGeneratorProps {
  onGenerate: (prompt: string) => void;
  onClose: () => void;
}

const PromptGenerator: React.FC<PromptGeneratorProps> = ({ onGenerate, onClose }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [type, setType] = useState('question');

  const generatePrompt = () => {
    let prompt = '';
    
    switch (type) {
      case 'question':
        prompt = `Please explain ${topic} in a ${tone} tone. Include key concepts and practical examples.`;
        break;
      case 'analysis':
        prompt = `Provide a detailed ${tone} analysis of ${topic}, covering its main aspects, implications, and potential impacts.`;
        break;
      case 'howto':
        prompt = `Create a ${tone} step-by-step guide on how to ${topic}. Include best practices and common pitfalls to avoid.`;
        break;
      case 'comparison':
        prompt = `Compare and contrast different aspects of ${topic} in a ${tone} manner. Highlight key differences and similarities.`;
        break;
    }

    onGenerate(prompt);
  };

  return (
    <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Prompt Generator</h3>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="form-input w-full"
            placeholder="Enter your topic..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="form-select"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="technical">Technical</option>
            <option value="academic">Academic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
          >
            <option value="question">Question</option>
            <option value="analysis">Analysis</option>
            <option value="howto">How-to Guide</option>
            <option value="comparison">Comparison</option>
          </select>
        </div>

        <button
          type="button"
          onClick={generatePrompt}
          className="btn-primary w-full"
          disabled={!topic}
        >
          Generate Prompt
        </button>
      </div>
    </div>
  );
};

export default PromptGenerator;