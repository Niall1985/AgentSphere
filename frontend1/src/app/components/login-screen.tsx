import { useState } from "react";
import { Lock, Mail, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Login successful
      onNavigate("mode-selection");

    } catch (err) {
      setError("Server error. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center">
      <div className="relative z-10 w-full max-w-md px-6">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl glass-card glow-white flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">
              AgentSphere
            </h1>
          </div>
          <p className="text-[#a3a3a3]">Sign in to your account</p>
        </div>

        <div className="glass-card rounded-2xl p-8 glow-white">
          <form onSubmit={handleLogin} className="space-y-6">

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@agentsphere.ai"
                  className="pl-11 glass-card border-[#a3a3a3]/20 text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 glass-card border-[#a3a3a3]/20 text-white"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-xl bg-white text-black"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

          </form>
        </div>

        <p className="text-center mt-6 text-[#a3a3a3]">
          Don't have an account?{" "}
          <button
            onClick={() => onNavigate("signup")}
            className="text-white hover:text-[#a3a3a3]"
          >
            Sign up
          </button>
        </p>
         <p className="text-center mt-6 text-[#a3a3a3]">
          <button
            onClick={() => onNavigate("landing")}
            className="text-white hover:text-[#a3a3a3]"
          >
            Back to Landing Page
          </button>
        </p>
      </div>
    </div>
  );
}