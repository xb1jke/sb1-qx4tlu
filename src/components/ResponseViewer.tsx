import React from 'react';
import { Copy, Loader } from 'lucide-react';

interface ResponseViewerProps {
  response: string;
  loading: boolean;
}

const ResponseViewer: React.FC<ResponseViewerProps> = ({ response, loading }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Response</h2>
        {response && (
          <button
            onClick={handleCopy}
            className="btn-secondary"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </button>
        )}
      </div>

      <div className="relative min-h-[400px] bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-auto">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        ) : response ? (
          <pre className="text-gray-300">{response}</pre>
        ) : (
          <div className="text-gray-500 flex items-center justify-center h-full">
            Response will appear here
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseViewer;