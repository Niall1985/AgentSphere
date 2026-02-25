import { useState } from 'react';
import { 
  Sparkles, FileCode, FileText, Folder, ChevronRight, ChevronDown,
  Activity, Clock, AlertCircle, CheckCircle, Cpu, HardDrive, TrendingUp
} from 'lucide-react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';

interface AgentTestingScreenProps {
  onNavigate: (screen: string) => void;
}

const performanceData = [
  { time: '00:00', responseTime: 120, requests: 45 },
  { time: '04:00', responseTime: 95, requests: 32 },
  { time: '08:00', responseTime: 180, requests: 78 },
  { time: '12:00', responseTime: 220, requests: 125 },
  { time: '16:00', responseTime: 195, requests: 98 },
  { time: '20:00', responseTime: 140, requests: 67 },
];

const testCaseData = [
  { name: 'Unit Tests', passed: 45, failed: 2 },
  { name: 'Integration', passed: 32, failed: 1 },
  { name: 'E2E Tests', passed: 18, failed: 0 },
  { name: 'Performance', passed: 12, failed: 1 },
];

const logs = [
  { id: 1, time: '14:32:18', level: 'info', message: 'Agent initialized successfully' },
  { id: 2, time: '14:32:20', level: 'success', message: 'Test suite execution started' },
  { id: 3, time: '14:32:25', level: 'info', message: 'Processing request batch #1247' },
  { id: 4, time: '14:32:28', level: 'warning', message: 'Response time exceeded 200ms threshold' },
  { id: 5, time: '14:32:32', level: 'success', message: 'Test case "user_authentication" passed' },
  { id: 6, time: '14:32:35', level: 'error', message: 'Test case "data_validation" failed: Expected 200, got 404' },
  { id: 7, time: '14:32:40', level: 'info', message: 'Memory usage: 245MB / 512MB' },
  { id: 8, time: '14:32:45', level: 'success', message: 'All integration tests completed' },
];

export function AgentTestingScreen({ onNavigate }: AgentTestingScreenProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (folder: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folder)) {
      newExpanded.delete(folder);
    } else {
      newExpanded.add(folder);
    }
    setExpandedFolders(newExpanded);
  };

  return (
    <div className="h-screen gradient-bg flex flex-col">
      {/* Header */}
      <div className="border-b border-[#a3a3a3]/10 backdrop-blur-sm bg-[#1a1a1a]/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg glass-card glow-white flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">
                  AgentSphere
                </h1>
                <p className="text-sm text-[#a3a3a3]">Testing & Analytics Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('mode-selection')}
              className="px-4 py-2 rounded-lg glass-card hover:glow-white transition-all text-[#a3a3a3] hover:text-white"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - File Tree */}
        <div className="w-64 border-r border-[#a3a3a3]/10 backdrop-blur-sm bg-[#1a1a1a]/30 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-bold text-[#a3a3a3] mb-3 uppercase">Research Agent</h3>
            <div className="space-y-1">
              {/* Root Folder */}
              <button
                onClick={() => toggleFolder('root')}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/10 text-white text-sm"
              >
                {expandedFolders.has('root') ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <Folder className="w-4 h-4 text-white" />
                <span>agent_research</span>
              </button>

              {expandedFolders.has('root') && (
                <div className="ml-4 space-y-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 text-[#a3a3a3] text-sm hover:text-white cursor-pointer">
                    <FileCode className="w-4 h-4 text-white" />
                    <span>main.py</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1.5 text-[#a3a3a3] text-sm hover:text-white cursor-pointer">
                    <FileText className="w-4 h-4 text-[#a3a3a3]" />
                    <span>config.yaml</span>
                  </div>
                  <button
                    onClick={() => toggleFolder('tests')}
                    className="w-full flex items-center gap-2 px-2 py-1.5 text-[#a3a3a3] text-sm hover:text-white"
                  >
                    {expandedFolders.has('tests') ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <Folder className="w-4 h-4 text-[#a3a3a3]" />
                    <span>tests/</span>
                  </button>
                  {expandedFolders.has('tests') && (
                    <div className="ml-4 space-y-1">
                      <div className="flex items-center gap-2 px-2 py-1.5 text-[#a3a3a3] text-sm hover:text-white cursor-pointer">
                        <FileCode className="w-4 h-4" />
                        <span>test_main.py</span>
                      </div>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-[#a3a3a3] text-sm hover:text-white cursor-pointer">
                        <FileCode className="w-4 h-4" />
                        <span>test_utils.py</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center Panel - Analytics Dashboard */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Success Rate */}
              <div className="glass-card rounded-2xl p-4 hover:glow-white transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#a3a3a3]">Success Rate</span>
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">97.8%</div>
                <div className="text-xs text-[#a3a3a3]">↑ 2.3% from last week</div>
              </div>

              {/* Avg Response Time */}
              <div className="glass-card rounded-2xl p-4 hover:glow-gray transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#a3a3a3]">Avg Response</span>
                  <Clock className="w-4 h-4 text-[#a3a3a3]" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">165ms</div>
                <div className="text-xs text-[#a3a3a3]">↓ 12ms improvement</div>
              </div>

              {/* Error Rate */}
              <div className="glass-card rounded-2xl p-4 hover:glow-white transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#a3a3a3]">Error Rate</span>
                  <AlertCircle className="w-4 h-4 text-[#ef4444]" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">2.2%</div>
                <div className="text-xs text-[#a3a3a3]">4 errors in last hour</div>
              </div>

              {/* Tests Passed */}
              <div className="glass-card rounded-2xl p-4 hover:glow-gray transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#a3a3a3]">Tests Passed</span>
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-1">107/111</div>
                <div className="text-xs text-[#a3a3a3]">96.4% pass rate</div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Response Time Chart */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Response Time Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#a3a3a3" opacity={0.1} />
                    <XAxis dataKey="time" stroke="#a3a3a3" />
                    <YAxis stroke="#a3a3a3" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(26, 26, 26, 0.9)', 
                        border: '1px solid rgba(163, 163, 163, 0.2)',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="responseTime" 
                      stroke="#ffffff" 
                      fillOpacity={1} 
                      fill="url(#colorResponseTime)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Test Cases Chart */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Test Case Results</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={testCaseData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#a3a3a3" opacity={0.1} />
                    <XAxis dataKey="name" stroke="#a3a3a3" />
                    <YAxis stroke="#a3a3a3" />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(26, 26, 26, 0.9)', 
                        border: '1px solid rgba(163, 163, 163, 0.2)',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Bar dataKey="passed" fill="#ffffff" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="failed" fill="#ef4444" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System Resources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CPU Usage */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">CPU Usage</h3>
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-[#a3a3a3]">Current Load</span>
                    <span className="text-white font-bold">42%</span>
                  </div>
                  <div className="w-full h-3 bg-[#262626] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-white to-[#a3a3a3] rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>

              {/* Memory Usage */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">Memory Usage</h3>
                  <HardDrive className="w-5 h-5 text-[#a3a3a3]" />
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-[#a3a3a3]">245MB / 512MB</span>
                    <span className="text-white font-bold">48%</span>
                  </div>
                  <div className="w-full h-3 bg-[#262626] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#a3a3a3] to-white rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Execution Logs */}
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Execution Logs</h3>
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#262626]/50 transition-colors">
                    <span className="text-xs text-[#a3a3a3] font-mono flex-shrink-0">{log.time}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                      log.level === 'error' ? 'bg-[#ef4444]/10 text-[#ef4444]' :
                      log.level === 'warning' ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                      log.level === 'success' ? 'bg-white/10 text-white' :
                      'bg-[#a3a3a3]/10 text-[#a3a3a3]'
                    }`}>
                      {log.level}
                    </span>
                    <span className="text-sm text-white flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
