import { Sparkles, Circle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface LandingScreenProps {
  onNavigate: (screen: string) => void;
}

export function LandingScreen({ onNavigate }: LandingScreenProps) {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-3 h-3 rounded-full bg-white opacity-40 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-[15%] w-2 h-2 rounded-full bg-[#a3a3a3] opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-[20%] w-4 h-4 rounded-full bg-white opacity-25 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-[#a3a3a3] opacity-40 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-20 right-[10%] w-2 h-2 rounded-full bg-white opacity-30 animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Larger glowing orbs */}
        <div className="absolute top-[15%] right-[5%] w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-[#a3a3a3] opacity-5 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl glass-card glow-white flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <Circle className="absolute -top-1 -right-1 w-6 h-6 text-[#a3a3a3] fill-[#a3a3a3]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#d4d4d4] to-white bg-clip-text text-transparent">
          AgentSphere
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-[#a3a3a3] mb-12 max-w-3xl mx-auto leading-relaxed">
          A unified Agent-as-a-Service and AgentOps platform for building, testing, and using AI agents.
        </p>

        {/* Divider with glow */}
        <div className="w-48 h-[2px] mx-auto mb-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => onNavigate('login')}
            className="px-8 py-6 text-lg rounded-xl bg-white hover:bg-[#e5e5e5] text-black glow-white transition-all duration-300 hover:scale-105"
          >
            Login
          </Button>
          <Button 
            onClick={() => onNavigate('login')}
            variant="outline"
            className="px-8 py-6 text-lg rounded-xl glass-card border-white/20 text-white hover:bg-white/10 hover:border-white/40 glow-gray transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 hover:glow-white transition-all duration-300">
            <div className="text-white text-3xl mb-3">🤖</div>
            <h3 className="text-lg mb-2">AI Agent Platform</h3>
            <p className="text-sm text-[#a3a3a3]">Deploy and manage intelligent agents at scale</p>
          </div>
          <div className="glass-card rounded-2xl p-6 hover:glow-gray transition-all duration-300">
            <div className="text-[#a3a3a3] text-3xl mb-3">⚡</div>
            <h3 className="text-lg mb-2">Real-time Testing</h3>
            <p className="text-sm text-[#a3a3a3]">Evaluate and optimize agent performance</p>
          </div>
          <div className="glass-card rounded-2xl p-6 hover:glow-white transition-all duration-300">
            <div className="text-white text-3xl mb-3">📊</div>
            <h3 className="text-lg mb-2">Advanced Analytics</h3>
            <p className="text-sm text-[#a3a3a3]">Deep insights into agent operations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
