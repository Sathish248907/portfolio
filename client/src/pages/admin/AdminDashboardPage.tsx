import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Briefcase, 
  Layers, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  RefreshCw
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { ProjectInquiry } from '../../types';
import { projectsData } from '../../data/projectsData';
import { Button } from '../../components/common/Button';

export const AdminDashboardPage: React.FC = () => {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminInquiries(token || '');
      setInquiries(data);
    } catch {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const newCount = inquiries.filter((i) => i.status === 'New').length;
  const inProgressCount = inquiries.filter((i) => ['Reviewing', 'Contacted', 'Qualified', 'Proposal Sent'].includes(i.status)).length;
  const wonCount = inquiries.filter((i) => i.status === 'Won').length;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Engineering Control Dashboard</h1>
          <p className="text-slate-400 text-xs">Real-time status of commercial leads, project prototypes, and dispatch operations.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={fetchInquiries}
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Refresh Data
          </Button>
          <Button to="/admin/inquiries" variant="champagne" size="sm">
            Manage Inquiries
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">TOTAL INQUIRIES</span>
            <Inbox className="w-4 h-4 text-champagne-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-white block">{inquiries.length}</span>
          <span className="text-[11px] text-champagne-400 font-mono">All-time logged</span>
        </div>

        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">NEW ACTION REQUIRED</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-amber-300 block">{newCount}</span>
          <span className="text-[11px] text-slate-400 font-mono">Awaiting lead review</span>
        </div>

        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">ACTIVE PIPELINE</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-teal-300 block">{inProgressCount}</span>
          <span className="text-[11px] text-slate-400 font-mono">Proposal / Scoping stage</span>
        </div>

        <div className="bg-charcoal-850/90 p-5 rounded-2xl border border-sage-700/30 space-y-1 shadow-md">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">LAB PROTOTYPES</span>
            <Briefcase className="w-4 h-4 text-champagne-400" />
          </div>
          <span className="font-heading text-3xl font-bold text-champagne-300 block">{projectsData.length}</span>
          <span className="text-[11px] text-slate-400 font-mono">Published Case Studies</span>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 p-6 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-sage-700/30 pb-4">
          <div className="space-y-0.5">
            <h2 className="font-heading text-lg font-bold text-white">Recent Project Inquiries</h2>
            <p className="text-slate-400 text-xs">Direct inbound leads submitted via the multi-step intake flow.</p>
          </div>
          <Link to="/admin/inquiries" className="text-xs text-champagne-400 hover:text-champagne-300 font-mono flex items-center gap-1">
            <span>View All &rarr;</span>
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs font-mono">
            No inquiries recorded yet. Test by submitting one through <Link to="/start-a-project" className="text-champagne-400 underline">Start a Project</Link>.
          </div>
        ) : (
          <div className="divide-y divide-sage-700/20">
            {inquiries.slice(0, 5).map((inquiry) => (
              <div key={inquiry.referenceNumber} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-champagne-400 font-semibold">{inquiry.referenceNumber}</span>
                    <span className="px-2 py-0.5 rounded bg-charcoal-900 border border-sage-700/40 text-slate-300 text-[10px] font-mono">
                      {inquiry.service}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      inquiry.status === 'New'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : inquiry.status === 'Won'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium">
                    {inquiry.clientName} &bull; <span className="text-slate-400">{inquiry.companyName}</span>
                  </p>
                  <p className="text-slate-400 text-[11px] line-clamp-1">{inquiry.projectRequirements}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-slate-500 font-mono text-[10px]">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    to="/admin/inquiries"
                    className="p-1.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 border border-sage-700/40 text-slate-300 hover:text-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
