import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      
      {/* glow */}
      <div className="absolute inset-0 -z-10 flex justify-center">
        <div className="w-[420px] h-[420px] bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-md">
        
        {/* title */}
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          AgentSphere
        </h1>

        {/* glass card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          
          <h2 className="text-xl font-semibold mb-6 text-center">
            Login to your account
          </h2>

          <div className="space-y-4">
            
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="text-right">
              <button className="text-sm text-indigo-400 hover:text-indigo-300">
                Forgot Password?
              </button>
            </div>

            <button
              onClick={() => navigate("/mode")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-medium hover:opacity-90 transition shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}