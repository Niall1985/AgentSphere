import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface AgentInteractionScreenProps {
  onNavigate: (screen: string) => void;
  agentName: string;
}

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: Date;
}


const sendMessageToBackend = async (message: string) => {
  const res = await fetch("http://localhost:8000/code-assist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      session_id: "default_session",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch response from backend");
  }

  return res.json();
};

export function AgentInteractionScreen({ onNavigate, agentName }: AgentInteractionScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'agent',
      content: `Hello! I'm ${agentName}. How can I assist you today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
  const savedMessages = localStorage.getItem(`chat_${agentName}`);
  if (savedMessages) {
    const parsed = JSON.parse(savedMessages).map((msg: Message) => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
    setMessages(parsed);
  }
}, [agentName]);

  useEffect(() => {
    localStorage.setItem(`chat_${agentName}`, JSON.stringify(messages));
  }, [messages, agentName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const currentInput = input;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    /* ✅ ADDED: Real backend call instead of simulation */
    (async () => {
      try {
        const data = await sendMessageToBackend(currentInput);

        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: data.response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, agentMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: "Error connecting to backend.",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    })();
  };

  return (
    <div className="h-screen gradient-bg flex flex-col">
      {/* Header */}
      <div className="border-b border-[#a3a3a3]/10 backdrop-blur-sm bg-[#1a1a1a]/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg glass-card glow-white flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">
                  AgentSphere
                </h1>
                <p className="text-sm text-[#a3a3a3]">{agentName}</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('agent-selection')}
              className="px-4 py-2 rounded-lg glass-card hover:glow-white transition-all text-[#a3a3a3] hover:text-white"
            >
              ← Back to Agents
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'agent' && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#a3a3a3] flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-black" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-white to-[#d4d4d4] text-black'
                    : 'glass-card'
                }`}
              >
                {/* <p className={message.role === 'user' ? 'text-black' : 'text-white'}>
                  {message.content}
                </p> */}
                {message.role === 'agent' ? (
                  <pre className="overflow-x-auto whitespace-pre-wrap text-sm">
                    <code className="text-white">
                      {message.content}
                    </code>
                  </pre>
                ) : (
                  <p className="text-black">
                    {message.content}
                  </p>
                )}

                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-black/70' : 'text-[#a3a3a3]'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-xl bg-[#262626] flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-[#a3a3a3] flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div className="glass-card rounded-2xl p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-[#a3a3a3] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[#a3a3a3]/10 backdrop-blur-sm bg-[#1a1a1a]/50 px-6 py-4">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-2 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-[#a3a3a3]"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-6 py-2 rounded-xl bg-white hover:bg-[#e5e5e5] text-black glow-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-[#a3a3a3] mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
}