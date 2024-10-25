import React, { useState } from 'react';
import { Send, Save, Copy, Trash2, MessageSquare, Settings as SettingsIcon, Sparkles, AlertCircle } from 'lucide-react';
import QueryForm from './components/QueryForm';
import ResponseViewer from './components/ResponseViewer';
import Settings from './components/Settings';
import { type QueryConfig } from './types';

function App() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSubmit = async (config: QueryConfig) => {
    setLoading(true);
    try {
      // In a real app, this would make an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse(JSON.stringify({
        id: 'chatcmpl-123',
        object: 'chat.completion',
        created: Date.now(),
        model: config.model,
        choices: [{
          message: {
            role: 'assistant',
            content: 'This is a sample response. In a real application, this would be the actual API response.'
          }
        }]
      }, null, 2));
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <nav className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold">ChatGPT Query Builder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="btn-secondary"
                onClick={() => setShowSettings(true)}
              >
                <SettingsIcon className="w-4 h-4 mr-2" />
                Settings
              </button>
              <button className="btn-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Preset
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QueryForm onSubmit={handleSubmit} loading={loading} />
          <ResponseViewer response={response} loading={loading} />
        </div>
      </main>

      <Settings 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}

export default App;