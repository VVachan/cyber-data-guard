import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    const success = login(loginEmail, loginPassword);
    if (success) {
      toast.success('Welcome back!');
      navigate('/home');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!acceptTerms) {
      toast.error('Please accept the Terms & Privacy Policy');
      return;
    }
    if (signupPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (signupPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    const success = signup(signupName, signupEmail, signupPassword);
    if (success) {
      toast.success('Account created successfully!');
      navigate('/home');
    } else {
      toast.error('Email already registered');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-col items-center justify-center space-y-6"
        >
          <div className="relative">
            <Shield className="w-40 h-40 text-primary glow-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"
            />
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 rounded-2xl border border-border/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">DataGuard Access</h1>
          </div>

          <Tabs defaultValue="login" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <Label htmlFor="remember-me" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="text-primary hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <Label htmlFor="accept-terms" className="text-sm cursor-pointer">
                    I accept the Terms & Privacy Policy
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
