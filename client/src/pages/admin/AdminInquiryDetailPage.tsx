import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  RefreshCw, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Tag, 
  Layers, 
  Paperclip, 
  Send, 
  MessageSquare, 
  History, 
  BellRing,
  FileText
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { ClientCommunication } from '../../components/inquiry/ClientCommunication';
import { useAuth } from '../../context/AuthContext';
import { ProjectInquiry, InquiryStatus } from '../../types';
import { inquiryApi } from '../../services/api/inquiryApi';

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

const priorityLevels: { value: 'low' | 'medium' | 'high' | 'urgent'; label: string; color: string }[] = [
  { value: 'low', label: 'Low Priority', color: 'text-slate-400 border-slate-500/30 bg-slate-500/10' },
  { value: 'medium', label: 'Medium Priority', color: 'text-blue-300 border-blue-500/30 bg-blue-500/10' },
  { value: 'high', label: 'High Priority', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { value: 'urgent', label: 'Urgent / Critical', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
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

const normalizeAssigned = (assigned?: { name?: string; email?: string; role?: string } | null): { name: string; email: string; role: string } => {
  if (!assigned || !assigned.name || assigned.name === 'Unassigned') {
    return { name: 'Unassigned', email: '', role: 'None' };
  }
  const n = assigned.name.trim();
  if (n.includes('Alex Rivera') || n.includes('Marcus Sterling')) {
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

export const AdminInquiryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState<ProjectInquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchInquiry = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await inquiryApi.getInquiryByRef(token || '', id);
      if (res && res.data) {
        setInquiry({
          ...res.data,
          assignedTo: normalizeAssigned(res.data.assignedTo),
        });
      } else {
        setError('Inquiry record not found.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to retrieve inquiry record.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiry();
  }, [id, token]);

  const handleUpdateStatus = async (status: InquiryStatus) => {
    if (!inquiry) return;
    setIsUpdating(true);
    try {
      await inquiryApi.updateInquiry(token || '', inquiry.referenceNumber, { status });
      setInquiry((prev) => (prev ? { ...prev, status } : null));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePriority = async (priority: 'low' | 'medium' | 'high' | 'urgent') => {
    if (!inquiry) return;
    setIsUpdating(true);
    try {
      await inquiryApi.updateInquiryPriority(token || '', inquiry.referenceNumber, priority);
      setInquiry((prev) => (prev ? { ...prev, priority } : null));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignTeamMember = async (memberName: string) => {
    if (!inquiry) return;
    const member = teamMembers.find((m) => m.name === memberName) || { name: memberName, email: '', role: '' };
    setIsUpdating(true);
    try {
      await inquiryApi.updateInquiry(token || '', inquiry.referenceNumber, { assignedTo: member });
      setInquiry((prev) => (prev ? { ...prev, assignedTo: member } : null));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry || !newNoteText.trim()) return;
    setIsUpdating(true);
    try {
      const author = user?.name || user?.email || 'Engineering Lead';
      await inquiryApi.addInquiryNote(token || '', inquiry.referenceNumber, newNoteText.trim(), author);
      setNewNoteText('');
      await fetchInquiry();
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <RefreshCw className="w-6 h-6 text-champagne-400 animate-spin" />
        <p className="text-xs font-mono text-slate-400">Loading inquiry dossier...</p>
      </div>
    );
  }

  if (error || !inquiry) {
    return (
      <div className="p-8 rounded-3xl bg-charcoal-850 border border-sage-500/30 text-center space-y-4 max-w-lg mx-auto mt-12">
        <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
        <h2 className="font-heading text-xl font-bold text-white">Inquiry Record Not Found</h2>
        <p className="text-xs text-slate-400">{error || `No dossier found matching ID ${id}`}</p>
        <Link to="/admin/inquiries">
          <Button variant="secondary" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Return to Inquiries
          </Button>
        </Link>
      </div>
    );
  }

  const servicesList = inquiry.selectedServices && inquiry.selectedServices.length > 0
    ? inquiry.selectedServices
    : [inquiry.service || 'Web Development'];

  const currentStatusBadge = allStatuses.find((s) => s.value === (inquiry.status || '').toUpperCase()) || {
    label: inquiry.status,
    color: 'bg-charcoal-800 text-slate-300 border-sage-500/30',
  };

  const currentPriorityBadge = priorityLevels.find((p) => p.value === inquiry.priority) || priorityLevels[1];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sage-500/20 pb-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/inquiries"
            className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-750 text-slate-400 hover:text-white border border-sage-500/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                Project Engagement Dossier
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-medium ${currentStatusBadge.color}`}>
                {currentStatusBadge.label}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono border font-medium ${currentPriorityBadge.color}`}>
                {currentPriorityBadge.label}
              </span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white mt-0.5 flex items-center gap-2">
              <span>{inquiry.referenceNumber}</span>
              <span className="text-slate-500 text-lg font-light">&mdash; {inquiry.companyName}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/admin/reminders`}>
            <Button variant="secondary" size="sm" leftIcon={<BellRing className="w-3.5 h-3.5" />}>
              Schedule Reminder
            </Button>
          </Link>
          <Button
            onClick={fetchInquiry}
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Sections A, B, C, D, and F (Communication) */}
        <div className="lg:col-span-2 space-y-6">
          {/* SECTION A: Client Profile */}
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-850 border border-sage-500/25 space-y-4 shadow-md">
            <h2 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-champagne-400" />
              <span>A. Client Profile & Organization Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-mono bg-charcoal-900/80 p-4 rounded-xl border border-sage-500/20">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">CLIENT NAME</span>
                <span className="text-slate-200 font-bold text-sm font-sans">{inquiry.clientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">ORGANIZATION</span>
                <span className="text-slate-200 font-bold text-sm font-sans">{inquiry.companyName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">BUSINESS EMAIL</span>
                <a href={`mailto:${inquiry.email}`} className="text-champagne-400 hover:underline truncate block">
                  {inquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">PHONE NUMBER</span>
                <span className="text-slate-300">{inquiry.phoneNumber || inquiry.phone || 'Not provided'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">JOB TITLE / ROLE</span>
                <span className="text-slate-300">{inquiry.jobTitle || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">COUNTRY / REGION</span>
                <span className="text-slate-300">{inquiry.country || 'Not specified'}</span>
              </div>
            </div>
          </div>

          {/* SECTION B: Selected Services */}
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-850 border border-sage-500/25 space-y-3 shadow-md">
            <h2 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-champagne-400" />
              <span>B. Selected Services</span>
            </h2>

            <div className="flex flex-wrap gap-2">
              {servicesList.map((srv) => (
                <span
                  key={srv}
                  className="px-3 py-1.5 rounded-xl bg-charcoal-900 border border-champagne-500/30 text-champagne-300 font-mono text-xs flex items-center gap-1.5"
                >
                  <Tag className="w-3 h-3 text-champagne-400" />
                  <span>{srv}</span>
                </span>
              ))}
            </div>
          </div>

          {/* SECTION C: Project Requirements */}
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-850 border border-sage-500/25 space-y-4 shadow-md">
            <h2 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-champagne-400" />
              <span>C. Project Requirements & Scope</span>
            </h2>

            <div className="p-4 rounded-xl bg-charcoal-900/80 border border-sage-500/20 space-y-3.5 text-xs">
              <div>
                <span className="text-slate-500 font-mono text-[10px] block uppercase">PROJECT TITLE</span>
                <span className="text-white font-bold text-base font-sans block mt-0.5">
                  {inquiry.projectTitle || 'Untitled Initiative'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">INDUSTRY DOMAIN</span>
                  <span className="text-slate-200">{inquiry.industry || 'General'}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block uppercase">ENGAGEMENT TYPE</span>
                  <span className="text-slate-200">{inquiry.projectType || 'Full Implementation'}</span>
                </div>
              </div>

              {inquiry.projectOverview && (
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block uppercase">PROJECT OVERVIEW</span>
                  <p className="text-slate-200 font-sans leading-relaxed mt-0.5 font-light">
                    {inquiry.projectOverview}
                  </p>
                </div>
              )}

              <div>
                <span className="text-slate-500 font-mono text-[10px] block uppercase">DETAILED BUSINESS REQUIREMENTS</span>
                <p className="text-slate-200 font-sans leading-relaxed mt-0.5 whitespace-pre-wrap font-light">
                  {inquiry.detailedRequirements || inquiry.projectRequirements || inquiry.projectDescription}
                </p>
              </div>

              {inquiry.projectObjectives && (
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block uppercase">MAIN OBJECTIVES</span>
                  <p className="text-slate-200 font-sans leading-relaxed mt-0.5 font-light">
                    {inquiry.projectObjectives}
                  </p>
                </div>
              )}

              {inquiry.requiredFeatures && (
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block uppercase">REQUIRED FEATURES</span>
                  <p className="text-slate-200 font-sans leading-relaxed mt-0.5 font-light">
                    {inquiry.requiredFeatures}
                  </p>
                </div>
              )}

              {inquiry.deliverables && (
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block uppercase">EXPECTED DELIVERABLES</span>
                  <span className="text-slate-200 font-mono block mt-0.5">{inquiry.deliverables}</span>
                </div>
              )}

              {(inquiry.technicalRequirements || inquiry.preferredTechnology) && (
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block uppercase">TECHNICAL REQUIREMENTS</span>
                  <span className="text-teal-300 font-mono block mt-0.5">
                    {inquiry.technicalRequirements || inquiry.preferredTechnology}
                  </span>
                </div>
              )}

              {inquiry.additionalInformation && (
                <div>
                  <span className="text-slate-500 font-mono text-[10px] block uppercase">ADDITIONAL INFORMATION</span>
                  <p className="text-slate-300 font-sans leading-relaxed mt-0.5 font-light">
                    {inquiry.additionalInformation}
                  </p>
                </div>
              )}

              {inquiry.attachments && inquiry.attachments.length > 0 && (
                <div className="pt-2 border-t border-sage-500/20 space-y-1.5 font-mono">
                  <span className="text-slate-500 text-[10px] uppercase block">SUPPORTING DOCUMENTS</span>
                  <div className="flex flex-wrap gap-2">
                    {inquiry.attachments.map((att, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-800 text-xs text-slate-300">
                        <Paperclip className="w-3.5 h-3.5 text-champagne-400" />
                        <span>{att.fileName}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SECTION D: Budget & Timeline */}
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-850 border border-sage-500/25 space-y-4 shadow-md">
            <h2 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-champagne-400" />
              <span>D. Budget, Currency & Timeline Specifications</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-charcoal-900/80 p-4 rounded-xl border border-sage-500/20">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">ESTIMATED BUDGET</span>
                <span className="text-slate-200 font-bold block mt-0.5">
                  {inquiry.customBudget || inquiry.budgetRange}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">CURRENCY</span>
                <span className="text-champagne-400 font-bold block mt-0.5">{inquiry.budgetCurrency || 'USD'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">START PREFERENCE</span>
                <span className="text-slate-200 block mt-0.5">{inquiry.expectedStartDate || inquiry.startPreference || 'Immediately'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">TIMELINE</span>
                <span className="text-slate-200 block mt-0.5">{inquiry.expectedTimeline || inquiry.timeline}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">PROJECT URGENCY</span>
                <span className="text-amber-400 block mt-0.5">{inquiry.urgency || 'Normal'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">CONTACT METHOD</span>
                <span className="text-teal-300 block mt-0.5">{inquiry.preferredContactMethod || 'Email'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">SUBMISSION DATE</span>
                <span className="text-slate-300 block mt-0.5">
                  {new Date(inquiry.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">LAST CONTACTED</span>
                <span className="text-slate-300 block mt-0.5">
                  {inquiry.lastCommunicatedAt ? new Date(inquiry.lastCommunicatedAt).toLocaleDateString() : 'Pending'}
                </span>
              </div>
            </div>
          </div>

          {/* SECTION F: Client Communication */}
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-850 border border-sage-500/25 space-y-4 shadow-md">
            <ClientCommunication
              inquiry={inquiry}
              token={token || ''}
              adminName={user?.name || 'Solutions Architect'}
              adminEmail={user?.email || 'inquiries@peacehaven.tech'}
              onCommunicationSent={(updated) => {
                if (updated) setInquiry(updated);
                else fetchInquiry();
              }}
            />
          </div>
        </div>

        {/* Right Column (1 col): SECTION E: Inquiry Management */}
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-charcoal-850 border border-sage-500/25 space-y-5 shadow-md">
            <h2 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-champagne-400" />
              <span>E. Inquiry Management</span>
            </h2>

            {/* Status Transition Buttons */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">
                Update Status
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {allStatuses.map((st) => (
                  <button
                    key={st.value}
                    disabled={isUpdating}
                    onClick={() => handleUpdateStatus(st.value)}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-mono transition-all text-center ${
                      (inquiry.status || '').toUpperCase() === st.value
                        ? 'bg-champagne-500 text-charcoal-950 font-bold ring-2 ring-champagne-400/40'
                        : 'bg-charcoal-900 text-slate-300 hover:text-white border border-sage-500/30'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Selector */}
            <div className="space-y-2 pt-2 border-t border-sage-500/20">
              <label className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">
                Lead Priority Tier
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {priorityLevels.map((p) => (
                  <button
                    key={p.value}
                    disabled={isUpdating}
                    onClick={() => handleUpdatePriority(p.value)}
                    className={`px-2 py-1.5 rounded-lg text-[10px] font-mono border transition-all ${
                      inquiry.priority === p.value
                        ? 'ring-2 ring-champagne-400/40 font-bold ' + p.color
                        : 'bg-charcoal-900 border-sage-500/25 text-slate-400'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Team Member Assignment */}
            <div className="space-y-2 pt-2 border-t border-sage-500/20">
              <label className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">
                Assign Responsible Staff
              </label>
              <select
                value={normalizeAssigned(inquiry.assignedTo).name || 'Unassigned'}
                onChange={(e) => handleAssignTeamMember(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400"
              >
                {teamMembers.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} {m.role !== 'None' ? `(${m.role})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Private Internal Notes Thread */}
            <div className="space-y-3 pt-2 border-t border-sage-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold">
                  Internal Notes ({inquiry.internalNotes?.length || 0})
                </span>
                <span className="text-[9px] font-mono text-slate-500">Private to staff</span>
              </div>

              {inquiry.internalNotes && inquiry.internalNotes.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {inquiry.internalNotes.map((n, idx) => (
                    <div key={n.id || idx} className="p-3 rounded-xl bg-charcoal-900 border border-sage-500/20 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="text-champagne-400 font-bold">{n.author}</span>
                        <span>{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-200 font-light leading-relaxed">{n.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-xs italic font-light">No internal notes logged yet.</p>
              )}

              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="Record discussion outcome or private internal note..."
                  className="w-full px-3 py-2 rounded-xl bg-charcoal-900 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400 resize-none font-light"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="secondary"
                    size="sm"
                    disabled={!newNoteText.trim() || isUpdating}
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Post Note
                  </Button>
                </div>
              </form>
            </div>

            {/* Audit History Log */}
            {inquiry.auditHistory && inquiry.auditHistory.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-sage-500/20">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-champagne-400" />
                  <span>Audit Trail</span>
                </span>
                <div className="space-y-1.5 text-[10px] font-mono text-slate-400 max-h-40 overflow-y-auto">
                  {inquiry.auditHistory.slice(-5).reverse().map((entry, idx) => (
                    <div key={idx} className="p-2 rounded bg-charcoal-900/60 border border-sage-500/15">
                      <div className="flex items-center justify-between">
                        <span className="text-champagne-400 font-bold">[{entry.action}]</span>
                        <span className="text-slate-500">{new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-slate-300 truncate mt-0.5">{entry.notes || 'Status updated'}</p>
                      <span className="text-slate-500 text-[9px]">by {entry.changedBy}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
