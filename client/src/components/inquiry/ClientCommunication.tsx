import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  FileText, 
  Paperclip, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Button } from '../common/Button';
import { ProjectInquiry, CommunicationEntry, ClientEmailTemplate } from '../../types';
import { inquiryApi } from '../../services/api/inquiryApi';

interface ClientCommunicationProps {
  inquiry: ProjectInquiry;
  token: string;
  adminName?: string;
  adminEmail?: string;
  onCommunicationSent?: (updatedInquiry?: ProjectInquiry) => void;
}

export const ClientCommunication: React.FC<ClientCommunicationProps> = ({
  inquiry,
  token,
  adminName = 'Solutions Architect',
  adminEmail = 'inquiries@peacehaven.tech',
  onCommunicationSent,
}) => {
  const [templates, setTemplates] = useState<ClientEmailTemplate[]>([]);
  const [selectedTemplateSlug, setSelectedTemplateSlug] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>(inquiry.email || '');
  const [subject, setSubject] = useState<string>(
    `Re: Project Engagement – ${inquiry.referenceNumber}: ${inquiry.projectTitle || inquiry.service}`
  );
  const [message, setMessage] = useState<string>('');
  const [attachments, setAttachments] = useState<{ fileName: string; fileSize?: number; fileType?: string }[]>([]);
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const [expandedCommId, setExpandedCommId] = useState<string | null>(null);
  const [history, setHistory] = useState<CommunicationEntry[]>(inquiry.communicationHistory || []);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const tpls = await inquiryApi.getClientCommunicationTemplates(token);
        if (tpls && tpls.length > 0) {
          setTemplates(tpls);
        }
      } catch (err) {
        console.warn('Could not fetch remote templates', err);
      }
    }
    loadTemplates();
  }, [token]);

  useEffect(() => {
    setRecipientEmail(inquiry.email || '');
    setHistory(inquiry.communicationHistory || []);
  }, [inquiry]);

  const applyTemplate = (slug: string) => {
    setSelectedTemplateSlug(slug);
    const found = templates.find((t) => t.slug === slug);
    if (!found) return;

    // Helper to replace placeholders
    const replaceTokens = (text: string) => {
      const servicesList = inquiry.selectedServices && inquiry.selectedServices.length > 0
        ? inquiry.selectedServices.join(', ')
        : String(inquiry.service || 'Web Development');

      return text
        .replace(/\{\{clientName\}\}/g, inquiry.clientName || 'Valued Client')
        .replace(/\{\{companyName\}\}/g, inquiry.companyName || 'your organization')
        .replace(/\{\{projectTitle\}\}/g, inquiry.projectTitle || inquiry.service || 'your initiative')
        .replace(/\{\{referenceNumber\}\}/g, inquiry.referenceNumber)
        .replace(/\{\{selectedServices\}\}/g, servicesList)
        .replace(/\{\{adminName\}\}/g, adminName);
    };

    setSubject(replaceTokens(found.subject));
    setMessage(replaceTokens(found.defaultBody));
  };

  const handleAddAttachment = () => {
    if (!newAttachmentName.trim()) return;
    setAttachments((prev) => [
      ...prev,
      { fileName: newAttachmentName.trim(), fileSize: 102400, fileType: 'application/pdf' },
    ]);
    setNewAttachmentName('');
  };

  const handleRemoveAttachment = (idx: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleResetDraft = () => {
    setSelectedTemplateSlug('');
    setSubject(`Re: Project Engagement – ${inquiry.referenceNumber}: ${inquiry.projectTitle || inquiry.service}`);
    setMessage('');
    setAttachments([]);
    setSendSuccess(null);
    setSendError(null);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !subject.trim() || !message.trim()) return;

    setIsSending(true);
    setSendSuccess(null);
    setSendError(null);

    try {
      const res = await inquiryApi.sendClientEmail(token, inquiry.referenceNumber, {
        recipientEmail,
        subject,
        message,
        templateSlug: selectedTemplateSlug,
        attachments,
      });

      if (res && res.success) {
        setSendSuccess(`Email dispatched successfully to ${recipientEmail}.`);
        if (res.data) {
          setHistory((prev) => [...prev, res.data]);
        }
        setMessage('');
        setAttachments([]);
        setSelectedTemplateSlug('');
        if (onCommunicationSent) {
          onCommunicationSent(res.inquiry);
        }
      } else {
        setSendError('Failed to dispatch client response.');
      }
    } catch (err: any) {
      setSendError(err.message || 'Error communicating with client.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 pt-4 border-t border-sage-500/20">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4 text-champagne-400" />
            <span>Client Communication & Email Response</span>
          </h3>
          <p className="text-slate-400 text-xs font-light mt-0.5">
            Respond directly to {inquiry.clientName} using verified corporate email templates and track full message history.
          </p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-charcoal-800 border border-sage-500/30 text-champagne-400">
          Ref: {inquiry.referenceNumber}
        </span>
      </div>

      {/* Composer Container */}
      <form onSubmit={handleSendEmail} className="p-4 sm:p-5 rounded-2xl bg-charcoal-900 border border-sage-500/30 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sage-500/20 pb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <Sparkles className="w-4 h-4 text-champagne-400" />
            <span className="font-bold text-champagne-300">Email Composer:</span>
            <span>Direct Response Channel</span>
          </div>

          {/* Template Selector Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="templateSelector" className="text-[11px] font-mono text-slate-400 shrink-0">
              Load Template:
            </label>
            <select
              id="templateSelector"
              value={selectedTemplateSlug}
              onChange={(e) => applyTemplate(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-charcoal-800 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400"
            >
              <option value="">-- Choose from 11 Standard Templates --</option>
              {templates.map((tpl) => (
                <option key={tpl.slug} value={tpl.slug}>
                  {tpl.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipient & Subject Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase block">
              Recipient Email (Client) *
            </label>
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase block">
              Sender Authority
            </label>
            <div className="px-3 py-2 rounded-xl bg-charcoal-850 border border-sage-500/20 text-xs text-slate-300 font-mono truncate">
              {adminName} &lt;{adminEmail}&gt;
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono text-slate-400 uppercase block">
            Subject Line *
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Subject line..."
            className="w-full px-3 py-2 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400 font-medium"
          />
        </div>

        {/* Message Editor */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>MESSAGE BODY (EDITABLE) *</span>
            <span>{message.length} characters</span>
          </div>
          <textarea
            rows={7}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Type your response to the client or select a template above..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-slate-200 focus:outline-none focus:border-champagne-400 resize-none font-sans leading-relaxed"
          />
        </div>

        {/* Attachment Upload Simulator */}
        <div className="space-y-2">
          <label className="text-[10px] font-mono text-slate-400 uppercase block">
            Attach Document / Architectural Brief (Optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newAttachmentName}
              onChange={(e) => setNewAttachmentName(e.target.value)}
              placeholder="e.g. peace_haven_scoping_brief_v1.pdf"
              className="flex-1 px-3 py-1.5 rounded-xl bg-charcoal-850 border border-sage-500/30 text-xs text-white focus:outline-none focus:border-champagne-400 font-mono"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddAttachment}
              leftIcon={<Paperclip className="w-3.5 h-3.5" />}
            >
              Attach
            </Button>
          </div>

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {attachments.map((att, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-charcoal-800 border border-sage-500/30 text-xs font-mono text-champagne-300"
                >
                  <Paperclip className="w-3 h-3 text-champagne-400" />
                  <span>{att.fileName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveAttachment(idx)}
                    className="ml-1 text-slate-400 hover:text-red-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Feedback Alerts */}
        {sendSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{sendSuccess}</span>
          </div>
        )}

        {sendError && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{sendError}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-sage-500/20">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResetDraft}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Clear Draft
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isSending || !message.trim()}
            leftIcon={<Send className={`w-3.5 h-3.5 ${isSending ? 'animate-pulse' : ''}`} />}
          >
            {isSending ? 'Dispatching Email...' : 'Send Email to Client'}
          </Button>
        </div>
      </form>

      {/* Communication History Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase text-slate-300 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-champagne-400" />
            <span>Communication History ({history.length})</span>
          </h4>
          <span className="text-[10px] font-mono text-slate-500">Chronological client interactions</span>
        </div>

        {history.length > 0 ? (
          <div className="space-y-2.5">
            {history.map((entry, idx) => {
              const isExpanded = expandedCommId === (entry.id || String(idx));
              return (
                <div
                  key={entry.id || idx}
                  className="p-3.5 rounded-xl bg-charcoal-900 border border-sage-500/25 space-y-2 transition-all"
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-xs font-sans">{entry.subject}</span>
                        {entry.templateName && (
                          <span className="px-1.5 py-0.2 rounded bg-charcoal-800 text-[9px] font-mono text-champagne-300 border border-champagne-500/30">
                            {entry.templateName}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        From: <span className="text-slate-300">{entry.sender || entry.senderName || entry.senderEmail || 'Peace Haven'}</span> &bull; To: <span className="text-slate-300">{entry.recipient || entry.recipientEmail || inquiry.email}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase ${
                        ['sent', 'delivered'].includes((entry.deliveryStatus || entry.status || 'sent').toLowerCase())
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}>
                        {entry.deliveryStatus || entry.status || 'Sent'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {entry.sentAt ? new Date(entry.sentAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Recent'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExpandedCommId(isExpanded ? null : (entry.id || String(idx)))}
                        className="p-1 rounded text-slate-400 hover:text-white"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Message body preview / full */}
                  <div className="pt-1 text-xs text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                    {(() => {
                      const text = entry.message || entry.body || '';
                      if (!text) return <span className="italic text-slate-500">No message content recorded.</span>;
                      return isExpanded ? text : `${text.substring(0, 160)}${text.length > 160 ? '...' : ''}`;
                    })()}
                  </div>

                  {entry.attachments && entry.attachments.length > 0 && (
                    <div className="flex items-center gap-2 pt-1 border-t border-sage-500/15 text-[11px] font-mono text-slate-400">
                      <Paperclip className="w-3 h-3 text-champagne-400" />
                      <span>Attachments ({entry.attachments.length}):</span>
                      {entry.attachments.map((a, i) => (
                        <span key={i} className="text-champagne-300 underline">
                          {a.fileName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-500 text-xs italic font-light p-3 rounded-xl bg-charcoal-900/60 border border-sage-500/20">
            No emails dispatched to the client yet. Select a template above to initiate contact.
          </p>
        )}
      </div>
    </div>
  );
};
