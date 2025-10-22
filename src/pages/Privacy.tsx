import { motion } from 'framer-motion';
import { Lock, Eye, Database, Shield } from 'lucide-react';

const Privacy = () => {
  const policies = [
    {
      icon: Database,
      title: 'No Permanent Storage',
      description:
        'Your datasets are processed in-memory only. We do not store your CSV files or analysis results on our servers.',
    },
    {
      icon: Eye,
      title: 'Transparent Processing',
      description:
        'All analysis happens locally in your browser or on secure temporary servers. Your data is never shared with third parties.',
    },
    {
      icon: Shield,
      title: 'End-to-End Encryption',
      description:
        'Data transfers use military-grade TLS encryption. Your information is protected throughout the entire analysis pipeline.',
    },
    {
      icon: Lock,
      title: 'Session-Based Only',
      description:
        'Analysis results are stored only in your browser session. Clear your browser data to remove all traces instantly.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground">
            Your data security is our top priority
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-xl border border-border/50 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <p className="text-muted-foreground mb-4">
            At DataGuard, we understand that your network data is highly sensitive. We've designed our
            platform from the ground up with privacy as a core principle. Here's our promise:
          </p>
          <p className="text-muted-foreground font-semibold text-lg">
            Your data belongs to you. We never store, sell, or share your information.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {policies.map((policy, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="glass-card p-6 rounded-xl border border-border/50"
            >
              <policy.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{policy.title}</h3>
              <p className="text-muted-foreground text-sm">{policy.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-8 rounded-xl border border-border/50"
        >
          <h2 className="text-2xl font-bold mb-4">Data Processing Details</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What We Process:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>CSV files containing network traffic data</li>
                <li>Statistical analysis results and visualizations</li>
                <li>User preferences stored in browser local storage</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What We Don't Store:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Raw dataset contents</li>
                <li>IP addresses or network identifiers from your data</li>
                <li>Analysis results after session ends</li>
                <li>Personal information beyond registration email</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Your Rights:</h3>
              <p className="ml-4">
                You have complete control over your data. Clear browser storage to remove all local
                data instantly. Request account deletion at any time to remove authentication
                information.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>Last updated: January 2025</p>
          <p className="mt-2">
            Questions about our privacy practices? Contact us at privacy@dataguard.com
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
