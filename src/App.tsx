import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faServer, faTriangleExclamation, faDatabase, faBolt, faRefresh, faPowerOff, faPlay, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import TopologyMap from './components/TopologyMap';
import ServerList from './components/ServerList';
import RouteTests from './components/RouteTests';
import AIInsights from './components/AIInsights';
import ActionPanel from './components/ActionPanel';
import Timeline from './components/Timeline'; // Import Timeline component

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const aiInsightsRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col" style={{mixHeight: '100vh'}}>
      {/* Main Section - Wrapped in a div */}
      <div className="grid grid-cols-12 gap-4 mb-4"> {/* Added margin bottom */}
        <div className="col-span-9 flex flex-col"> {/* Increased span for AI Insights, Actions, and Topology */}
          {/* Timeline Section */}
          <Timeline />
          <div className="grid grid-cols-12 gap-4 mb-4 flex-grow"> {/* Added margin bottom and flex-grow */}
            {/* Left Column - AI Insights & Actions */}
            <div className="col-span-4 flex flex-col gap-4" style={{height: '100%', overflowY: 'auto'}} ref={aiInsightsRef}>
              <AIInsights />
              <ActionPanel />
            </div>

            {/* Center Column - Topology Map */}
            <div className="col-span-8 bg-white rounded-lg shadow-lg p-4 flex-grow"> {/* Added flex-grow */}
              <h2 className="text-xl font-semibold mb-4">Infrastructure Topology</h2>
              <TopologyMap />
            </div>
          </div>
        </div>

        {/* Right Column - Server List & Route Tests */}
        <div className="col-span-3 flex flex-col gap-4" style={{height: '100%', overflowY: 'auto'}}>
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Application ID/VSADID"
                className="w-full p-2 border rounded-md pl-10 focus:ring focus:ring-blue-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute top-2 left-2">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          {/* Server List */}
          <ServerList searchQuery={searchQuery} />
          {/* Route Tests */}
          <RouteTests />
        </div>
      </div>
    </div>
  );
}

export default App;
