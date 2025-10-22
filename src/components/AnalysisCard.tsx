import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Download, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

interface AnalysisResult {
  rows: number;
  columns: number;
  prediction: string;
  attack_type: string;
  confidence: number;
  top_features: { name: string; importance: number }[];
}

interface Props {
  result: AnalysisResult;
  fileName: string;
}

const AnalysisCard = ({ result, fileName }: Props) => {
  const isDDoS = result.prediction === 'DDoS';

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('analysis-card');
      if (!element) return;

      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${fileName}-analysis.pdf`);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  const handleDownloadJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}-analysis.json`;
    link.click();
    toast.success('JSON downloaded successfully');
  };

  return (
    <motion.div
      id="analysis-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 rounded-2xl border border-border/50"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          {isDDoS ? (
            <AlertTriangle className="w-12 h-12 text-destructive" />
          ) : (
            <CheckCircle className="w-12 h-12 text-accent" />
          )}
          <div>
            <h2 className="text-2xl font-bold">{result.prediction} Traffic Detected</h2>
            {isDDoS && <p className="text-muted-foreground">Attack Type: {result.attack_type}</p>}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-secondary/50">
          <p className="text-sm text-muted-foreground mb-1">Total Rows</p>
          <p className="text-2xl font-bold">{result.rows.toLocaleString()}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/50">
          <p className="text-sm text-muted-foreground mb-1">Features</p>
          <p className="text-2xl font-bold">{result.columns}</p>
        </div>
        <div className="p-4 rounded-lg bg-secondary/50">
          <p className="text-sm text-muted-foreground mb-1">Confidence</p>
          <p className="text-2xl font-bold">{(result.confidence * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Confidence Score</span>
          <span className="text-sm text-muted-foreground">
            {(result.confidence * 100).toFixed(1)}%
          </span>
        </div>
        <Progress value={result.confidence * 100} className="h-3" />
      </div>

      {/* Top Features Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Top Influential Features</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={result.top_features}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="importance" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button onClick={handleDownloadPDF} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={handleDownloadJSON} variant="outline">
          <FileJson className="w-4 h-4 mr-2" />
          Export JSON
        </Button>
      </div>
    </motion.div>
  );
};

export default AnalysisCard;
