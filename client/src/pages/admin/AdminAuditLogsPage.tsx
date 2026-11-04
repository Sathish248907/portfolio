import React, { useState, useEffect } from 'react';
import { 
  ScrollText, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  Lock
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { AuditLogEntry } from '../../types';
import { Button } from '../../components/common/Button';
import { cn } from '../../lib/utils';
import { FALLBACK_AUDIT_LOGS } from '../../services/api/adminApi';

export const AdminAuditLogsPage: React.FC = () => {
  const { token } = useAuth();
  const [logs, setLogs] = useState<AuditLogEntry[]>(FALLBACK_AUDIT_LOGS);
  const [total, setTotal] = useState<number>(FALLBACK_AUDIT_LOGS.length);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [resultFilter, setResultFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await api.getAuditLogs(token || '', {
        search,
        module: moduleFilter,
        result: resultFilter,
        startDate,
        endDate,
        page,
        limit: 30,
      });

      if (res?.data) {
        setLogs(res.data);
        if (res.pagination?.total) setTotal(res.pagination.total);
      }
    } catch (e) {
      console.warn('Audit logs fetch fallback', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [moduleFilter, resultFilter, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLogs();
  };

  const handleExportCsv = async () => {
    setExporting(true);
    try {
      await api.exportAuditLogsCsv(token || '', {
        module: moduleFilter,
        result: resultFilter,
        startDate,
        endDate,
      });
    } catch (err) {
      console.error('Failed to export CSV', err);
    } finally {
      setExporting(false);
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> SUCCESS
          </span>
        );
      case 'failure':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" /> FAILED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> WARNING
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-bold text-white">System Audit & Compliance Log</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Append-Only Immutable
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Tamper-evident record of administrative operations, authentication events, content modifications, and lead triage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchLogs}
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh
          </Button>
          <Button
            onClick={handleExportCsv}
            variant="champagne"
            size="sm"
            disabled={exporting}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            {exporting ? 'Generating CSV...' : 'Export Audit Report'}
          </Button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-charcoal-850/80 p-4 rounded-xl border border-sage-700/30 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit actions, summaries, or actor emails..."
            className="w-full bg-charcoal-900 border border-sage-700/40 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-champagne-400"
          />
        </form>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Module:</span>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="bg-charcoal-900 border border-sage-700/40 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-champagne-400"
            >
              <option value="all">All Modules</option>
              <option value="auth">Auth & Sessions</option>
              <option value="users">User Management</option>
              <option value="roles">Roles & Perms</option>
              <option value="cms">Content CMS</option>
              <option value="inquiries">Project Inquiries</option>
              <option value="profile">Staff Profile</option>
              <option value="settings">System Settings</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span>Result:</span>
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
              className="bg-charcoal-900 border border-sage-700/40 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-champagne-400"
            >
              <option value="all">All Results</option>
              <option value="success">Success</option>
              <option value="failure">Failure / Blocked</option>
              <option value="warning">Warning</option>
            </select>
          </div>

          <button
            type="button"
            onClick={fetchLogs}
            className="px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-champagne-300 border border-teal-500/30 text-xs font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-sage-700/30 bg-charcoal-900/80 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3.5 px-4 w-40">Timestamp</th>
                <th className="py-3.5 px-4 w-44">Actor</th>
                <th className="py-3.5 px-4 w-40">Action</th>
                <th className="py-3.5 px-4 w-28">Module</th>
                <th className="py-3.5 px-4 w-24">Result</th>
                <th className="py-3.5 px-4">Event Summary</th>
                <th className="py-3.5 px-4 w-28 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sage-700/20 text-xs">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                    No administrative audit logs match your query.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  return (
                    <tr key={log._id || log.id} className="hover:bg-white/[0.015] transition-colors">
                      <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                        <div className="text-slate-500 text-[10px]">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white block truncate">{log.actorName || 'System'}</span>
                        <span className="text-[10px] font-mono text-slate-400 truncate block">{log.actorEmail}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-charcoal-900 border border-sage-700/30 text-champagne-300 inline-block truncate max-w-[150px]">
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono uppercase text-[10px] text-slate-300">
                          {log.module}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">{getResultBadge(log.result)}</td>

                      <td className="py-3.5 px-4">
                        <p className="text-slate-200 line-clamp-2 leading-relaxed">{log.changeSummary}</p>
                      </td>

                      <td className="py-3.5 px-4 text-right text-slate-400 font-mono text-[11px]">
                        {log.ipAddress || '127.0.0.1'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination summary */}
        <div className="p-4 border-t border-sage-700/30 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-[11px]">
            Displaying {logs.length} of {total} recorded events
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded bg-charcoal-900 border border-sage-700/40 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-charcoal-800"
            >
              Previous
            </button>
            <span className="font-mono text-[11px] text-white">Page {page}</span>
            <button
              disabled={logs.length < 30}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-charcoal-900 border border-sage-700/40 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-charcoal-800"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

