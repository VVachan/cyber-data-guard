import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileSpreadsheet, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Papa from 'papaparse';
import { toast } from 'sonner';
import AnalysisCard from '@/components/AnalysisCard';
import PreviewTable from '@/components/PreviewTable';

interface AnalysisResult {
  rows: number;
  columns: number;
  prediction: string;
  attack_type: string;
  confidence: number;
  top_features: { name: string; importance: number }[];
}

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.csv')) {
      handleFileSelect(droppedFile);
    } else {
      toast.error('Please upload a CSV file');
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.size > 300 * 1024 * 1024) {
      toast.error('File size exceeds 300 MB');
      return;
    }
    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = (file: File) => {
    Papa.parse(file, {
      header: true,
      preview: 10,
      complete: (results) => {
        setHeaders(results.meta.fields || []);
        setPreviewData(results.data);
        toast.success('CSV parsed successfully');
      },
      error: () => {
        toast.error('Failed to parse CSV');
      },
    });
  };

  const simulateAnalysis = (): AnalysisResult => {
    const predictions = ['Normal', 'DDoS'];
    const attackTypes = ['SYN Flood', 'UDP Flood', 'HTTP Flood', 'ICMP Flood'];
    const features = [
      'Flow Packets/s',
      'Avg Fwd Segment Size',
      'Packet Length Std',
      'Flow IAT Mean',
      'Fwd Packet Length Mean',
    ];

    const prediction = predictions[Math.random() > 0.5 ? 1 : 0];
    const isPredictionAttack = prediction === 'DDoS';

    return {
      rows: previewData.length * 100,
      columns: headers.length,
      prediction,
      attack_type: isPredictionAttack ? attackTypes[Math.floor(Math.random() * attackTypes.length)] : 'None',
      confidence: 0.85 + Math.random() * 0.13,
      top_features: features.map((name, idx) => ({
        name,
        importance: 0.1 + (0.25 - idx * 0.05) + Math.random() * 0.1,
      })),
    };
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error('Please upload a file first');
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis steps
    const steps = ['Validating', 'Parsing', 'Analyzing', 'Generating Insights'];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProgress((i + 1) * 25);
      toast.info(steps[i] + '...');
    }

    const result = simulateAnalysis();
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setProgress(100);

    // Save to localStorage
    const uploads = JSON.parse(localStorage.getItem('dataguard_uploads') || '[]');
    uploads.push({
      fileName: file.name,
      date: new Date().toISOString(),
      prediction: result.prediction,
      confidence: result.confidence,
    });
    localStorage.setItem('dataguard_uploads', JSON.stringify(uploads));

    toast.success('Analysis complete!');
  };

  const handleClear = () => {
    setFile(null);
    setPreviewData([]);
    setHeaders([]);
    setAnalysisResult(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Upload Dataset</h1>
          <p className="text-muted-foreground">
            Upload your CSV file to analyze for potential DDoS attacks
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`glass-card border-2 border-dashed rounded-xl p-12 text-center transition-all ${
            isDragging ? 'border-primary bg-primary/10 glow-primary' : 'border-border/50'
          }`}
        >
          <input
            type="file"
            accept=".csv"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <FileSpreadsheet className="w-16 h-16 text-primary mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">
              {file ? file.name : 'Drop your CSV file here'}
            </h3>
            <p className="text-muted-foreground mb-4">or click to browse</p>
            <p className="text-sm text-muted-foreground">Maximum file size: 300 MB</p>
          </label>
        </motion.div>

        {/* Preview Table */}
        {previewData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <PreviewTable data={previewData} headers={headers} />
          </motion.div>
        )}

        {/* Action Buttons */}
        {file && !analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Button onClick={handleAnalyze} disabled={isAnalyzing} size="lg">
              <UploadIcon className="w-5 h-5 mr-2" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
            </Button>
            <Button onClick={handleClear} variant="outline" size="lg">
              <Trash2 className="w-5 h-5 mr-2" />
              Clear
            </Button>
          </motion.div>
        )}

        {/* Progress Bar */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              {progress}% Complete
            </p>
          </motion.div>
        )}

        {/* Analysis Result */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <AnalysisCard result={analysisResult} fileName={file?.name || ''} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Upload;
