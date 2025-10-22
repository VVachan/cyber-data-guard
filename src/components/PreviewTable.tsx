import { motion } from 'framer-motion';

interface Props {
  data: any[];
  headers: string[];
}

const PreviewTable = ({ data, headers }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-xl border border-border/50"
    >
      <h3 className="text-lg font-semibold mb-4">CSV Preview (First 10 Rows)</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3 text-left font-semibold text-muted-foreground">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                {headers.map((header, colIdx) => (
                  <td key={colIdx} className="px-4 py-3">
                    {row[header] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default PreviewTable;
