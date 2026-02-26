import { Code, Search, BarChart3, Calendar, MessageSquare, Sparkles, Activity, Zap } from 'lucide-react';

interface AgentSelectionScreenProps {
  onNavigate: (screen: string, agentName?: string) => void;
}

const agents = [
  {
    id: 'code-assist',
    name: 'CodeAssist Agent',
    description: 'Advanced code generation, review, and refactoring assistant',
    icon: Code,
    status: 'active',
    stats: { uptime: '99.9%', requests: '1.2M' }
  },
  {
    id: 'research',
    name: 'Research Agent',
    description: 'Deep research and information gathering from multiple sources',
    icon: Search,
    status: 'active',
    stats: { uptime: '99.8%', requests: '850K' }
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis Agent',
    description: 'Statistical analysis, data visualization, and insights generation',
    icon: BarChart3,
    status: 'active',
    stats: { uptime: '99.7%', requests: '620K' }
  },
  {
    id: 'planning',
    name: 'Planning Agent',
    description: 'Task breakdown, scheduling, and strategic planning assistance',
    icon: Calendar,
    status: 'testing',
    stats: { uptime: '98.5%', requests: '340K' }
  },
  {
    id: 'chat-assistant',
    name: 'Chat Assistant Agent',
    description: 'General-purpose conversational AI for various tasks and queries',
    icon: MessageSquare,
    status: 'active',
    stats: { uptime: '99.9%', requests: '2.1M' }
  }
];

export function AgentSelectionScreen({ onNavigate }: AgentSelectionScreenProps) {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[5%] w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-[15%] left-[5%] w-96 h-96 rounded-full bg-[#a3a3a3] opacity-5 blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 px-6 border-b border-[#a3a3a3]/10">
        <div className="max-w-7xl mx-auto pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg glass-card glow-white flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">
                AgentSphere
              </h1>
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

      {/* Main content */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-3 text-white">Select an Agent</h2>
            <p className="text-xl text-[#a3a3a3]">Choose an AI agent to interact with</p>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => {
              const Icon = agent.icon;
              const isActive = agent.status === 'active';
              
              return (
                <button
                  key={agent.id}
                  onClick={() => onNavigate('agent-interaction', agent.id)}
                  className={`group glass-card rounded-2xl p-6 text-left transition-all duration-300 hover:scale-105 ${
                    isActive ? 'hover:glow-white' : 'hover:glow-gray'
                  } ${!isActive ? 'opacity-80' : ''}`}
                >
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      isActive 
                        ? 'bg-white/10 text-white' 
                        : 'bg-[#a3a3a3]/10 text-[#a3a3a3]'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        isActive ? 'bg-white' : 'bg-[#a3a3a3]'
                      } animate-pulse`}></div>
                      <span className="text-xs capitalize">{agent.status}</span>
                    </div>
                    <Activity className="w-5 h-5 text-[#a3a3a3] group-hover:text-white transition-colors" />
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                    isActive 
                      ? 'from-white to-[#d4d4d4]' 
                      : 'from-[#a3a3a3] to-[#737373]'
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${isActive ? 'text-black' : 'text-white'}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#d4d4d4] transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-[#a3a3a3] text-sm mb-4 line-clamp-2">
                    {agent.description}
                  </p>

                  {/* Stats */}
                  <div className="pt-4 border-t border-[#a3a3a3]/10 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-white" />
                        <span className="text-[#a3a3a3]">{agent.stats.uptime}</span>
                      </div>
                      <div className="text-[#a3a3a3]">{agent.stats.requests} requests</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Info Card */}
          <div className="mt-12 glass-card rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold mb-2 text-white">Agent Status Guide</h4>
                <div className="text-sm text-[#a3a3a3] space-y-1">
                  <p><span className="text-white">● Active:</span> Ready for production use</p>
                  <p><span className="text-[#a3a3a3]">● Testing:</span> Under development, may have limited functionality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
