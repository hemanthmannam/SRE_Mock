import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer, faTriangleExclamation, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

interface InfraNode {
  id: number;
  hostname: string;
  ipAddress: string;
  status: 'healthy' | 'warning' | 'critical';
  applicationId: string;
}

interface ServerListProps {
    searchQuery: string;
}

const ServerList: React.FC<ServerListProps> = ({ searchQuery }) => {
  // Mock data - in a real app, this would come from an API
  const infraNodes: InfraNode[] = [
    { id: 1, hostname: 'app-server-01', ipAddress: '10.0.1.101', status: 'healthy', applicationId: 'APP001' },
    { id: 2, hostname: 'db-server-01', ipAddress: '10.0.1.201', status: 'warning', applicationId: 'APP001' },
    { id: 3, hostname: 'cache-server-01', ipAddress: '10.0.1.301', status: 'healthy', applicationId: 'APP001' },
    { id: 4, hostname: 'app-server-02', ipAddress: '10.0.1.102', status: 'critical', applicationId: 'APP001' },
    { id: 5, hostname: 'db-server-02', ipAddress: '10.0.1.202', status: 'healthy', applicationId: 'APP001' },
    { id: 6, hostname: 'cache-server-02', ipAddress: '10.0.1.302', status: 'warning', applicationId: 'APP001' },
    { id: 7, hostname: 'app-server-03', ipAddress: '10.0.1.103', status: 'healthy', applicationId: 'APP002' },
    { id: 8, hostname: 'db-server-03', ipAddress: '10.0.1.203', status: 'healthy', applicationId: 'APP002' },
    { id: 9, hostname: 'cache-server-03', ipAddress: '10.0.1.303', status: 'healthy', applicationId: 'APP002' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <FontAwesomeIcon icon={faCheckCircle} className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <FontAwesomeIcon icon={faTriangleExclamation} className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <FontAwesomeIcon icon={faTriangleExclamation} className="h-5 w-5 text-red-500" />;
      default:
        return <FontAwesomeIcon icon={faServer} className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

    const filteredNodes = infraNodes.filter(node =>
        node.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.hostname.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex-grow">
      <h2 className="text-lg font-semibold mb-4">List of Infrastructure</h2>
      <div className="space-y-2 max-h-[calc(100vh-24rem)] overflow-y-auto pr-2">
        {filteredNodes.map((node) => (
          <div
            key={node.id}
            className={`flex items-center p-3 rounded-md border ${getStatusClass(node.status)} transition-colors duration-150 hover:bg-opacity-75 cursor-pointer`}
          >
            <div className="flex-shrink-0 mr-3">
              {getStatusIcon(node.status)}
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <span className="font-medium">{node.hostname}</span>
                <span className="text-sm text-gray-500">App: {node.applicationId}</span>
              </div>
              <span className="text-sm text-gray-600">{node.ipAddress}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerList;
