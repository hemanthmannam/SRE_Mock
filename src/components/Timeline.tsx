import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faExclamationTriangle,
  faWrench,
  faDatabase,
  faExchangeAlt,
  faClock,
  faCheckCircle,
  faShield,
  faCodeBranch,
  faNetworkWired,
  faServer,
  faMemory,
  faBolt,
  faCog
} from '@fortawesome/free-solid-svg-icons';

interface Step {
  id: number;
  type: 'incident' | 'patch' | 'config' | 'change' | 'failover' | 'maintenance' | 'optimization' | 'network' | 'security' | 'deployment' | 'monitoring' | 'backup' | 'log' | 'access';
  description: string;
  timestamp: string;
}

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps: Step[] = [
    { id: 1, type: 'incident', description: 'INCXXXXXX', timestamp: '1/12/2025 18:00h' },
    { id: 2, type: 'patch', description: 'Patching', timestamp: '1/13/2025 0:30h' },
    { id: 3, type: 'config', description: 'Undocumented Config Change Detected', timestamp: '1/13/2025 8:14h' },
    { id: 4, type: 'change', description: 'Change Control XYZ', timestamp: '1/13/2025 12:47h' },
    { id: 5, type: 'failover', description: 'Automated Failover (VMotion,Switch Failure)', timestamp: '1/13/2025 18:44h' },
    { id: 6, type: 'incident', description: 'INCYYYYYY', timestamp: '1/14/2025 02:00h' },
    { id: 7, type: 'maintenance', description: 'Scheduled Maintenance', timestamp: '1/14/2025 06:30h' },
    { id: 8, type: 'optimization', description: 'Database Optimization', timestamp: '1/14/2025 10:15h' },
    { id: 9, type: 'network', description: 'Network Configuration Update', timestamp: '1/14/2025 14:22h' },
    { id: 10, type: 'security', description: 'Security Scan Initiated', timestamp: '1/14/2025 19:55h' },
    { id: 11, type: 'deployment', description: 'Application Deployment', timestamp: '1/15/2025 01:10h' },
    { id: 12, type: 'monitoring', description: 'Performance Monitoring', timestamp: '1/15/2025 07:45h' },
    { id: 13, type: 'backup', description: 'System Backup', timestamp: '1/15/2025 12:30h' },
    { id: 14, type: 'log', description: 'Log Analysis', timestamp: '1/15/2025 16:00h' },
    { id: 15, type: 'access', description: 'User Access Review', timestamp: '1/15/2025 21:20h' }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;

    const timeline = timelineRef.current;
    const isAtRight = timeline.scrollWidth - timeline.scrollLeft - timeline.clientWidth < 10;
    const isAtLeft = timeline.scrollLeft < 10;

    if (isAtRight) {
      if (scrollTimeout.current === null) {
        scrollTimeout.current = window.setInterval(() => {
          if (timeline.scrollWidth - timeline.scrollLeft - timeline.clientWidth < 10) {
            timeline.scrollLeft += 5;
          } else {
            clearInterval(scrollTimeout.current!);
            scrollTimeout.current = null;
          }
        }, 100);
      }
    } else if (isAtLeft) {
        if (scrollTimeout.current === null) {
            scrollTimeout.current = window.setInterval(() => {
                if (timeline.scrollLeft > 10) {
                    timeline.scrollLeft -= 5;
                } else {
                    clearInterval(scrollTimeout.current!);
                    scrollTimeout.current = null;
                }
            }, 100);
        }
    }
    else {
      if (scrollTimeout.current !== null) {
        clearInterval(scrollTimeout.current);
        scrollTimeout.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current !== null) {
        clearInterval(scrollTimeout.current);
      }
    };
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'incident':
        return { icon: faExclamationTriangle, color: 'text-red-500' };
      case 'patch':
        return { icon: faWrench, color: 'text-blue-500' };
      case 'config':
        return { icon: faCog, color: 'text-yellow-500' };
      case 'change':
        return { icon: faCodeBranch, color: 'text-purple-500' };
      case 'failover':
        return { icon: faExchangeAlt, color: 'text-orange-500' };
      case 'maintenance':
        return { icon: faClock, color: 'text-gray-500' };
      case 'optimization':
        return { icon: faBolt, color: 'text-green-500' };
      case 'network':
        return { icon: faNetworkWired, color: 'text-indigo-500' };
      case 'security':
        return { icon: faShield, color: 'text-teal-500' };
      case 'deployment':
        return { icon: faServer, color: 'text-pink-500' };
      case 'monitoring':
        return { icon: faMemory, color: 'text-lime-500' };
      case 'backup':
        return { icon: faDatabase, color: 'text-cyan-500' };
      case 'log':
        return { icon: faCheckCircle, color: 'text-emerald-500' };
      case 'access':
        return { icon: faCheckCircle, color: 'text-emerald-500' };
      default:
        return { icon: faCircle, color: 'text-gray-500' };
    }
  };

  return (
    <div className="timeline bg-white rounded-lg shadow-lg p-4 mb-4">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>
      <div
        ref={timelineRef}
        className="timeline-steps max-h-[250px] overflow-x-auto whitespace-nowrap relative flex items-center"
        onMouseMove={handleMouseMove}
        style={{ minHeight: '150px' }}
      >
        {steps.map((step, index) => {
          const { icon, color } = getIcon(step.type);
          return (
            <div key={step.id} className="inline-block align-top mr-6 relative flex flex-col items-center">
              <div
                className="flex flex-col items-center cursor-pointer"
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <FontAwesomeIcon icon={icon} className={`h-6 w-6 ${color}`} />
                <div className="text-xs text-gray-500 mt-1">{step.timestamp}</div>
              </div>
              {hoveredStep === step.id && (
                <div className="absolute z-[1000] tooltip bg-white p-2 rounded shadow transition-opacity duration-200 ease-in-out -translate-y-[calc(100%)]" style={{zIndex: 1000}}>
                  <h3 className="text-sm font-medium">{step.description}</h3>
                  <p className="text-xs text-gray-500">{step.timestamp}</p>
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 h-[1px] bg-gray-300 z-0" style={{left: 'calc(50% + 1.8rem)', width: 'calc(100% - 3.6rem)', top: 'calc(50% - 0.5rem)'}} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
