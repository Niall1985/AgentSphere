import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 relative">
      
      {/* Glow background */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="text-center max-w-3xl">
        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          AgentSphere
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          A unified Agent-as-a-Service and AgentOps platform for building,
          testing, and using AI agents.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          
          {/* Login button — ROUTES */}
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-medium hover:opacity-90 transition shadow-lg"
          >
            Login
          </button>

          {/* Signup button — ROUTES */}
          <button
            className="px-8 py-3 rounded-xl border border-white/15 bg-white/5 backdrop-blur-md hover:bg-white/10 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-10">
          Built for next-generation autonomous AI systems
        </p>
      </div>
    </div>
  );
}