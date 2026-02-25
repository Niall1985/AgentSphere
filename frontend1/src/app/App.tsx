import { useState } from 'react';
import { LandingScreen } from '@/app/components/landing-screen';
import { LoginScreen } from '@/app/components/login-screen';
import { ModeSelectionScreen } from '@/app/components/mode-selection-screen';
import { AgentSelectionScreen } from '@/app/components/agent-selection-screen';
import { AgentInteractionScreen } from '@/app/components/agent-interaction-screen';
import { AgentTestingScreen } from '@/app/components/agent-testing-screen';

type Screen = 'landing' | 'login' | 'mode-selection' | 'agent-selection' | 'agent-interaction' | 'agent-testing';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [selectedAgent, setSelectedAgent] = useState<string>('Research Agent');

  const handleNavigate = (screen: string, agentName?: string) => {
    setCurrentScreen(screen as Screen);
    if (agentName) {
      setSelectedAgent(agentName);
    }
  };

  return (
    <div className="size-full">
      {currentScreen === 'landing' && (
        <LandingScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'login' && (
        <LoginScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'mode-selection' && (
        <ModeSelectionScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'agent-selection' && (
        <AgentSelectionScreen onNavigate={handleNavigate} />
      )}
      {currentScreen === 'agent-interaction' && (
        <AgentInteractionScreen 
          onNavigate={handleNavigate} 
          agentName={selectedAgent}
        />
      )}
      {currentScreen === 'agent-testing' && (
        <AgentTestingScreen onNavigate={handleNavigate} />
      )}
    </div>
  );
}
