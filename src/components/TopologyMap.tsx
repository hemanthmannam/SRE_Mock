import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface NodeData {
  label: string;
  type: 'server' | 'database' | 'cloud';
  status: 'healthy' | 'warning' | 'critical';
  applications: string[];
  metrics: {
    cpu: number;
    memory: number;
    disk: number;
  };
}

interface EdgeData {
  type: 'data' | 'dependency' | 'replica' | 'failover';
}

const initialNodes = [
  {
    id: 'app-server-01',
    data: {
      label: 'app-server-01',
      type: 'server',
      status: 'healthy',
      applications: ['Web Server', 'API Gateway'],
      metrics: { cpu: 45, memory: 60, disk: 30 }
    } as NodeData,
    position: { x: 100, y: 100 },
    type: 'custom'
  },
  {
    id: 'app-server-02',
    data: {
      label: 'app-server-02',
      type: 'server',
      status: 'warning',
      applications: ['Web Server', 'Cache Service'],
      metrics: { cpu: 75, memory: 80, disk: 45 }
    } as NodeData,
    position: { x: 100, y: 300 },
    type: 'custom'
  },
  {
    id: 'db-primary',
    data: {
      label: 'db-primary',
      type: 'database',
      status: 'healthy',
      applications: ['PostgreSQL Primary'],
      metrics: { cpu: 40, memory: 70, disk: 65 }
    } as NodeData,
    position: { x: 300, y: 200 },
    type: 'custom'
  },
  {
    id: 'db-replica-01',
    data: {
      label: 'db-replica-01',
      type: 'database',
      status: 'healthy',
      applications: ['PostgreSQL Replica'],
      metrics: { cpu: 35, memory: 65, disk: 60 }
    } as NodeData,
    position: { x: 500, y: 200 },
    type: 'custom'
  },
  {
    id: 'cache-01',
    data: {
      label: 'cache-01',
      type: 'server',
      status: 'healthy',
      applications: ['Redis Cache'],
      metrics: { cpu: 30, memory: 50, disk: 20 }
    } as NodeData,
    position: { x: 300, y: 100 },
     type: 'custom'
  },
  {
    id: 'cdn-01',
    data: {
      label: 'cdn-01',
      type: 'cloud',
      status: 'healthy',
      applications: ['CDN Edge'],
      metrics: { cpu: 25, memory: 40, disk: 30 }
    } as NodeData,
    position: { x: 300, y: 300 },
    type: 'custom'
  },
    {
    id: 'app-server-03',
    data: {
      label: 'app-server-03',
      type: 'server',
      status: 'healthy',
      applications: ['Web Server', 'API Gateway'],
      metrics: { cpu: 45, memory: 60, disk: 30 }
    } as NodeData,
    position: { x: 100, y: 500 },
    type: 'custom'
  },
    {
    id: 'db-server-03',
    data: {
      label: 'db-server-03',
      type: 'database',
      status: 'healthy',
      applications: ['PostgreSQL Primary'],
      metrics: { cpu: 40, memory: 70, disk: 65 }
    } as NodeData,
    position: { x: 500, y: 500 },
    type: 'custom'
  },
    {
    id: 'cache-server-03',
    data: {
      label: 'cache-server-03',
      type: 'server',
      status: 'healthy',
      applications: ['Redis Cache'],
      metrics: { cpu: 30, memory: 50, disk: 20 }
    } as NodeData,
    position: { x: 500, y: 100 },
    type: 'custom'
  }
];

const initialEdges = [
    { id: 'e1-2', source: 'app-server-01', target: 'db-primary', data: { type: 'data' } as EdgeData },
    { id: 'e2-1', source: 'db-primary', target: 'app-server-01', data: { type: 'data' } as EdgeData },
    { id: 'e2-3', source: 'app-server-02', target: 'db-primary', data: { type: 'data' } as EdgeData },
    { id: 'e3-2', source: 'db-primary', target: 'app-server-02', data: { type: 'data' } as EdgeData },
    { id: 'e3-4', source: 'db-primary', target: 'db-replica-01', data: { type: 'replica' } as EdgeData },
    { id: 'e4-3', source: 'db-replica-01', target: 'db-primary', data: { type: 'failover' } as EdgeData },
    { id: 'e4-5', source: 'app-server-01', target: 'cache-01', data: { type: 'dependency' } as EdgeData },
    { id: 'e5-6', source: 'app-server-02', target: 'cache-01', data: { type: 'dependency' } as EdgeData },
    { id: 'e6-7', source: 'app-server-01', target: 'cdn-01', data: { type: 'data' } as EdgeData },
    { id: 'e7-8', source: 'app-server-02', target: 'cdn-01', data: { type: 'data' } as EdgeData },
    { id: 'e8-9', source: 'app-server-03', target: 'db-server-03', data: { type: 'data' } as EdgeData },
    { id: 'e9-8', source: 'db-server-03', target: 'app-server-03', data: { type: 'data' } as EdgeData },
    { id: 'e9-10', source: 'app-server-03', target: 'cache-server-03', data: { type: 'dependency' } as EdgeData },
    { id: 'e10-9', source: 'cache-server-03', target: 'app-server-03', data: { type: 'dependency' } as EdgeData },
];

const nodeStyle = (type: string, status: string) => {
  let backgroundColor = 'bg-gray-100';
  let borderColor = 'border-gray-300';
  let textColor = 'text-gray-700';

  if (type === 'server') {
    if (status === 'healthy') {
      backgroundColor = 'bg-green-100';
      borderColor = 'border-green-500';
      textColor = 'text-green-700';
    } else if (status === 'warning') {
      backgroundColor = 'bg-yellow-100';
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-700';
    } else if (status === 'critical') {
      backgroundColor = 'bg-red-100';
      borderColor = 'border-red-500';
      textColor = 'text-red-700';
    }
  } else if (type === 'database') {
    if (status === 'healthy') {
      backgroundColor = 'bg-blue-100';
      borderColor = 'border-blue-500';
      textColor = 'text-blue-700';
    } else if (status === 'warning') {
      backgroundColor = 'bg-yellow-100';
      borderColor = 'border-yellow-500';
      textColor = 'text-yellow-700';
    } else if (status === 'critical') {
      backgroundColor = 'bg-red-100';
      borderColor = 'border-red-500';
      textColor = 'text-red-700';
    }
  } else if (type === 'cloud') {
    backgroundColor = 'bg-purple-100';
    borderColor = 'border-purple-500';
    textColor = 'text-purple-700';
  }

  return `${backgroundColor} ${borderColor} ${textColor} border rounded-md p-2`;
};

const edgeStyle = (type: string) => {
  let strokeColor = 'stroke-gray-400';
    let strokeDasharray = '';
  if (type === 'data') {
    strokeColor = 'stroke-blue-500';
  } else if (type === 'dependency') {
    strokeColor = 'stroke-purple-500';
  } else if (type === 'replica') {
    strokeColor = 'stroke-green-500';
  } else if (type === 'failover') {
        strokeColor = 'stroke-red-500';
        strokeDasharray = '5 5';
    }
  return `${strokeColor} stroke-2 ${strokeDasharray}`;
};

const CustomNode = ({ data, id }: NodeProps<NodeData>) => {
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => setHovered(true);
    const handleMouseLeave = () => setHovered(false);

    const issues = [
        {
            id: 1,
            type: 'alert',
            title: 'Alert Pattern Change',
            description: 'Unusual spike in authentication failures detected across multiple application servers',
            severity: 'high',
            timestamp: '2024-03-15 10:15:00',
            affectedHosts: ['app-server-01', 'app-server-02']
        },
        {
            id: 2,
            type: 'backup',
            title: 'Failed Backup',
            description: 'Database backup failed on primary database server during scheduled window',
            severity: 'medium',
            timestamp: '2024-03-15 02:00:00',
            affectedHosts: ['db-primary']
        },
        {
            id: 3,
            type: 'performance',
            title: 'CPU Spike Detected',
            description: 'Sustained CPU usage above 90% on cache server for last 15 minutes',
            severity: 'high',
            timestamp: '2024-03-15 09:45:00',
            affectedHosts: ['cache-01']
        },
        {
            id: 4,
            type: 'config',
            title: 'Configuration Issue',
            description: 'Non-standard hostname pattern detected on newly provisioned instances',
            severity: 'low',
            timestamp: '2024-03-15 08:30:00',
            affectedHosts: ['app-server-03', 'db-server-03']
        },
        {
            id: 5,
            type: 'security',
            title: 'Security Update Required',
            description: 'Critical security patches pending installation on multiple servers',
            severity: 'high',
            timestamp: '2024-03-15 07:15:00',
            affectedHosts: ['app-server-01', 'app-server-02', 'db-primary']
        },
        {
            id: 6,
            type: 'performance',
            title: 'Memory Usage Alert',
            description: 'High memory utilization trending upward over past 6 hours',
            severity: 'medium',
            timestamp: '2024-03-15 06:00:00',
            affectedHosts: ['app-server-02', 'cache-01']
        }
    ];

    const relevantIssues = issues.filter(issue => issue.affectedHosts.includes(id));

    return (
        <div
            className={`topology-node ${nodeStyle(data.type, data.status)}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{position: 'relative'}}
        >
            <div className="font-medium text-sm topology-node-label">{data.label}</div>
            <div className="text-xs text-gray-500 topology-node-applications">
                {data.applications.join(', ')}
            </div>
            {hovered && relevantIssues.length > 0 && (
                <div className="absolute z-10 tooltip bg-white p-2 rounded shadow -translate-y-full">
                    <h3 className="text-sm font-medium">Issues for {data.label}</h3>
                    <ul className="mt-2 space-y-1">
                        {relevantIssues.map(issue => (
                            <li key={issue.id} className="text-xs text-gray-600">
                                {issue.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

const TopologyMap: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="topology-map-container" style={{height: '90%', width: '100%'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={{
            custom: CustomNode
        }}
        edgeTypes={{
          default: ({ data, ...props }: any) => (
            <g>
              <path
                {...props}
                className={edgeStyle(data.type)}
                markerEnd="url(#arrow)"
              />
            </g>
          ),
        }}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default TopologyMap;
