import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  User, 
  Building, 
  Mail, 
  Phone, 
  DollarSign, 
  Calendar,
  X,
  Save,
  RefreshCw
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { ProjectInquiry, InquiryStatus } from '../../types';
import { Button } from '../../components/common/Button';

const allStatuses: InquiryStatus[] = [
  'New',
  'Reviewing',
  'Contacted',
  'Qualified',
  'Proposal Sent',
  'Won',
  'Lost',
  'Archived',
];

export const AdminInquiriesPage: React.FC = () => {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notesInput, setNotesInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminInquiries(token || '');
      setInquiries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleSelectInquiry = (inquiry: ProjectInquiry) => {
    setSelectedInquiry(inquiry);
    setNotesInput(inquiry.notes || '');
  };

  const handleUpdateStatus = async (newStatus: InquiryStatus) => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    try {
      await api.updateInquiryStatus(token || '', selectedInquiry.referenceNumber, newStatus, notesInput);
      setSelectedInquiry((prev) => prev ? { ...prev, status: newStatus, notes: notesInput } : null);
      fetchInquiries();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    try {
      await api.updateInquiryStatus(token || '', selectedInquiry.referenceNumber, selectedInquiry.status, notesInput);
      setSelectedInquiry((prev) => prev ? { ...prev, notes: notesInput } : null);
      fetchInquiries();
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesSearch = 
      item.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Project Inquiries & Lead Management</h1>
          <p className="text-slate-400 text-xs">Review client specifications, assign statuses, and manage commercial proposals.</p>
        </div>

        <Button
          onClick={fetchInquiries}
          variant="secondary"
          size="sm"
          leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
        >
          Reload Inquiries
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-charcoal-850/90 p-4 rounded-xl border border-sage-700/30 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-md">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reference, client, or company..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-charcoal-900 border border-sage-700/40 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-champagne-400"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
              statusFilter === 'All' ? 'bg-champagne-500 text-charcoal-950 font-bold' : 'bg-charcoal-900 text-slate-400 hover:text-white border border-sage-700/30'
            }`}
          >
            All ({inquiries.length})
          </button>
          {allStatuses.slice(0, 5).map((status) => {
            const count = inquiries.filter((i) => i.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                  statusFilter === status ? 'bg-champagne-500 text-charcoal-950 font-bold' : 'bg-charcoal-900 text-slate-400 hover:text-white border border-sage-700/30'
                }`}
              >
                {status} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      <div className="bg-charcoal-850/90 rounded-2xl border border-sage-700/30 overflow-hidden shadow-md">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs font-mono">
            No inquiries match your current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-sage-700/30">
                <tr>
                  <th className="px-5 py-3">Reference ID</th>
                  <th className="px-5 py-3">Client & Company</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Budget</th>
                  <th className="px-5 py-3">Timeline</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-700/20 font-sans">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.referenceNumber} className="hover:bg-charcoal-900/50 transition-colors">
                    <td className="px-5 py-3 font-mono font-bold text-champagne-400">
                      {inquiry.referenceNumber}
                    </td>
                    <td className="px-5 py-3">
                      <div className="font-medium text-white">{inquiry.clientName}</div>
                      <div className="text-slate-400 text-[11px]">{inquiry.companyName}</div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded bg-charcoal-900 border border-sage-700/40 text-slate-300 text-[10px] font-mono">
                        {inquiry.service}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-300 font-mono text-[11px]">
                      {inquiry.budgetRange.split(' ')[0]}
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-[11px]">
                      {inquiry.timeline}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                        inquiry.status === 'New'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : inquiry.status === 'Won'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : inquiry.status === 'Lost'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                          : 'bg-teal-500/10 text-teal-300 border border-teal-500/30'
                      }`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleSelectInquiry(inquiry)}
                        className="px-2.5 py-1 rounded bg-charcoal-900 hover:bg-charcoal-800 border border-sage-700/40 text-champagne-400 text-[11px] font-mono transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL / DRAWER */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-850 max-w-2xl w-full p-6 sm:p-8 rounded-2xl border border-sage-700/40 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-sage-700/30 pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-champagne-400 uppercase">Inquiry Dossier</span>
                <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <span>{selectedInquiry.referenceNumber}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 font-mono">
                    {selectedInquiry.service}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono bg-charcoal-900 p-4 rounded-xl border border-sage-700/30">
              <div>
                <span className="text-slate-500 block text-[10px]">CLIENT</span>
                <span className="text-slate-200">{selectedInquiry.clientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">COMPANY</span>
                <span className="text-slate-200">{selectedInquiry.companyName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">EMAIL</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-champagne-400 hover:underline truncate block">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">PHONE</span>
                <span className="text-slate-300">{selectedInquiry.phoneNumber || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">BUDGET</span>
                <span className="text-slate-300">{selectedInquiry.budgetRange}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TIMELINE</span>
                <span className="text-slate-300">{selectedInquiry.timeline}</span>
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 block">Submitted Specifications:</span>
              <div className="p-4 rounded-xl bg-charcoal-900/60 border border-sage-700/30 text-xs text-slate-200 leading-relaxed font-sans">
                {selectedInquiry.projectRequirements}
              </div>
            </div>

            {/* Status Transition Workflow */}
            <div className="space-y-2 pt-2 border-t border-sage-700/30">
              <span className="text-xs font-mono uppercase text-champagne-400 block">Lead Pipeline Status:</span>
              <div className="flex flex-wrap gap-1.5">
                {allStatuses.map((st) => (
                  <button
                    key={st}
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedInquiry.status === st
                        ? 'bg-champagne-500 text-charcoal-950 font-bold ring-2 ring-champagne-400/40'
                        : 'bg-charcoal-900 text-slate-400 hover:text-white hover:bg-charcoal-800 border border-sage-700/40'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 block">Internal Lead Notes:</span>
              <textarea
                rows={3}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="E.g., Engineering lead assigned: Alex. Initial call scheduled for Friday. Needs ROS 2 Gazebo simulation demo."
                className="w-full px-3 py-2 rounded-xl bg-charcoal-900 border border-sage-700/40 text-xs text-slate-200 focus:outline-none focus:border-champagne-400"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveNotes}
                  variant="secondary"
                  size="sm"
                  isLoading={isUpdating}
                  leftIcon={<Save className="w-3.5 h-3.5" />}
                >
                  Save Internal Notes
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
