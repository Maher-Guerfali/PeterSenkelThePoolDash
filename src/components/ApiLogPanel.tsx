import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash2, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { ApiLog } from '@/types/product';
import { PinkWave } from '@/components/PinkWave';

interface ApiLogPanelProps {
  logs: ApiLog[];
  onClearLogs: () => void;
}

const methodColors = {
  GET: 'bg-success/10 text-success border border-success/30',
  POST: 'bg-primary/10 text-primary border border-primary/30',
  PATCH: 'bg-warning/10 text-warning border border-warning/30',
  DELETE: 'bg-destructive/10 text-destructive border border-destructive/30',
};

const getStatusIcon = (status: number) => {
  if (status >= 200 && status < 300) {
    return <CheckCircle2 className="w-4 h-4 text-success" />;
  }
  if (status >= 400 && status < 500) {
    return <AlertCircle className="w-4 h-4 text-warning" />;
  }
  return <XCircle className="w-4 h-4 text-destructive" />;
};

export function ApiLogPanel({ logs, onClearLogs }: ApiLogPanelProps) {
  return (
    <div className="h-full flex flex-col bg-card border-2 border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Request Logs</h3>
            <span className="text-xs text-muted-foreground">({logs.length})</span>
          </div>
          <PinkWave className="w-16 h-4 text-pink mt-1" />
        </div>
        <Button variant="ghost" size="sm" onClick={onClearLogs} className="text-muted-foreground hover:text-foreground">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Logs */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <Clock className="w-6 h-6 mb-2 opacity-50" />
              <p className="text-xs uppercase tracking-wider">No requests yet</p>
            </div>
          ) : (
            logs.map((log, index) => (
              <div
                key={log.id}
                className="p-3 bg-muted/30 border border-border animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 text-[10px] font-bold ${methodColors[log.method]}`}>
                      {log.method}
                    </span>
                    <code className="text-xs text-muted-foreground truncate max-w-[120px]">{log.endpoint}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(log.status)}
                    <span className="text-xs font-mono text-muted-foreground">{log.status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.duration}ms
                  </span>
                  <span>{log.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
