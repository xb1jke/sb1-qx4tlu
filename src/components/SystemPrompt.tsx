import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Wand2 } from 'lucide-react';
import SystemPromptGenerator from './SystemPromptGenerator';

interface SystemPromptProps {
  content: string;
  onChange: (content: string) => void;
}

const SystemPrompt: React.FC<SystemPromptProps> = ({ content, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const presets = {
    assistant: "You are a helpful AI assistant.",
    writer: "You are a professional technical writer who excels at clear, concise documentation.",
    programmer: "You are an expert programmer with deep knowledge of software development best practices.",
    teacher: "You are a patient and knowledgeable teacher who explains complex topics clearly.",
    analyst: "You are a data analyst who provides detailed, accurate analysis with clear explanations."
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sm font-medium text-gray-300 hover:text-white"
      >
        {isExpanded ? <ChevronUp className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
        System Prompt
      </button>
      
      {isExpanded && (
        <div className="space-y-2">
          <div className="relative">
            <textarea
              className="form-textarea h-24"
              value={content}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter system instructions to define the AI's behavior..."
            />
            <button
              type="button"
              onClick={() => setShowGenerator(true)}
              className="absolute top-2 right-2 btn-secondary py-1 px-2 text-xs"
            >
              <Wand2 className="w-3 h-3 mr-1" />
              Generate
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {Object.entries(presets).map(([key, value]) => (
              <button
                key={key}
                type="button"
                onClick={() => onChange(value)}
                className="btn-secondary py-1 px-2 text-xs"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          {showGenerator && (
            <SystemPromptGenerator
              onGenerate={(prompt) => {
                onChange(prompt);
                setShowGenerator(false);
              }}
              onClose={() => setShowGenerator(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SystemPrompt;