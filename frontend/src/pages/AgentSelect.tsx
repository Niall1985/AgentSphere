export default function AgentSelect() {
  const agents = [
    { name: "CodeAssist Agent", status: "Active" },
    { name: "Research Agent", status: "Active" },
    { name: "Data Analysis Agent", status: "Testing" },
    { name: "Planning Agent", status: "Active" },
    { name: "Chat Assistant Agent", status: "Testing" },
  ];

  return (
    <div className="min-h-screen px-6 py-16 relative">
      
      {/* glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[520px] h-[520px] bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <h1 className="text-3xl font-bold text-center mb-14 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
        AgentSphere
      </h1>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {agents.map((agent) => (
          <div
            key={agent.name}
            className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-6 transition hover:scale-[1.02]
              ${
                agent.status === "Active"
                  ? "border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.25)]"
                  : "border-white/10 opacity-80"
              }`}
          >
            <h2 className="text-lg font-semibold mb-2">{agent.name}</h2>

            <p className="text-sm text-gray-400 mb-4">
              AI-powered autonomous agent
            </p>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                agent.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}