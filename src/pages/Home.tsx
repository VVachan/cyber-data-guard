import { motion } from 'framer-motion';
import { Shield, Upload, Activity, Brain, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Lock,
      title: 'Secure Upload',
      description: 'Military-grade encryption for your datasets. Your data never leaves your control.',
    },
    {
      icon: Activity,
      title: 'Real-Time DDoS Detection',
      description: 'Advanced ML models detect attack patterns instantly with 98%+ accuracy.',
    },
    {
      icon: Brain,
      title: 'Smart Insights',
      description: 'AI-powered analysis reveals hidden patterns and provides actionable recommendations.',
    },
    {
      icon: Zap,
      title: 'AI Assistant',
      description: 'Get instant help and explanations from our intelligent chatbot companion.',
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <Shield className="w-20 h-20 text-primary glow-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-glow-pulse" />
              </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-glow-pulse">
              Welcome to DataGuard
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Analyze Your Data with AI Precision
            </p>
            
            <p className="text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
              Securely upload datasets, detect DDoS anomalies in real-time, and visualize results with our cutting-edge cybersecurity platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/upload')}
                className="text-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Dataset
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-glow to-accent-glow opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/about')}
                className="text-lg border-primary/50 hover:border-primary hover:glow-primary"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground">
              Everything you need for advanced threat detection
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all group"
              >
                <div className="relative inline-block mb-4">
                  <feature.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 DataGuard. All rights reserved.</p>
          <p className="mt-2">Powered by advanced AI and machine learning</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
