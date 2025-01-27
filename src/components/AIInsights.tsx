import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faDatabase, faBolt, faCog, faClock, faServer, faShield, faMemory } from '@fortawesome/free-solid-svg-icons';

interface Insight {
  id: number;
  type: 'alert' | 'backup' | 'performance' | 'config' | 'security';
  icon: any;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  affectedHosts: string[];
}

const AIInsights: React.FC = () => {
  const insights: Insight[] = [
    {
      id: 1,
      type: 'alert',
      icon: faTriangleExclamation,
      title: 'Alert Pattern Change',
      description: 'Unusual spike in authentication failures detected across multiple application servers',
      severity: 'high',
      timestamp: '2024-03-15 10:15:00',
      affectedHosts: ['app-server-01', 'app-server-02']
    },
    {
      id: 2,
      type: 'backup',
      icon: faDatabase,
      title: 'Failed Backup',
      description: 'Database backup failed on primary database server during scheduled window',
      severity: 'medium',
      timestamp: '2024-03-15 02:00:00',
      affectedHosts: ['db-server-01']
    },
    {
      id: 3,
      type: 'performance',
      icon: faBolt,
      title: 'CPU Spike Detected',
      description: 'Sustained CPU usage above 90% on cache server for last 15 minutes',
      severity: 'high',
      timestamp: '2024-03-15 09:45:00',
      affectedHosts: ['cache-server-01']
    },
    {
      id: 4,
      type: 'config',
      icon: faCog,
      title: 'Configuration Issue',
      description: 'Non-standard hostname pattern detected on newly provisioned instances',
      severity: 'low',
      timestamp: '2024-03-15 08:30:00',
      affectedHosts: ['app-server-03', 'db-server-03']
    },
    {
      id: 5,
      type: 'security',
      icon: faShield,
      title: 'Security Update Required',
      description: 'Critical security patches pending installation on multiple servers',
      severity: 'high',
      timestamp: '2024-03-15 07:15:00',
      affectedHosts: ['app-server-01', 'app-server-02', 'db-server-01']
    },
    {
      id: 6,
      type: 'performance',
      icon: faMemory,
      title: 'Memory Usage Alert',
      description: 'High memory utilization trending upward over past 6 hours',
      severity: 'medium',
      timestamp: '2024-03-15 06:00:00',
      affectedHosts: ['app-server-02', 'cache-server-02']
    }
  ];

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'low':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getIconColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="ai-insights bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
      <div className="insights-list space-y-3 max-h-[calc(100vh-24rem)] overflow-y-auto pr-2">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`insight-item p-4 rounded-md border ${getSeverityClass(insight.severity)}`}
          >
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={insight.icon} className={`h-5 w-5 flex-shrink-0 ${getIconColor(insight.severity)}`} />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{insight.title}</h3>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-gray-400" />
                    <span className="text-xs text-gray-500">{insight.timestamp}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faServer} className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                      {insight.affectedHosts.map((host, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-white bg-opacity-50 rounded-md"
                        >
                          {host}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
