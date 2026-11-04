import { Inquiry } from '../models/Inquiry.js';
import { emailService } from './emailService.js';
import { wrapInBaseEmailLayout } from './emailTemplateService.js';
import { EmailLog } from '../models/EmailLog.js';
import { notificationService } from './notificationService.js';

export const CLIENT_COMMUNICATION_TEMPLATES = [
  {
    id: 'inquiry_acknowledgment',
    slug: 'inquiry_acknowledgment',
    name: '1. Inquiry Acknowledgment',
    description: 'Initial official acknowledgment and engineering queue notice',
    subject: 'Re: Project Engagement – {{referenceNumber}}: Inquiry Acknowledged',
    defaultBody: `Dear {{clientName}},

Thank you for contacting Peace Haven Technologies regarding your project, "{{projectTitle}}".

We have officially received your requirements (Ref: {{referenceNumber}}) and our solutions engineering team has begun reviewing your technical specifications.

A lead architect specializing in {{selectedServices}} will evaluate the architecture, delivery timeline, and scoping details. We will provide a structured initial response within 24–48 business hours.

Best regards,
{{adminName}}
Peace Haven Technologies
Engineering Ideas. Empowering Industries.`,
  },
  {
    id: 'thank_you_requirements',
    slug: 'thank_you_requirements',
    name: '2. Thank You for Your Project Requirements',
    description: 'Confirmation that specifications have been analyzed and found aligned',
    subject: 'Re: Project Specifications Review – {{referenceNumber}} ({{companyName}})',
    defaultBody: `Dear {{clientName}},

Thank you for providing the detailed business requirements and deliverables for "{{projectTitle}}".

Our engineering leads have completed an initial review of your requirements. We are impressed by the scope of the initiative and see clear architectural alignment with our capabilities in {{selectedServices}}.

We are currently preparing an initial scope brief and preliminary technical recommendations for {{companyName}}.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'request_additional_info',
    slug: 'request_additional_info',
    name: '3. Request for Additional Information',
    description: 'Clarifying technical assumptions, integrations, or compliance standards',
    subject: 'Technical Scoping Questions – Ref {{referenceNumber}}: {{projectTitle}}',
    defaultBody: `Dear {{clientName}},

We are currently conducting the architectural assessment for "{{projectTitle}}" (Ref: {{referenceNumber}}).

To ensure our solution proposal accurately reflects your operational environment at {{companyName}}, could you please provide additional details on:
1. Current infrastructure, legacy systems, or third-party APIs to interface with.
2. Expected concurrency, daily active volume, or throughput requirements.
3. Security or regulatory compliance standards (e.g. SOC 2, HIPAA, PCI-DSS, ISO 27001).

Thank you for your assistance. We look forward to your response.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'project_clarification',
    slug: 'project_clarification',
    name: '4. Project Clarification',
    description: 'Resolving milestone dependencies or architectural trade-offs',
    subject: 'Clarification Regarding Project Scope – Ref {{referenceNumber}}',
    defaultBody: `Dear {{clientName}},

Thank you for your patience as we finalize the technical scoping for "{{projectTitle}}".

We would like to clarify a few key assumptions regarding the target deliverables and milestones to ensure mutual alignment before preparing the formal proposal.

Please review our preliminary scoping notes and let us know your feedback at your earliest convenience.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'schedule_discussion',
    slug: 'schedule_discussion',
    name: '5. Schedule a Project Discussion',
    description: 'Inviting client stakeholders to a live discovery video session',
    subject: 'Invitation to Project Discovery Session – Ref {{referenceNumber}}',
    defaultBody: `Dear {{clientName}},

Following our review of your project requirements for "{{projectTitle}}", we would like to invite you and your technical stakeholders at {{companyName}} to a 30-minute discovery session.

During this call, our Principal Architect will discuss:
- High-level architecture recommendations
- Technology stack considerations and hardware/cloud dependencies
- Milestone roadmap and delivery options

Please let us know your availability over the coming days, or reply with times that work best for your team.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'meeting_confirmation',
    slug: 'meeting_confirmation',
    name: '6. Meeting Confirmation',
    description: 'Confirming scheduled discovery session with conference details',
    subject: 'Confirmed: Project Discovery Session – Ref {{referenceNumber}}',
    defaultBody: `Dear {{clientName}},

This email confirms our upcoming technical discovery session regarding "{{projectTitle}}" (Ref: {{referenceNumber}}).

We look forward to meeting with the {{companyName}} team. A calendar invitation with video conference credentials has been dispatched to your email.

Should you need to reschedule or invite additional participants, please let us know.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'project_proposal',
    slug: 'project_proposal',
    name: '7. Project Proposal',
    description: 'Transmitting formal engineering blueprint and commercial proposal',
    subject: 'Technical Proposal & Commercial Terms – Ref {{referenceNumber}}: {{projectTitle}}',
    defaultBody: `Dear {{clientName}},

We are pleased to present Peace Haven's formal technical proposal for "{{projectTitle}}".

The proposal details our recommended system architecture, sprint-by-sprint milestone breakdown, engineering deliverables, SLA guarantees, and commercial investment schedule.

We welcome the opportunity to review this proposal with you and address any questions from your leadership team.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'quotation_estimate',
    slug: 'quotation_estimate',
    name: '8. Quotation / Cost Estimate',
    description: 'Delivering itemized budget tiers, sprint estimates, and phasing',
    subject: 'Commercial Quotation & Scope Estimate – Ref {{referenceNumber}}',
    defaultBody: `Dear {{clientName}},

Enclosed please find the detailed commercial quotation and cost breakdown for "{{projectTitle}}" (Ref: {{referenceNumber}}).

Our estimate covers engineering sprints, QA validation, infrastructure orchestration, and dedicated post-launch support.

Please let us know if you would like any adjustments to the scope or deployment phasing.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'follow_up',
    slug: 'follow_up',
    name: '9. Follow-Up',
    description: 'Checking in on previously shared proposal or scoping questions',
    subject: 'Following Up on Your Project Engagement – Ref {{referenceNumber}}',
    defaultBody: `Dear {{clientName}},

I am following up regarding your project inquiry for "{{projectTitle}}" (Ref: {{referenceNumber}}).

We wanted to check if you had an opportunity to review our latest communication, and if there are any additional questions our team can answer for {{companyName}}.

We remain excited about partnering on this initiative and look forward to hearing from you.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'inquiry_accepted',
    slug: 'inquiry_accepted',
    name: '10. Inquiry Accepted',
    description: 'Congratulatory kickoff notice upon contract approval',
    subject: 'Project Engagement Approved – Ref {{referenceNumber}}: Welcome to Peace Haven',
    defaultBody: `Dear {{clientName}},

We are thrilled to formally confirm that the project engagement for "{{projectTitle}}" (Ref: {{referenceNumber}}) has been approved.

Our operations team is now initiating the onboarding process and allocating your dedicated engineering squad. Your designated Project Lead will reach out shortly with the kickoff schedule and repository setup.

Welcome to Peace Haven.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
  {
    id: 'inquiry_closed',
    slug: 'inquiry_closed',
    name: '11. Inquiry Closed',
    description: 'Polite formal closure of inactive or deferred lead',
    subject: 'Inquiry Status Update: Closed – Ref {{referenceNumber}}',
    defaultBody: `Dear {{clientName}},

We are writing to confirm that inquiry {{referenceNumber}} regarding "{{projectTitle}}" has been formally closed in our records.

Thank you for considering Peace Haven. Should your requirements evolve or new engineering initiatives arise at {{companyName}}, please feel free to reach out to us at any time.

Best regards,
{{adminName}}
Peace Haven Technologies`,
  },
];

export const inquiryCommunicationService = {
  /**
   * Return the 11 standard email communication templates
   */
  getTemplates() {
    return CLIENT_COMMUNICATION_TEMPLATES;
  },

  /**
   * Send a direct email to a prospective client and record in communication history
   */
  async sendClientEmail(inquiryIdOrRef, { recipientEmail, subject, message, templateSlug, attachments = [] }, senderUser) {
    const inquiry = await Inquiry.findOne({
      $or: [
        { _id: inquiryIdOrRef.match(/^[0-9a-fA-F]{24}$/) ? inquiryIdOrRef : null },
        { referenceNumber: inquiryIdOrRef },
      ],
    });

    if (!inquiry) {
      throw new Error(`Inquiry not found for identifier: ${inquiryIdOrRef}`);
    }

    const senderEmail = senderUser?.email || 'inquiries@peacehaven.tech';
    const senderName = senderUser?.name || 'Peace Haven Engineering Lead';
    const targetRecipient = recipientEmail || inquiry.email;

    // Convert newlines in message to clean HTML paragraphs
    const formattedHtmlBody = message
      .split('\n\n')
      .map((p) => `<p style="margin: 0 0 16px; line-height: 1.6;">${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');

    const fullHtml = wrapInBaseEmailLayout({
      title: subject,
      previewText: `Message from Peace Haven regarding Ref: ${inquiry.referenceNumber}`,
      content: `
        <div style="margin-bottom: 20px;">
          ${formattedHtmlBody}
        </div>
        <div class="info-card" style="margin-top: 24px; font-size: 12px; color: #A8B5AE;">
          <strong style="color: #C4A77D;">Engagement Reference:</strong> ${inquiry.referenceNumber}<br/>
          <strong style="color: #C4A77D;">Organization:</strong> ${inquiry.companyName}<br/>
          <strong style="color: #C4A77D;">Lead Architect:</strong> ${senderName} (${senderEmail})
        </div>
      `,
    });

    let deliveryStatus = 'sent';
    let errorMessage = null;

    try {
      // Dispatch via email service
      await emailService.sendEmail({
        to: targetRecipient,
        subject,
        html: fullHtml,
        text: message,
        idempotencyKey: `comm_${inquiry.referenceNumber}_${Date.now()}`,
      });
    } catch (err) {
      deliveryStatus = 'failed';
      errorMessage = err.message;
      console.warn(`[Client Communication Delivery Warning]: ${err.message}`);
    }

    // Match template name if provided
    const matchedTemplate = CLIENT_COMMUNICATION_TEMPLATES.find((t) => t.slug === templateSlug);

    const commEntry = {
      id: `comm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type: 'email_sent',
      direction: 'outbound',
      sender: `${senderName} <${senderEmail}>`,
      recipient: targetRecipient,
      subject,
      message,
      templateSlug: templateSlug || '',
      templateName: matchedTemplate ? matchedTemplate.name : 'Custom Administrator Response',
      attachments: attachments.map((a) => ({
        fileName: a.fileName || 'document',
        fileSize: a.fileSize || 0,
        fileType: a.fileType || 'application/octet-stream',
        fileUrl: a.fileUrl || '',
      })),
      deliveryStatus,
      sentAt: new Date(),
      notes: errorMessage ? `Delivery note: ${errorMessage}` : undefined,
    };

    if (!inquiry.communicationHistory) {
      inquiry.communicationHistory = [];
    }
    inquiry.communicationHistory.push(commEntry);
    inquiry.lastCommunicatedAt = new Date();

    // If inquiry was NEW, advance status to CONTACTED automatically
    if (inquiry.status === 'NEW') {
      const prevStatus = inquiry.status;
      inquiry.status = 'CONTACTED';
      inquiry.auditHistory.push({
        action: 'STATUS_AUTO_ADVANCE',
        changedBy: senderEmail,
        previousStatus: prevStatus,
        newStatus: 'CONTACTED',
        notes: `Automatically transitioned to CONTACTED upon administrator email dispatch ("${subject}")`,
        timestamp: new Date(),
      });
    }

    inquiry.auditHistory.push({
      action: 'CLIENT_EMAIL_SENT',
      changedBy: senderEmail,
      previousStatus: inquiry.status,
      newStatus: inquiry.status,
      notes: `Sent email to ${targetRecipient}: "${subject}"`,
      timestamp: new Date(),
    });

    await inquiry.save();

    // In-App Notification alerting the team
    await notificationService.createNotification({
      recipientRole: 'sales_manager',
      title: `Client Email Sent: Ref ${inquiry.referenceNumber}`,
      message: `${senderName} replied to ${inquiry.clientName} (${targetRecipient}): "${subject}".`,
      category: 'inquiry',
      type: 'info',
      relatedResourceId: inquiry.referenceNumber,
      relatedResourceType: 'inquiry',
      actionUrl: `/admin/inquiries?search=${inquiry.referenceNumber}`,
    }).catch(() => {});

    return {
      success: true,
      communication: commEntry,
      deliveryStatus,
      inquiry,
    };
  },

  /**
   * Retrieve chronological communication history for an inquiry
   */
  async getCommunicationHistory(inquiryIdOrRef) {
    const inquiry = await Inquiry.findOne({
      $or: [
        { _id: inquiryIdOrRef.match(/^[0-9a-fA-F]{24}$/) ? inquiryIdOrRef : null },
        { referenceNumber: inquiryIdOrRef },
      ],
    }).select('communicationHistory referenceNumber clientName companyName email lastCommunicatedAt');

    if (!inquiry) {
      throw new Error(`Inquiry not found for identifier: ${inquiryIdOrRef}`);
    }

    return {
      referenceNumber: inquiry.referenceNumber,
      clientName: inquiry.clientName,
      companyName: inquiry.companyName,
      email: inquiry.email,
      lastCommunicatedAt: inquiry.lastCommunicatedAt,
      history: inquiry.communicationHistory || [],
    };
  },
};

