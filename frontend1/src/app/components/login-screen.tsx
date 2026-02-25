import { Lock, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('mode-selection');
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"></div>
        <div className="absolute bottom-[15%] left-[10%] w-96 h-96 rounded-full bg-[#a3a3a3] opacity-5 blur-3xl"></div>
      </div>

      {/* Main content */}
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
          <p className="text-[#a3a3a3]">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-8 glow-white">
          {/* AI Security Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-[#a3a3a3] flex items-center justify-center">
              <Lock className="w-8 h-8 text-black" />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="agent@agentsphere.ai"
                  className="pl-11 glass-card border-[#a3a3a3]/20 focus:border-white text-white placeholder:text-[#a3a3a3]/50"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#a3a3a3]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 glass-card border-[#a3a3a3]/20 focus:border-white text-white placeholder:text-[#a3a3a3]/50"
                  required
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button 
                type="button"
                className="text-sm text-white hover:text-[#a3a3a3] transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button 
              type="submit"
              className="w-full py-6 rounded-xl bg-white hover:bg-[#e5e5e5] text-black glow-white transition-all duration-300 hover:scale-[1.02]"
            >
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#a3a3a3]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#1a1a1a]/80 text-[#a3a3a3]">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button"
              variant="outline"
              className="glass-card border-[#a3a3a3]/20 hover:border-white text-white hover:bg-white/10 transition-all"
            >
              Google
            </Button>
            <Button 
              type="button"
              variant="outline"
              className="glass-card border-[#a3a3a3]/20 hover:border-white text-white hover:bg-white/10 transition-all"
            >
              GitHub
            </Button>
          </div>
        </div>

        {/* Sign up link */}
        <p className="text-center mt-6 text-[#a3a3a3]">
          Don't have an account?{' '}
          <button 
            onClick={() => onNavigate('landing')}
            className="text-white hover:text-[#a3a3a3] transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
