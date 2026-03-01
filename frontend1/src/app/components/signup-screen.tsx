import { useState } from "react";
import { Lock, Mail, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

interface SignupScreenProps {
  onNavigate: (screen: string) => void;
}

export function SignupScreen({ onNavigate }: SignupScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔹 Generate OTP
  const generateOTP = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to generate OTP");
      }

      setOtpSent(true);
      setError("");
      alert("OTP sent to your email!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Final Signup (Verify OTP + Store User)
  const handleSignup = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/verify-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Signup failed");
      }

      alert("Signup successful!");
      onNavigate("login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center">
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl glass-card glow-white flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#a3a3a3] bg-clip-text text-transparent">
              AgentSphere
            </h1>
          </div>
          <p className="text-[#a3a3a3]">Create your account</p>
        </div>

        <div className="glass-card rounded-2xl p-8 glow-white">
          <form className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@agentsphere.ai"
                  className="pl-11 glass-card border-[#a3a3a3]/20 focus:border-white text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 glass-card border-[#a3a3a3]/20 focus:border-white text-white"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label className="text-white">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-11 glass-card border-[#a3a3a3]/20 focus:border-white text-white"
                  required
                />
              </div>
            </div>

            {/* Generate OTP */}
            <Button
              type="button"
              onClick={generateOTP}
              disabled={loading}
              className="w-full py-6 rounded-xl bg-white text-black"
            >
              {loading ? "Generating..." : "Generate OTP"}
            </Button>

            {/* OTP Field (Only show after OTP sent) */}
            {otpSent && (
              <>
                <div className="space-y-2">
                  <Label className="text-white">Enter OTP</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                    <Input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      className="pl-11 glass-card border-[#a3a3a3]/20 focus:border-white text-white"
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-6 rounded-xl bg-white text-black"
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </Button>
              </>
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}