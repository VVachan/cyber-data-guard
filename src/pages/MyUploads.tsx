import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, Calendar, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Upload {
  fileName: string;
  date: string;
  prediction: string;
  confidence: number;
}

const MyUploads = () => {
  const [uploads, setUploads] = useState<Upload[]>([]);

  useEffect(() => {
    const storedUploads = JSON.parse(localStorage.getItem('dataguard_uploads') || '[]');
    setUploads(storedUploads);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">My Uploads</h1>
          <p className="text-muted-foreground">
            View your uploaded datasets and analysis results
          </p>
        </motion.div>

        {uploads.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FileSpreadsheet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">No uploads yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Upload your first dataset to see it here
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {uploads.map((upload, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <FileSpreadsheet className="w-10 h-10 text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">{upload.fileName}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(upload.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          {(upload.confidence * 100).toFixed(1)}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={upload.prediction === 'DDoS' ? 'destructive' : 'default'}
                    className="w-fit"
                  >
                    {upload.prediction}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyUploads;
