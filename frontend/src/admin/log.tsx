// SystemLogs.tsx
import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { format } from "date-fns";

interface SystemLog {
  _id: string;
  timestamp: string;
  level: string;
  message: string;
  metadata?: Record<string, any>;
}

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get<SystemLog[]>("/superadmin/system-logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading logs...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">System Logs</h2>
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log._id}
            className={`p-3 rounded-lg border-l-4 ${
              log.level === "error"
                ? "border-red-500 bg-red-50"
                : log.level === "warn"
                ? "border-yellow-500 bg-yellow-50"
                : "border-blue-500 bg-white"
            } shadow-sm`}
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">{log.level.toUpperCase()}</span>
              <span className="text-gray-500">
                {format(new Date(log.timestamp), "PP p")}
              </span>
            </div>
            <p className="text-gray-700 truncate">{log.message}</p>
            {log.metadata && (
              <pre className="mt-1 text-xs text-gray-500 overflow-x-auto truncate">
                {JSON.stringify(log.metadata, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLogs;
