import { motion } from 'framer-motion';
import { Shield, Target, Zap, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Military-grade encryption ensures your data remains confidential and secure throughout the analysis process.',
    },
    {
      icon: Target,
      title: 'Precise Detection',
      description: 'Our AI models achieve 98%+ accuracy in identifying DDoS attack patterns across various attack vectors.',
    },
    {
      icon: Zap,
      title: 'Real-Time Analysis',
      description: 'Process massive datasets instantly with our optimized machine learning pipeline.',
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Intuitive interface designed for both security professionals and beginners.',
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
          <h1 className="text-4xl font-bold mb-4">About DataGuard</h1>
          <p className="text-xl text-muted-foreground">
            Protecting networks with cutting-edge AI technology
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-xl border border-border/50 mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            DataGuard was created to empower organizations and individuals with advanced cybersecurity
            tools that detect and prevent Distributed Denial of Service (DDoS) attacks. In today's
            connected world, DDoS attacks pose a significant threat to business continuity, causing
            downtime, financial losses, and reputational damage.
          </p>
          <p className="text-muted-foreground">
            Our platform leverages state-of-the-art machine learning algorithms to analyze network
            traffic patterns and identify anomalies in real-time. By making advanced threat detection
            accessible through an intuitive interface, we're democratizing cybersecurity for everyone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="glass-card p-6 rounded-xl border border-border/50"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card p-8 rounded-xl border border-border/50"
        >
          <h2 className="text-2xl font-bold mb-4">Understanding DDoS Attacks</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              <strong className="text-foreground">DDoS (Distributed Denial of Service)</strong> attacks
              overwhelm systems with massive amounts of traffic from multiple sources, making services
              unavailable to legitimate users.
            </p>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Common Attack Types:</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>SYN Flood:</strong> Exploits TCP handshake by sending numerous connection requests</li>
                <li><strong>UDP Flood:</strong> Overwhelms random ports with UDP packets</li>
                <li><strong>HTTP Flood:</strong> Targets web servers with legitimate-looking requests</li>
                <li><strong>ICMP Flood:</strong> Floods network with ICMP echo requests</li>
              </ul>
            </div>
            <p>
              Early detection is crucial. DataGuard's AI analyzes patterns in packet size, flow rate,
              protocol distribution, and timing to identify attacks before they cause significant damage.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
