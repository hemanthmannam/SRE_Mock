import React, { useState, useRef, useEffect } from 'react';
    import { Search, Server, AlertTriangle, Database, Zap, RefreshCw, Power } from 'lucide-react';
    import TopologyMap from './components/TopologyMap';
    import ServerList from './components/ServerList';
    import RouteTests from './components/RouteTests';
    import AIInsights from './components/AIInsights';
    import ActionPanel from './components/ActionPanel';

    function App() {
      const [searchQuery, setSearchQuery] = useState('');
        const aiInsightsRef = useRef<HTMLDivElement>(null);

      return (
        <div className="min-h-screen bg-gray-50 p-4 flex flex-col" style={{mixHeight: '100vh'}}>
          {/* Top Section */}
          <div className="grid grid-cols-12 gap-4 mb-4"> {/* Added margin bottom */}
            {/* Left Column - AI Insights & Actions */}
            <div className="col-span-3 flex flex-col gap-4" style={{height: '100%', overflowY: 'auto'}} ref={aiInsightsRef}>
              <AIInsights />
              <ActionPanel />
            </div>

            {/* Center Column - Topology Map */}
            <div className="col-span-6 bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Infrastructure Topology</h2>
              <TopologyMap />
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
                        <Search className="h-5 w-5 text-gray-400" />
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
