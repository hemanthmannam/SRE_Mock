import React from 'react';
import { RefreshCw, Power, Play, AlertOctagon } from 'lucide-react';

const ActionPanel: React.FC = () => {
  const handleAction = (action: string) => {
    console.log(`Executing action: ${action}`);
    // In a real app, this would make API calls to perform the actions
  };

  return (
    <div className="action-panel bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Actions</h2>
      <div className="action-buttons space-y-3">
        <button
          onClick={() => handleAction('restart-process')}
          className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-md transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Restart Process</span>
        </button>

        <button
          onClick={() => handleAction('restart-server')}
          className="w-full flex items-center justify-center gap-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 py-2 px-4 rounded-md transition-colors"
        >
          <Power className="h-4 w-4" />
          <span>Restart Server</span>
        </button>

        <button
          onClick={() => handleAction('start-backup')}
          className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md transition-colors"
        >
          <Play className="h-4 w-4" />
          <span>Start Backup</span>
        </button>

        <button
          onClick={() => handleAction('clear-alerts')}
          className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 py-2 px-4 rounded-md transition-colors"
        >
          <AlertOctagon className="h-4 w-4" />
          <span>Clear Alerts</span>
        </button>
      </div>
    </div>
  );
};

export default ActionPanel;
