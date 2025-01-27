import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface RouteTest {
  id: number;
  source: string;
  destination: string;
  timestamp: string;
  status: 'success' | 'warning' | 'failed';
  hops: {
    hop: number;
    address: string;
    latency: number;
  }[];
}

const RouteTests: React.FC = () => {
  const routes: RouteTest[] = [
    {
      id: 1,
      source: '192.168.1.1',
      destination: 'app-server-01',
      timestamp: '2024-03-15 10:30:45',
      status: 'success',
      hops: [
        { hop: 1, address: '192.168.1.1', latency: 0.5 },
        { hop: 2, address: '10.0.0.1', latency: 1.2 },
        { hop: 3, address: '172.16.0.1', latency: 2.8 },
        { hop: 4, address: 'app-server-01', latency: 3.5 }
      ]
    },
    {
      id: 2,
      source: '192.168.1.1',
      destination: 'db-server-01',
      timestamp: '2024-03-15 10:31:00',
      status: 'warning',
      hops: [
        { hop: 1, address: '192.168.1.1', latency: 0.6 },
        { hop: 2, address: '10.0.0.1', latency: 15.7 },
        { hop: 3, address: 'db-server-01', latency: 16.9 }
      ]
    },
    {
      id: 3,
      source: '192.168.1.1',
      destination: 'cache-server-01',
      timestamp: '2024-03-15 10:31:15',
      status: 'failed',
      hops: [
        { hop: 1, address: '192.168.1.1', latency: 0.5 },
        { hop: 2, address: '10.0.0.1', latency: 1.8 },
        { hop: 3, address: '*', latency: 0 },
        { hop: 4, address: '*', latency: 0 }
      ]
    },
    {
      id: 4,
      source: '192.168.1.1',
      destination: 'app-server-02',
      timestamp: '2024-03-15 10:31:30',
      status: 'success',
      hops: [
        { hop: 1, address: '192.168.1.1', latency: 0.4 },
        { hop: 2, address: '10.0.0.1', latency: 1.1 },
        { hop: 3, address: '172.16.0.2', latency: 2.5 },
        { hop: 4, address: 'app-server-02', latency: 3.2 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'failed':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="route-tests bg-white rounded-lg shadow-lg p-4 flex-grow">
      <h2 className="text-lg font-semibold mb-4">Route Tests</h2>
      <div className="route-list space-y-4 max-h-[calc(100vh-24rem)] overflow-y-auto pr-2">
        {routes.map((route) => (
          <div
            key={route.id}
            className={`route-item border rounded-md p-4 ${getStatusColor(route.status)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faNetworkWired} className="h-5 w-5" />
                <span className="font-medium">
                  {route.source} → {route.destination}
                </span>
              </div>
              <span className="text-sm">{route.timestamp}</span>
            </div>
            <div className="space-y-1 mt-3">
              {route.hops.map((hop) => (
                <div key={hop.hop} className="flex items-center text-sm">
                  <span className="w-8">{hop.hop}.</span>
                  <span className="flex-grow font-mono">{hop.address}</span>
                  <span className="text-right">
                    {hop.latency > 0 ? `${hop.latency}ms` : '-'}
                  </span>
                </div>
              ))}
            </div>
            {route.status === 'failed' && (
              <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
                <FontAwesomeIcon icon={faExclamationCircle} className="h-4 w-4" />
                <span>Route trace incomplete - destination unreachable</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteTests;
