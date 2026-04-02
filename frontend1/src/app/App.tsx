import { useState } from 'react';
import { LandingScreen } from '@/app/components/landing-screen';
import { LoginScreen } from '@/app/components/login-screen';
import { SignupScreen } from '@/app/components/signup-screen';
import { ModeSelectionScreen } from '@/app/components/mode-selection-screen';
import { AgentSelectionScreen } from '@/app/components/agent-selection-screen';
import { AgentInteractionScreen } from '@/app/components/agent-interaction-screen';
import { AgentTestingScreen } from '@/app/components/agent-testing-screen';

type Screen = 'landing' | 'login' | 'signup' | 'mode-selection' | 'agent-selection' | 'agent-interaction' | 'agent-testing';

function getInitialScreen(): Screen {
  const token = localStorage.getItem("token");
  if (!token) return 'landing';

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return 'landing';
    }
    return 'mode-selection';
  } catch {
    localStorage.removeItem("token");
    return 'landing';
  }
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(getInitialScreen);
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
      {currentScreen === 'signup' && (
        <SignupScreen onNavigate={handleNavigate} />
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

// import { useState } from 'react';
// import { LandingScreen } from '@/app/components/landing-screen';
// import { LoginScreen } from '@/app/components/login-screen';
// import { SignupScreen } from '@/app/components/signup-screen';
// import { ModeSelectionScreen } from '@/app/components/mode-selection-screen';
// import { AgentSelectionScreen } from '@/app/components/agent-selection-screen';
// import { AgentInteractionScreen } from '@/app/components/agent-interaction-screen';
// import { AgentTestingScreen } from '@/app/components/agent-testing-screen';

// type Screen = 'landing' | 'login' | 'signup' | 'mode-selection' | 'agent-selection' | 'agent-interaction' | 'agent-testing';

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
//   const [selectedAgent, setSelectedAgent] = useState<string>('Research Agent');

//   const handleNavigate = (screen: string, agentName?: string) => {
//     setCurrentScreen(screen as Screen);
//     if (agentName) {
//       setSelectedAgent(agentName);
//     }
//   };

//   return (
//     <div className="size-full">
//       {currentScreen === 'landing' && (
//         <LandingScreen onNavigate={handleNavigate} />
//       )}
//       {currentScreen === 'login' && (
//         <LoginScreen onNavigate={handleNavigate} />
//       )}
//       {currentScreen === 'signup' && (
//         <SignupScreen onNavigate={handleNavigate} />
//       )}
//       {currentScreen === 'mode-selection' && (
//         <ModeSelectionScreen onNavigate={handleNavigate} />
//       )}
//       {currentScreen === 'agent-selection' && (
//         <AgentSelectionScreen onNavigate={handleNavigate} />
//       )}
//       {currentScreen === 'agent-interaction' && (
//         <AgentInteractionScreen 
//           onNavigate={handleNavigate} 
//           agentName={selectedAgent}
//         />
//       )}
//       {currentScreen === 'agent-testing' && (
//         <AgentTestingScreen onNavigate={handleNavigate} />
//       )}
//     </div>
//   );
// }
