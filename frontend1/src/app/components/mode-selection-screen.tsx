import { Wrench, Bot, Sparkles, ArrowRight } from 'lucide-react';

interface ModeSelectionScreenProps {
  onNavigate: (screen: string) => void;
}

export function ModeSelectionScreen({ onNavigate }: ModeSelectionScreenProps) {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[15%] right-[8%] w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[8%] w-96 h-96 rounded-full bg-[#a3a3a3] opacity-5 blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg glass-card glow-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">
              AgentSphere
            </h1>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              How would you like to proceed?
            </h2>
            <p className="text-xl text-[#a3a3a3]">
              Choose your interaction mode
            </p>
          </div>

          {/* Mode Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Test Agent Card */}
            <button
              onClick={() => onNavigate('agent-testing')}
              className="group glass-card rounded-3xl p-8 hover:glow-white transition-all duration-300 hover:scale-105 hover:bg-white/5 text-left"
            >
              <div className="mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-[#d4d4d4] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Test Agent</h3>
                <p className="text-[#a3a3a3] text-lg mb-6">
                  Evaluate, test, and analyze AI agents with comprehensive analytics and debugging tools
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#a3a3a3]/10">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-[#a3a3a3]">Features:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">Performance Metrics</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">Error Tracking</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs">Test Logs</span>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
              </div>
            </button>

            {/* Use Agents Card */}
            <button
              onClick={() => onNavigate('agent-selection')}
              className="group glass-card rounded-3xl p-8 hover:glow-gray transition-all duration-300 hover:scale-105 hover:bg-[#a3a3a3]/5 text-left"
            >
              <div className="mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#a3a3a3] to-[#737373] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Use Agents</h3>
                <p className="text-[#a3a3a3] text-lg mb-6">
                  Submit queries and interact with AI agents to accomplish your tasks efficiently
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#a3a3a3]/10">
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-[#a3a3a3]">Features:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#a3a3a3]/10 text-[#a3a3a3] text-xs">Chat Interface</span>
                    <span className="px-3 py-1 rounded-full bg-[#a3a3a3]/10 text-[#a3a3a3] text-xs">Multi-Agent</span>
                    <span className="px-3 py-1 rounded-full bg-[#a3a3a3]/10 text-[#a3a3a3] text-xs">Real-time</span>
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-[#a3a3a3] group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-sm text-[#a3a3a3]">
              Not sure which mode to choose?{' '}
              <button className="text-white hover:text-[#a3a3a3] transition-colors">
                Learn more about AgentSphere
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
