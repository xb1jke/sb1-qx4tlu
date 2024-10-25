import React, { useState } from 'react';
import { Send, AlertCircle, Plus, Trash2 } from 'lucide-react';
import { type QueryConfig } from '../types';
import SystemPrompt from './SystemPrompt';
import PromptGenerator from './PromptGenerator';
import ParameterControls from './ParameterControls';

interface QueryFormProps {
  onSubmit: (config: QueryConfig) => void;
  loading: boolean;
}

const QueryForm: React.FC<QueryFormProps> = ({ onSubmit, loading }) => {
  const [config, setConfig] = useState<QueryConfig>({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: '' },
      { role: 'user', content: '' }
    ],
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const [showPromptGenerator, setShowPromptGenerator] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredMessages = config.messages.filter(msg => msg.content.trim() !== '');
    onSubmit({ ...config, messages: filteredMessages });
  };

  const updateMessage = (index: number, content: string) => {
    const newMessages = [...config.messages];
    newMessages[index] = { ...newMessages[index], content };
    setConfig({ ...config, messages: newMessages });
  };

  const handleGeneratedPrompt = (prompt: string) => {
    updateMessage(1, prompt);
    setShowPromptGenerator(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Model</label>
          <select
            className="form-select"
            value={config.model}
            onChange={e => setConfig({ ...config, model: e.target.value })}
          >
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <SystemPrompt
          content={config.messages[0].content}
          onChange={(content) => updateMessage(0, content)}
        />

        <div className="relative">
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            className="form-textarea h-32"
            value={config.messages[1].content}
            onChange={e => updateMessage(1, e.target.value)}
            placeholder="Enter your message here..."
            required
          />
          <button
            type="button"
            onClick={() => setShowPromptGenerator(true)}
            className="absolute top-8 right-2 btn-secondary py-1 px-2 text-xs"
          >
            Generate Prompt
          </button>
        </div>

        {showPromptGenerator && (
          <PromptGenerator onGenerate={handleGeneratedPrompt} onClose={() => setShowPromptGenerator(false)} />
        )}

        <ParameterControls config={config} onChange={setConfig} />
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <div className="flex items-center text-yellow-400">
          <AlertCircle className="w-4 h-4 mr-2" />
          <span className="text-sm">API key required in settings</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          <Send className="w-4 h-4 mr-2" />
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </form>
  );
};

export default QueryForm;