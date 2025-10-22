import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your DataGuard AI Assistant. Ask me about DDoS attacks, CSV uploads, or analysis results.' }
  ]);
  const [input, setInput] = useState('');

  const getAIResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('ddos') || lower.includes('attack')) {
      return 'DDoS (Distributed Denial of Service) attacks overwhelm systems with traffic. Common types include SYN Flood, UDP Flood, and HTTP Flood. Our AI analyzes packet patterns to detect anomalies.';
    } else if (lower.includes('csv') || lower.includes('upload')) {
      return 'Upload your CSV dataset on the Upload page. Ensure it contains network traffic data with features like packet size, flow rate, and protocol information. Max size: 300 MB.';
    } else if (lower.includes('confidence') || lower.includes('accuracy')) {
      return 'Confidence scores indicate how certain the model is about its prediction. Scores above 90% suggest high reliability. Low confidence may indicate borderline cases or insufficient data.';
    } else if (lower.includes('feature') || lower.includes('important')) {
      return 'Top features are ranked by their influence on predictions. High packet rate, unusual port activity, and abnormal segment sizes are strong DDoS indicators.';
    } else if (lower.includes('help') || lower.includes('how')) {
      return 'I can help with: Understanding DDoS types, explaining analysis results, CSV formatting tips, and navigating DataGuard features. What would you like to know?';
    } else {
      return 'I\'m here to assist with cybersecurity insights and DataGuard features. Try asking about DDoS detection, CSV uploads, or analysis interpretation!';
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user' as const, content: input };
    const aiMessage = { role: 'assistant' as const, content: getAIResponse(input) };
    
    setMessages([...messages, userMessage, aiMessage]);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg glow-primary transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] glass-card rounded-xl shadow-2xl flex flex-col overflow-hidden border border-primary/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/20 to-accent/20">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-card/50">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1"
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
