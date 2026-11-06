import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  User, 
  Building, 
  Building2,
  Mail, 
  Phone, 
  DollarSign, 
  Calendar,
  X,
  Save,
  RefreshCw,
  Download,
  Trash2,
  Tag,
  Briefcase,
  AlertTriangle,
  ArrowUpDown,
  Send,
  MessageSquare,
  History,
  Paperclip,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Globe,
  FileText,
  Activity,
  ShieldCheck,
  Layers,
  Sparkles,
  CheckSquare,
  Cpu,
  FileCode,
  Lock
} from 'lucide-react';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { ProjectInquiry, InquiryStatus, InquiryMetrics } from '../../types';
import { Button } from '../../components/common/Button';
import { ClientCommunication } from '../../components/inquiry/ClientCommunication';

const allStatuses: { value: InquiryStatus; label: string; color: string }[] = [
  { value: 'NEW', label: 'New', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  { value: 'UNDER_REVIEW', label: 'Under Review', color: 'bg-blue-500/10 text-blue-300 border-blue-500/30' },
  { value: 'NEED_MORE_INFORMATION', label: 'Need More Info', color: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/30' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' },
  { value: 'REVIEWING', label: 'Reviewing', color: 'bg-blue-500/10 text-blue-300 border-blue-500/30' },
  { value: 'QUALIFIED', label: 'Qualified', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  { value: 'IN_DISCUSSION', label: 'In Discussion', color: 'bg-purple-500/10 text-purple-300 border-purple-500/30' },
  { value: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30' },
  { value: 'CONVERTED', label: 'Converted', color: 'bg-teal-500/10 text-teal-300 border-teal-500/30' },
  { value: 'CLOSED', label: 'Closed', color: 'bg-slate-500/10 text-slate-400 border-slate-500/30' },
  { value: 'REJECTED', label: 'Rejected', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
];

const teamMembers = [
  { name: 'Unassigned', email: '', role: 'None' },
  { name: 'Sathish', email: 'sathish@peacehaven.tech', role: 'Web Development Lead' },
  { name: 'Vishal', email: 'vishal@peacehaven.tech', role: 'Web Development Lead' },
  { name: 'PH Hari', email: 'phhari@peacehaven.tech', role: 'FinTech Principal' },
  { name: 'Dhanush', email: 'dhanush@peacehaven.tech', role: 'Robotics & Automation Lead' },
  { name: 'Albin', email: 'albin@peacehaven.tech', role: 'Robotics & Automation Lead' },
  { name: 'Swarna', email: 'swarna@peacehaven.tech', role: 'Healthcare Systems Architect' },
  { name: 'Shyam', email: 'shyam@peacehaven.tech', role: 'Healthcare Systems Architect' },
];

const normalizeAssigned = (
  assigned?: { name?: string; email?: string; role?: string } | null,
  disciplines?: string[]
): { name: string; email: string; role: string } => {
  if (!assigned || !assigned.name || assigned.name === 'Unassigned') {
    return { name: 'Unassigned', email: '', role: 'None' };
  }
  const n = assigned.name.trim();
  if (n.includes('Alex Rivera') || n.includes('Marcus Sterling')) {
    if (disciplines && disciplines.some((d) => /fintech/i.test(d))) {
      return { name: 'PH Hari', email: 'phhari@peacehaven.tech', role: 'FinTech Principal' };
    }
    if (disciplines && disciplines.some((d) => /web/i.test(d))) {
      return { name: 'Sathish', email: 'sathish@peacehaven.tech', role: 'Web Development Lead' };
    }
    return { name: 'Unassigned', email: '', role: 'None' };
  }
  if (n.includes('Maya Chen')) {
    return { name: 'PH Hari', email: 'phhari@peacehaven.tech', role: 'FinTech Principal' };
  }
  if (n.includes('David Kim')) {
    return { name: 'Dhanush', email: 'dhanush@peacehaven.tech', role: 'Robotics & Automation Lead' };
  }
  if (n.includes('Sarah Vance')) {
    return { name: 'Swarna', email: 'swarna@peacehaven.tech', role: 'Healthcare Systems Architect' };
  }
  if (n.includes('Sathish & Vishal')) {
    return { name: 'Sathish', email: 'sathish@peacehaven.tech', role: 'Web Development Lead' };
  }
  if (n.includes('Dhanush & Albin')) {
    return { name: 'Dhanush', email: 'dhanush@peacehaven.tech', role: 'Robotics & Automation Lead' };
  }
  if (n.includes('Swarna & Shyam')) {
    return { name: 'Swarna', email: 'swarna@peacehaven.tech', role: 'Healthcare Systems Architect' };
  }
  const match = teamMembers.find((m) => m.name.toLowerCase() === n.toLowerCase());
  return match || { name: assigned.name, email: assigned.email || '', role: assigned.role || '' };
};

const allServiceOptions = [
  'All',
  'Web Development',
  'FinTech',
  'Robotics & Automation',
  'Drone Technology',
  'Healthcare Solutions',
  'US Staffing',
  'Other',
];

const allIndustryOptions = [
  'All',
  'Information Technology & Software',
  'Banking & Financial Services',
  'Manufacturing & Industrial Automation',
  'Healthcare & Medical Technology',
  'Agriculture & Agritech',
  'Real Estate & Property Technology',
  'Logistics & Supply Chain',
  'Retail & E-commerce',
  'Human Resources & Staffing',
  'Education & EdTech',
  'Other',
];

export const AdminInquiriesPage: React.FC = () => {
  const { token, user } = useAuth();
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [metrics, setMetrics] = useState<InquiryMetrics>({
    total: 0,
    new: 0,
    inProgress: 0,
    qualified: 0,
    converted: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);

  // Filters & Search
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Internal Notes State
  const [newNoteText, setNewNoteText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inquiryToDelete, setInquiryToDelete] = useState<ProjectInquiry | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyText = (text: string, type: 'ref' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'ref') {
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const getInitials = (name?: string) => {
    if (!name || name === 'Unassigned') return 'U';
    const parts = name.split(/[\s&]+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.getAdminInquiriesWithMetrics(token || '');
      const normalizedInquiries = (res.inquiries || []).map((item) => ({
        ...item,
        assignedTo: normalizeAssigned(item.assignedTo, item.selectedServices || [item.service]),
      }));
      setInquiries(normalizedInquiries);
      setMetrics(res.metrics);
      if (selectedInquiry) {
        const updatedSelected = normalizedInquiries.find(
          (i) => i.referenceNumber === selectedInquiry.referenceNumber || i._id === selectedInquiry._id
        );
        if (updatedSelected) {
          setSelectedInquiry(updatedSelected);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleSelectInquiry = (inquiry: ProjectInquiry) => {
    setSelectedInquiry({
      ...inquiry,
      assignedTo: normalizeAssigned(inquiry.assignedTo, inquiry.selectedServices || [inquiry.service]),
    });
    setNewNoteText('');
  };

  const handleUpdateStatus = async (newStatus: InquiryStatus) => {
    if (!selectedInquiry) return;
    setIsUpdating(true);
    try {
      await api.updateInquiry(token || '', selectedInquiry.referenceNumber, { status: newStatus });
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      await fetchInquiries();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignTeamMember = async (memberName: string) => {
    if (!selectedInquiry) return;
    const member = teamMembers.find((m) => m.name === memberName) || { name: memberName, email: '', role: '' };
    setIsUpdating(true);
    try {
      await api.updateInquiry(token || '', selectedInquiry.referenceNumber, {
        assignedTo: member,
      });
      setSelectedInquiry((prev) => (prev ? { ...prev, assignedTo: member } : null));
      await fetchInquiries();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInquiry || !newNoteText.trim()) return;
    setIsUpdating(true);
    try {
      const author = user?.name || user?.email || 'Engineering Lead';
      await api.addInquiryNote(token || '', selectedInquiry.referenceNumber, newNoteText.trim(), author);
      setNewNoteText('');
      await fetchInquiries();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteInquiry = async () => {
    if (!inquiryToDelete) return;
    setIsUpdating(true);
    try {
      await api.deleteInquiry(token || '', inquiryToDelete.referenceNumber);
      setDeleteModalOpen(false);
      setInquiryToDelete(null);
      if (selectedInquiry?.referenceNumber === inquiryToDelete.referenceNumber) {
        setSelectedInquiry(null);
      }
      await fetchInquiries();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleExportCsv = () => {
    // Generate CSV from current inquiries
    const headers = [
      'Inquiry ID',
      'Submission Date',
      'Client Name',
      'Company Name',
      'Job Title',
      'Email',
      'Phone',
      'Country',
      'Selected Services',
      'Industry',
      'Project Title',
      'Project Description',
      'Deliverables',
      'Timeline',
      'Budget Range',
      'Start Preference',
      'Status',
      'Assigned To',
    ];

    const escapeCsv = (str: string | undefined | null) => {
      if (str === null || str === undefined) return '""';
      return `"${String(str).replace(/"/g, '""')}"`;
    };

    const rows = filteredInquiries.map((i) => [
      escapeCsv(i.referenceNumber),
      escapeCsv(i.createdAt),
      escapeCsv(i.clientName),
      escapeCsv(i.companyName),
      escapeCsv(i.jobTitle || ''),
      escapeCsv(i.email),
      escapeCsv(i.phoneNumber || ''),
      escapeCsv(i.country || ''),
      escapeCsv((i.selectedServices && i.selectedServices.length > 0 ? i.selectedServices.join('; ') : i.service) || ''),
      escapeCsv(i.industry || ''),
      escapeCsv(i.projectTitle || ''),
      escapeCsv(i.projectRequirements || i.projectDescription || ''),
      escapeCsv(i.deliverables || ''),
      escapeCsv(i.timeline),
      escapeCsv(i.budgetRange),
      escapeCsv(i.startPreference || ''),
      escapeCsv(i.status),
      escapeCsv(i.assignedTo?.name || 'Unassigned'),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `peace-haven-inquiries-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredInquiries = inquiries
    .filter((item) => {
      // Status filter
      const itemStatus = (item.status || '').toUpperCase();
      let matchesStatus = true;
      if (statusFilter !== 'All') {
        if (statusFilter === 'NEW') matchesStatus = itemStatus === 'NEW';
        else if (statusFilter === 'IN_PROGRESS') {
          matchesStatus = ['REVIEWING', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'CONTACTED'].includes(itemStatus);
        } else if (statusFilter === 'QUALIFIED') matchesStatus = itemStatus === 'QUALIFIED';
        else if (statusFilter === 'CONVERTED') matchesStatus = ['CONVERTED', 'WON'].includes(itemStatus);
        else if (statusFilter === 'REJECTED') {
          matchesStatus = ['CLOSED', 'REJECTED', 'LOST', 'ARCHIVED'].includes(itemStatus);
        } else {
          matchesStatus = itemStatus === statusFilter.toUpperCase();
        }
      }

      // Service filter
      let matchesService = true;
      if (serviceFilter !== 'All') {
        const itemServices = item.selectedServices || [item.service];
        matchesService = itemServices.some((s) => s.toLowerCase().includes(serviceFilter.toLowerCase()));
      }

      // Industry filter
      let matchesIndustry = true;
      if (industryFilter !== 'All') {
        matchesIndustry = (item.industry || '').toLowerCase() === industryFilter.toLowerCase();
      }

      // Search query
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          item.referenceNumber.toLowerCase().includes(q) ||
          item.clientName.toLowerCase().includes(q) ||
          item.companyName.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          (item.projectTitle || '').toLowerCase().includes(q) ||
          (item.industry || '').toLowerCase().includes(q) ||
          (item.service || '').toLowerCase().includes(q);
      }

      return matchesStatus && matchesService && matchesIndustry && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const getStatusBadge = (status: string) => {
    const upper = (status || '').toUpperCase();
    const found = allStatuses.find((s) => s.value === upper);
    if (found) {
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border ${found.color} shadow-sm`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {found.label}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-medium border bg-charcoal-800 text-slate-300 border-sage-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-champagne-400 uppercase tracking-widest block font-bold">
            Administrative Portal
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Project Inquiries & Lead Management
          </h1>
          <p className="text-slate-400 text-xs font-light mt-0.5">
            Review client specifications, allocate engineering leads, track statuses, and export proposals.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            onClick={handleExportCsv}
            variant="secondary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>

          <Button
            onClick={fetchInquiries}
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />}
          >
            Reload
          </Button>
        </div>
      </div>

      {/* Overview Metrics Cards (Phase 6 Specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => setStatusFilter('All')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === 'All'
              ? 'bg-charcoal-800 border-champagne-400 ring-2 ring-champagne-400/20'
              : 'bg-charcoal-850/90 border-sage-500/20 hover:border-sage-500/40'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Inquiries</span>
          <span className="font-mono text-2xl font-bold text-white mt-1 block">{metrics.total}</span>
        </div>

        <div
          onClick={() => setStatusFilter('NEW')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === 'NEW'
              ? 'bg-charcoal-800 border-amber-400 ring-2 ring-amber-400/20'
              : 'bg-charcoal-850/90 border-sage-500/20 hover:border-sage-500/40'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-amber-400 block">New Inquiries</span>
          <span className="font-mono text-2xl font-bold text-amber-300 mt-1 block">{metrics.new}</span>
        </div>

        <div
          onClick={() => setStatusFilter('IN_PROGRESS')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === 'IN_PROGRESS'
              ? 'bg-charcoal-800 border-blue-400 ring-2 ring-blue-400/20'
              : 'bg-charcoal-850/90 border-sage-500/20 hover:border-sage-500/40'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-blue-400 block">In Progress</span>
          <span className="font-mono text-2xl font-bold text-blue-300 mt-1 block">{metrics.inProgress}</span>
        </div>

        <div
          onClick={() => setStatusFilter('QUALIFIED')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === 'QUALIFIED'
              ? 'bg-charcoal-800 border-emerald-400 ring-2 ring-emerald-400/20'
              : 'bg-charcoal-850/90 border-sage-500/20 hover:border-sage-500/40'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-emerald-400 block">Qualified Leads</span>
          <span className="font-mono text-2xl font-bold text-emerald-300 mt-1 block">{metrics.qualified}</span>
        </div>

        <div
          onClick={() => setStatusFilter('CONVERTED')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === 'CONVERTED'
              ? 'bg-charcoal-800 border-teal-400 ring-2 ring-teal-400/20'
              : 'bg-charcoal-850/90 border-sage-500/20 hover:border-sage-500/40'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-teal-400 block">Converted</span>
          <span className="font-mono text-2xl font-bold text-teal-300 mt-1 block">{metrics.converted}</span>
        </div>

        <div
          onClick={() => setStatusFilter('REJECTED')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            statusFilter === 'REJECTED'
              ? 'bg-charcoal-800 border-rose-400 ring-2 ring-rose-400/20'
              : 'bg-charcoal-850/90 border-sage-500/20 hover:border-sage-500/40'
          }`}
        >
          <span className="text-[10px] font-mono uppercase text-rose-400 block">Closed / Rejected</span>
          <span className="font-mono text-2xl font-bold text-rose-300 mt-1 block">{metrics.rejected}</span>
        </div>
      </div>

      {/* Extended Pipeline Stage Tracking Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div
          onClick={() => setStatusFilter('UNDER_REVIEW')}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
            statusFilter === 'UNDER_REVIEW'
              ? 'bg-charcoal-800 border-blue-400 ring-1 ring-blue-400/30'
              : 'bg-charcoal-850/70 border-sage-500/15 hover:border-sage-500/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-mono uppercase text-blue-400 block">Under Review</span>
            <span className="text-xs text-slate-400">Technical Assessment</span>
          </div>
          <span className="font-mono text-xl font-bold text-blue-300">{metrics.underReview ?? 0}</span>
        </div>

        <div
          onClick={() => setStatusFilter('NEED_MORE_INFORMATION')}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
            statusFilter === 'NEED_MORE_INFORMATION'
              ? 'bg-charcoal-800 border-yellow-400 ring-1 ring-yellow-400/30'
              : 'bg-charcoal-850/70 border-sage-500/15 hover:border-sage-500/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-mono uppercase text-yellow-400 block">Need More Info</span>
            <span className="text-xs text-slate-400">Client Clarification</span>
          </div>
          <span className="font-mono text-xl font-bold text-yellow-300">{metrics.needMoreInfo ?? 0}</span>
        </div>

        <div
          onClick={() => setStatusFilter('IN_DISCUSSION')}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
            statusFilter === 'IN_DISCUSSION'
              ? 'bg-charcoal-800 border-purple-400 ring-1 ring-purple-400/30'
              : 'bg-charcoal-850/70 border-sage-500/15 hover:border-sage-500/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-mono uppercase text-purple-400 block">In Discussion</span>
            <span className="text-xs text-slate-400">Active Dialog</span>
          </div>
          <span className="font-mono text-xl font-bold text-purple-300">{metrics.inDiscussion ?? 0}</span>
        </div>

        <div
          onClick={() => setStatusFilter('PROPOSAL_SENT')}
          className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center justify-between ${
            statusFilter === 'PROPOSAL_SENT'
              ? 'bg-charcoal-800 border-indigo-400 ring-1 ring-indigo-400/30'
              : 'bg-charcoal-850/70 border-sage-500/15 hover:border-sage-500/30'
          }`}
        >
          <div>
            <span className="text-[10px] font-mono uppercase text-indigo-400 block">Proposals Sent</span>
            <span className="text-xs text-slate-400">Commercial Quote</span>
          </div>
          <span className="font-mono text-xl font-bold text-indigo-300">{metrics.proposalSent ?? 0}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-charcoal-850/90 p-4 rounded-2xl border border-sage-500/20 space-y-3 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, client, company, title, email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-champagne-400"
            />
          </div>

          {/* Service Filter */}
          <div>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-slate-200 focus:outline-none focus:border-champagne-400"
            >
              {allServiceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-charcoal-900 text-slate-200">
                  Service: {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-slate-200 focus:outline-none focus:border-champagne-400"
            >
              {allIndustryOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-charcoal-900 text-slate-200">
                  Industry: {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Pills and Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t border-sage-500/10">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                statusFilter === 'All'
                  ? 'bg-champagne-500 text-charcoal-950 font-bold'
                  : 'bg-charcoal-900 text-slate-400 hover:text-white border border-sage-500/30'
              }`}
            >
              All ({inquiries.length})
            </button>
            {allStatuses.map((st) => {
              const count = inquiries.filter((i) => (i.status || '').toUpperCase() === st.value).length;
              return (
                <button
                  key={st.value}
                  onClick={() => setStatusFilter(st.value)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-mono transition-colors whitespace-nowrap ${
                    statusFilter === st.value
                      ? 'bg-champagne-500 text-charcoal-950 font-bold'
                      : 'bg-charcoal-900 text-slate-400 hover:text-white border border-sage-500/30'
                  }`}
                >
                  {st.label} ({count})
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
            className="text-xs font-mono text-slate-400 hover:text-champagne-300 flex items-center gap-1 self-end sm:self-auto"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort: {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
          </button>
        </div>
      </div>

      {/* Inquiries Table (Phase 6 Specification & Project Engagement Integration) */}
      <div className="bg-charcoal-850/90 rounded-2xl border border-sage-500/20 overflow-hidden shadow-card-dark">
        {filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs font-mono space-y-2">
            <Inbox className="w-8 h-8 mx-auto text-slate-600" />
            <p>No project inquiries match your current search and filter criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-charcoal-900/90 text-slate-400 uppercase font-mono text-[10px] border-b border-sage-500/20">
                <tr>
                  <th className="px-4 py-3.5">Reference ID</th>
                  <th className="px-4 py-3.5">Client</th>
                  <th className="px-4 py-3.5">Company</th>
                  <th className="px-4 py-3.5">Email</th>
                  <th className="px-4 py-3.5">Service</th>
                  <th className="px-4 py-3.5">Project</th>
                  <th className="px-4 py-3.5">Budget</th>
                  <th className="px-4 py-3.5">Submitted</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Assigned To</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sage-500/15 font-sans">
                {filteredInquiries.map((inquiry) => {
                  const servicesList = inquiry.selectedServices && inquiry.selectedServices.length > 0
                    ? inquiry.selectedServices
                    : [inquiry.service || 'Web Development'];

                  return (
                    <tr
                      key={inquiry.referenceNumber || inquiry._id}
                      className="hover:bg-charcoal-900/50 transition-colors cursor-pointer"
                      onClick={() => handleSelectInquiry(inquiry)}
                    >
                      <td className="px-4 py-3.5 font-mono font-bold text-champagne-400 whitespace-nowrap">
                        <Link
                          to={`/admin/inquiries/${inquiry.referenceNumber}`}
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {inquiry.referenceNumber}
                        </Link>
                      </td>

                      <td className="px-4 py-3.5 font-medium text-white whitespace-nowrap">
                        {inquiry.clientName}
                      </td>

                      <td className="px-4 py-3.5 text-slate-300 text-[11px] truncate max-w-[150px]">
                        {inquiry.companyName}
                      </td>

                      <td className="px-4 py-3.5 text-slate-400 font-mono text-[11px] truncate max-w-[160px]">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="hover:text-champagne-300 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {inquiry.email}
                        </a>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1 max-w-[160px]">
                          {servicesList.slice(0, 2).map((srv) => (
                            <span
                              key={srv}
                              className="px-1.5 py-0.5 rounded bg-charcoal-900 border border-sage-500/30 text-champagne-300 text-[9px] font-mono"
                            >
                              {srv}
                            </span>
                          ))}
                          {servicesList.length > 2 && (
                            <span className="text-[9px] font-mono text-slate-500">
                              +{servicesList.length - 2}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-slate-300 text-[11px] max-w-[150px] truncate" title={inquiry.projectTitle || inquiry.service}>
                        {inquiry.projectTitle || inquiry.service || 'Untitled'}
                      </td>

                      <td className="px-4 py-3.5 text-slate-300 font-mono text-[11px] whitespace-nowrap">
                        {inquiry.customBudget || inquiry.budgetRange?.split(' ')[0] || 'Undetermined'}
                      </td>

                      <td className="px-4 py-3.5 text-slate-400 font-mono text-[10px] whitespace-nowrap">
                        {new Date(inquiry.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        {getStatusBadge(inquiry.status)}
                      </td>

                      <td className="px-4 py-3.5 text-[11px] whitespace-nowrap">
                        <span className="text-slate-200 font-medium block">
                          {inquiry.assignedTo?.name || 'Unassigned'}
                        </span>
                        {inquiry.assignedTo?.role && (
                          <span className="text-slate-500 text-[10px] font-mono block">
                            {inquiry.assignedTo.role}
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            to={`/admin/inquiries/${inquiry.referenceNumber}`}
                            className="p-1.5 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 border border-sage-500/30 text-champagne-400 text-[11px] font-mono transition-colors flex items-center gap-1"
                            title="Full Record"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleSelectInquiry(inquiry)}
                            className="px-2.5 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 border border-sage-500/30 text-champagne-400 text-[11px] font-mono transition-colors"
                          >
                            Inspect
                          </button>
                          <button
                            onClick={() => {
                              setInquiryToDelete(inquiry);
                              setDeleteModalOpen(true);
                            }}
                            className="p-1 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DETAIL MODAL / DOSSIER DRAWER (Phase 6 Specification) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
          <div className="relative bg-gradient-to-b from-charcoal-850 via-charcoal-900 to-charcoal-950 max-w-4xl w-full rounded-3xl border border-sage-500/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(212,175,55,0.08)] flex flex-col max-h-[92vh] overflow-hidden">
            
            {/* Ambient Top Glow Accents */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-champagne-400 to-transparent pointer-events-none" />
            <div className="absolute -top-24 right-0 w-96 h-48 bg-champagne-500/[0.07] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 left-0 w-96 h-48 bg-teal-500/[0.05] rounded-full blur-3xl pointer-events-none" />

            {/* Modal Top Bar (Sticky) */}
            <div className="flex items-start justify-between gap-4 p-5 sm:px-8 sm:py-6 border-b border-sage-500/20 bg-charcoal-900/95 backdrop-blur-md shrink-0 z-10">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-champagne-500/10 border border-champagne-500/30 text-[10px] font-mono text-champagne-400 uppercase tracking-widest font-bold shadow-sm">
                    <FileText className="w-3 h-3 text-champagne-400" />
                    Inquiry Dossier & Project Specification
                  </span>
                  {getStatusBadge(selectedInquiry.status)}
                </div>

                <div className="flex items-center gap-3 pt-0.5">
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
                    {selectedInquiry.referenceNumber}
                  </h2>
                  <button
                    onClick={() => handleCopyText(selectedInquiry.referenceNumber, 'ref')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-800/90 hover:bg-charcoal-750 text-slate-300 hover:text-champagne-300 border border-sage-500/30 text-[11px] font-mono transition-all group"
                    title="Copy reference number to clipboard"
                  >
                    {copiedRef ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-champagne-300" />
                        <span>Copy Ref</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-teal-400/90 hidden sm:inline">Direct Intake Channel</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <Link
                  to={`/admin/inquiries/${selectedInquiry.referenceNumber}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-champagne-500/15 to-champagne-500/10 hover:from-champagne-500/25 hover:to-champagne-500/20 text-champagne-300 border border-champagne-500/40 text-xs font-mono font-medium transition-all shadow-sm group"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-champagne-400 group-hover:translate-x-0.5 transition-transform" />
                  <span>Open Full Record</span>
                </Link>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white bg-charcoal-800/60 hover:bg-charcoal-750 border border-sage-500/30 transition-colors shadow-sm"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-8 space-y-6 overflow-y-auto">

              {/* Quick Actions: Status Pipeline & Lead Assignment */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 rounded-2xl bg-charcoal-900/90 border border-sage-500/25 shadow-md">
                
                {/* Left: Lead Pipeline Status (7 cols) */}
                <div className="lg:col-span-7 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono uppercase text-champagne-400 font-bold tracking-wider flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Lead Pipeline Status</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">11-stage pipeline</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {allStatuses.map((st) => {
                      const isActive = (selectedInquiry.status || '').toUpperCase() === st.value;
                      return (
                        <button
                          key={st.value}
                          disabled={isUpdating}
                          onClick={() => handleUpdateStatus(st.value)}
                          className={`group relative px-2.5 py-1.5 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                            isActive
                              ? 'bg-gradient-to-r from-champagne-500 to-champagne-400 text-charcoal-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)] ring-2 ring-champagne-300'
                              : 'bg-charcoal-800/90 text-slate-300 hover:text-white hover:bg-charcoal-750 border border-sage-500/30'
                          }`}
                        >
                          {isActive && <CheckCircle2 className="w-3 h-3 text-charcoal-950" />}
                          <span>{st.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Lead Architect Assignment (5 cols) */}
                <div className="lg:col-span-5 space-y-2.5 lg:border-l lg:border-sage-500/20 lg:pl-5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono uppercase text-champagne-400 font-bold tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-champagne-400" />
                      <span>Assign Lead Architect / Team Member</span>
                    </label>
                  </div>

                  <div className="space-y-2">
                    {(() => {
                      const currentAssigned = normalizeAssigned(
                        selectedInquiry.assignedTo,
                        selectedInquiry.selectedServices || [selectedInquiry.service]
                      );
                      return (
                        <>
                          <div className="relative">
                            <select
                              value={currentAssigned.name || 'Unassigned'}
                              onChange={(e) => handleAssignTeamMember(e.target.value)}
                              disabled={isUpdating}
                              className="w-full pl-3.5 pr-8 py-2 rounded-xl bg-charcoal-800/90 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400 font-medium transition-all appearance-none cursor-pointer"
                            >
                              {teamMembers.map((m) => (
                                <option key={m.name} value={m.name} className="bg-charcoal-900 text-white">
                                  {m.name} {m.role !== 'None' ? `(${m.role})` : ''}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                              <ArrowUpDown className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          {/* Active Architect Pill Display */}
                          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-charcoal-800/50 border border-sage-500/20 text-xs">
                            <div className="w-7 h-7 rounded-lg bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-[10px] font-bold text-champagne-300 font-mono shrink-0">
                              {getInitials(currentAssigned.name)}
                            </div>
                            <div className="truncate">
                              <span className="text-white font-medium block truncate">
                                {currentAssigned.name !== 'Unassigned' ? currentAssigned.name : 'Unassigned Lead'}
                              </span>
                              <span className="text-[10px] font-mono text-champagne-400/90 block truncate">
                                {currentAssigned.role && currentAssigned.role !== 'None'
                                  ? currentAssigned.role
                                  : 'Engineering Queue'}
                              </span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

              </div>

              {/* 1. Contact & Organization Details */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-[11px] text-champagne-400 font-bold">1</span>
                    <span>1. Contact & Organization Details</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Verified Client Profile</span>
                </div>

                <div className="p-5 rounded-2xl bg-charcoal-900/80 border border-sage-500/25 space-y-4 shadow-sm">
                  
                  {/* Executive Contact Header Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-sage-500/20">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-champagne-500/20 via-charcoal-800 to-charcoal-900 border border-champagne-400/40 text-champagne-300 font-heading font-bold text-base flex items-center justify-center shadow-inner shrink-0">
                        {getInitials(selectedInquiry.clientName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-white font-bold text-base sm:text-lg">
                            {selectedInquiry.clientName}
                          </h4>
                          {selectedInquiry.jobTitle && selectedInquiry.jobTitle !== 'Not specified' && (
                            <span className="px-2 py-0.5 rounded-md bg-charcoal-800 border border-sage-500/30 text-slate-300 text-[10px] font-mono">
                              {selectedInquiry.jobTitle}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 text-champagne-300 text-xs font-mono mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-champagne-400" />
                          <span>{selectedInquiry.companyName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Contact Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-champagne-500/10 hover:bg-champagne-500/20 text-champagne-300 border border-champagne-500/30 text-xs font-mono transition-colors"
                        title="Send email to client"
                      >
                        <Mail className="w-3.5 h-3.5 text-champagne-400" />
                        <span className="truncate max-w-[160px] sm:max-w-none">{selectedInquiry.email}</span>
                      </a>
                      <button
                        onClick={() => handleCopyText(selectedInquiry.email, 'email')}
                        className="p-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-slate-400 hover:text-champagne-300 border border-sage-500/30 transition-colors"
                        title="Copy email to clipboard"
                      >
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      {selectedInquiry.phoneNumber && selectedInquiry.phoneNumber !== 'Not provided' && (
                        <a
                          href={`tel:${selectedInquiry.phoneNumber}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-slate-300 hover:text-white border border-sage-500/30 text-xs font-mono transition-colors"
                          title="Call client phone"
                        >
                          <Phone className="w-3.5 h-3.5 text-teal-400" />
                          <span>{selectedInquiry.phoneNumber}</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Detail Fields Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-charcoal-850/80 border border-sage-500/15">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">CLIENT NAME</span>
                      <span className="text-slate-100 font-semibold block mt-1 truncate">{selectedInquiry.clientName}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-charcoal-850/80 border border-sage-500/15">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">ORGANIZATION</span>
                      <span className="text-slate-100 font-semibold block mt-1 truncate">{selectedInquiry.companyName}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-charcoal-850/80 border border-sage-500/15">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">EMAIL ADDRESS</span>
                      <a href={`mailto:${selectedInquiry.email}`} className="text-champagne-400 hover:underline block mt-1 truncate">
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div className="p-3 rounded-xl bg-charcoal-850/80 border border-sage-500/15">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">DIRECT PHONE</span>
                      <span className="text-slate-200 block mt-1 truncate">{selectedInquiry.phoneNumber || 'Not provided'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-charcoal-850/80 border border-sage-500/15">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">JOB TITLE</span>
                      <span className="text-slate-200 block mt-1 truncate">{selectedInquiry.jobTitle || 'Not specified'}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-charcoal-850/80 border border-sage-500/15">
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5 text-slate-500" />
                        <span>COUNTRY / REGION</span>
                      </span>
                      <span className="text-slate-200 block mt-1 truncate">{selectedInquiry.country || 'Not specified'}</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* 2. Project Scope & Specifications */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-[11px] text-champagne-400 font-bold">2</span>
                    <span>2. Project Scope & Specifications</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Engineering Requirements</span>
                </div>

                <div className="p-5 rounded-2xl bg-charcoal-900/80 border border-sage-500/25 space-y-4 shadow-sm">
                  
                  {/* Initiative Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-sage-500/20">
                    <div>
                      <span className="text-slate-500 font-mono text-[10px] block uppercase tracking-wider">PROJECT TITLE</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Layers className="w-4 h-4 text-champagne-400" />
                        <span className="text-white font-bold text-lg font-heading tracking-wide">
                          {selectedInquiry.projectTitle || 'Untitled Initiative'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="px-3 py-1.5 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs font-mono flex items-center gap-1.5 text-slate-200">
                        <Tag className="w-3 h-3 text-champagne-400" />
                        <span className="text-slate-400 text-[10px] uppercase">INDUSTRY:</span>
                        <span className="font-medium">{selectedInquiry.industry || 'General'}</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-charcoal-850 border border-champagne-500/30 text-xs font-mono flex items-center gap-1.5 text-champagne-300">
                        <Sparkles className="w-3 h-3 text-champagne-400" />
                        <span className="text-slate-400 text-[10px] uppercase">ENGAGEMENT:</span>
                        <span className="font-medium">{selectedInquiry.projectType || 'Full Implementation'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Selected Disciplines */}
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] block uppercase tracking-wider mb-1.5">
                      SELECTED DISCIPLINES
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {(selectedInquiry.selectedServices && selectedInquiry.selectedServices.length > 0
                        ? selectedInquiry.selectedServices
                        : [selectedInquiry.service]
                      ).map((srv) => (
                        <span
                          key={srv}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-charcoal-850 to-charcoal-800 border border-champagne-500/35 text-champagne-300 font-mono text-xs shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-champagne-400" />
                          <span>{srv}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Description & Specifications Quote Box */}
                  <div className="rounded-xl bg-charcoal-950/80 border border-sage-500/25 border-l-4 border-l-champagne-400 p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-champagne-400 font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-champagne-400" />
                        <span>PROJECT DESCRIPTION & SPECIFICATIONS</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">Submitted Client Requirements</span>
                    </div>
                    <p className="text-slate-200 text-xs sm:text-sm font-sans leading-relaxed whitespace-pre-wrap font-light">
                      {selectedInquiry.projectRequirements || selectedInquiry.projectDescription}
                    </p>
                  </div>

                  {/* Deliverables & Technology Stack Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {selectedInquiry.deliverables && (
                      <div className="p-3.5 rounded-xl bg-charcoal-850/80 border border-sage-500/20 space-y-1">
                        <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                          <span>EXPECTED DELIVERABLES</span>
                        </span>
                        <p className="text-slate-200 font-mono text-xs leading-relaxed">
                          {selectedInquiry.deliverables}
                        </p>
                      </div>
                    )}

                    {selectedInquiry.preferredTechnology && (
                      <div className="p-3.5 rounded-xl bg-charcoal-850/80 border border-sage-500/20 space-y-1">
                        <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                          <Cpu className="w-3.5 h-3.5 text-teal-400" />
                          <span>PREFERRED TECHNOLOGY</span>
                        </span>
                        <p className="text-teal-300 font-mono text-xs leading-relaxed">
                          {selectedInquiry.preferredTechnology}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* 3. Budget, Timeline & Attachments */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-champagne-500/10 border border-champagne-500/30 flex items-center justify-center text-[11px] text-champagne-400 font-bold">3</span>
                    <span>3. Budget, Timeline & Attachments</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Commercial & Deployment Window</span>
                </div>

                <div className="space-y-3">
                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    
                    {/* Budget Tier */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-charcoal-900/90 to-charcoal-850 border border-emerald-500/25 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold">BUDGET TIER</span>
                        <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <DollarSign className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-emerald-400 font-bold text-sm sm:text-base font-mono">
                        {selectedInquiry.budgetRange}
                      </div>
                    </div>

                    {/* Deployment Window */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-charcoal-900/90 to-charcoal-850 border border-blue-500/25 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold">DEPLOYMENT WINDOW</span>
                        <div className="w-7 h-7 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <Calendar className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-blue-300 font-bold text-sm sm:text-base font-mono">
                        {selectedInquiry.timeline}
                      </div>
                    </div>

                    {/* Start Preference */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-charcoal-900/90 to-charcoal-850 border border-teal-500/25 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider font-bold">START PREFERENCE</span>
                        <div className="w-7 h-7 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                          <Clock className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-teal-300 font-bold text-sm sm:text-base font-mono">
                        {selectedInquiry.startPreference || 'Immediately'}
                      </div>
                    </div>

                  </div>

                  {/* Additional Constraints / NDA */}
                  {selectedInquiry.additionalRequirements && (
                    <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/30 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                        <Lock className="w-3.5 h-3.5" />
                        <span>ADDITIONAL CONSTRAINTS / NDA</span>
                      </div>
                      <p className="text-amber-200/90 text-xs leading-relaxed font-light">
                        {selectedInquiry.additionalRequirements}
                      </p>
                    </div>
                  )}

                  {/* Attached Documents */}
                  {selectedInquiry.attachments && selectedInquiry.attachments.length > 0 && (
                    <div className="p-4 rounded-2xl bg-charcoal-900/80 border border-sage-500/25 space-y-2.5">
                      <span className="text-slate-400 font-mono text-[10px] uppercase font-bold tracking-wider block">
                        ATTACHED DOCUMENTS ({selectedInquiry.attachments.length})
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {selectedInquiry.attachments.map((att, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 rounded-xl bg-charcoal-850 border border-sage-500/20 text-xs font-mono"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <Paperclip className="w-3.5 h-3.5 text-champagne-400 shrink-0" />
                              <span className="text-slate-200 truncate">{att.fileName}</span>
                            </div>
                            {att.fileSize && (
                              <span className="text-slate-500 text-[10px] shrink-0 ml-2">
                                {Math.round(att.fileSize / 1024)} KB
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Internal Admin Notes Thread */}
              <div className="space-y-3 pt-3 border-t border-sage-500/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-champagne-400" />
                    <span>Internal Lead Notes ({selectedInquiry.internalNotes?.length || 0})</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">Visible only to administrative staff</span>
                </div>

                {selectedInquiry.internalNotes && selectedInquiry.internalNotes.length > 0 ? (
                  <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                    {selectedInquiry.internalNotes.map((note, idx) => (
                      <div
                        key={note.id || idx}
                        className="p-3.5 rounded-xl bg-charcoal-900/90 border border-sage-500/25 space-y-1.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-champagne-500/15 border border-champagne-500/30 flex items-center justify-center text-champagne-300 font-bold text-[10px]">
                              {note.author.charAt(0)}
                            </div>
                            <span className="text-champagne-400 font-bold">{note.author}</span>
                          </div>
                          <span>{new Date(note.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-slate-200 font-sans leading-relaxed pl-7">{note.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-xs italic font-light p-3 rounded-xl bg-charcoal-900/50 border border-sage-500/15">
                    No internal notes logged yet for this lead.
                  </p>
                )}

                <form onSubmit={handleAddNote} className="space-y-2.5">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add internal note (e.g. Scoping call completed with client. Preparing prototype demo for next Tuesday)..."
                    className="w-full px-4 py-2.5 rounded-xl bg-charcoal-900/90 border border-sage-500/30 text-xs text-slate-200 focus:outline-none focus:border-champagne-400 focus:ring-1 focus:ring-champagne-400 resize-none transition-all placeholder:text-slate-500"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant="secondary"
                      size="sm"
                      disabled={!newNoteText.trim() || isUpdating}
                      leftIcon={<Send className="w-3.5 h-3.5" />}
                    >
                      Post Internal Note
                    </Button>
                  </div>
                </form>
              </div>

              {/* Client Communication System */}
              <div className="space-y-3 pt-3 border-t border-sage-500/20">
                <ClientCommunication
                  inquiry={selectedInquiry}
                  token={token || ''}
                  adminName={user?.name || 'Solutions Architect'}
                  adminEmail={user?.email || 'inquiries@peacehaven.tech'}
                  onCommunicationSent={() => fetchInquiries()}
                />
              </div>

              {/* Audit History Timeline */}
              {selectedInquiry.auditHistory && selectedInquiry.auditHistory.length > 0 && (
                <div className="space-y-2.5 pt-3 border-t border-sage-500/20">
                  <h4 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5 font-bold">
                    <History className="w-3.5 h-3.5 text-champagne-400" />
                    <span>Activity Audit Log</span>
                  </h4>
                  <div className="space-y-1.5 text-[11px] font-mono text-slate-400 bg-charcoal-900/60 p-3 rounded-xl border border-sage-500/20">
                    {selectedInquiry.auditHistory.slice(-4).map((entry, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-slate-500 shrink-0">
                          {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:
                        </span>
                        <span className="text-champagne-400 font-medium">[{entry.action}]</span>
                        <span className="text-slate-300 truncate">{entry.notes || 'Status modified'}</span>
                        <span className="text-slate-500 text-[10px] ml-auto shrink-0">by {entry.changedBy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteModalOpen && inquiryToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-charcoal-850 max-w-md w-full p-6 rounded-2xl border border-rose-500/40 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">Delete Inquiry Record</h3>
                <p className="text-xs text-slate-400 font-mono">{inquiryToDelete.referenceNumber}</p>
              </div>
            </div>

            <p className="text-slate-300 text-xs font-light leading-relaxed">
              Are you sure you want to permanently delete this inquiry from <strong className="text-white">{inquiryToDelete.clientName}</strong> ({inquiryToDelete.companyName})? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                onClick={() => setDeleteModalOpen(false)}
                variant="secondary"
                size="sm"
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <button
                onClick={handleDeleteInquiry}
                disabled={isUpdating}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-mono font-bold transition-colors"
              >
                {isUpdating ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
