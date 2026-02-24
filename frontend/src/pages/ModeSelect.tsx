import { useNavigate } from "react-router-dom";

export default function ModeSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-16 relative">
      
      {/* glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <h1 className="text-3xl font-bold text-center mb-14 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        AgentSphere
      </h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Test Agent */}
        <div
          onClick={() => navigate("/agents")}
          className="cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)] transition"
        >
          <div className="text-4xl mb-4">🛠️</div>
          <h2 className="text-xl font-semibold mb-2">Test Agent</h2>
          <p className="text-gray-400">
            Evaluate, test, and analyze AI agents
          </p>
        </div>

        {/* Use Agents */}
        <div
          onClick={() => navigate("/agents")}
          className="cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)] transition"
        >
          <div className="text-4xl mb-4">🤖</div>
          <h2 className="text-xl font-semibold mb-2">Use Agents</h2>
          <p className="text-gray-400">
            Submit queries and interact with AI agents
          </p>
        </div>
      </div>
    </div>
  );
}