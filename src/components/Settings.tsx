import React, { useState } from 'react';
import { X, Key, Moon, Sun, Monitor } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('normal');
  const [autoSave, setAutoSave] = useState(true);

  const handleSave = () => {
    // In a real app, save settings to localStorage or backend
    localStorage.setItem('chatgpt-api-key', apiKey);
    localStorage.setItem('theme', theme);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('autoSave', String(autoSave));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              OpenAI API Key
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="form-input pr-10 font-mono"
                placeholder="sk-..."
              />
              <Key className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Your API key is stored locally and never sent to our servers
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center p-2 rounded ${
                  theme === 'light' ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center p-2 rounded ${
                  theme === 'dark' ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex items-center justify-center p-2 rounded ${
                  theme === 'system' ? 'bg-blue-500' : 'bg-gray-700'
                }`}
              >
                <Monitor className="w-4 h-4 mr-2" />
                System
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="form-select"
            >
              <option value="small">Small</option>
              <option value="normal">Normal</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto-save Queries</label>
            <button
              onClick={() => setAutoSave(!autoSave)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoSave ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoSave ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t border-gray-700">
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;