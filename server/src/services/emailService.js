import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

let transporter = null;

function getTransporter() {
  if (!transporter) {
    if (config.smtp.user && config.smtp.pass) {
      transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.port === 465,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass,
        },
      });
    } else {
      // Development simulated transport (does not crash if credentials not provided)
      transporter = {
        sendMail: async (options) => {
          console.log(`[Email Simulation] To: ${options.to} | Subject: "${options.subject}"`);
          return { messageId: `simulated-${Date.now()}` };
        },
      };
    }
  }
  return transporter;
}

export const emailService = {
  /**
   * Send confirmation to client who submitted inquiry
   */
  async sendClientInquiryConfirmation(inquiry) {
    try {
      const mailer = getTransporter();
      await mailer.sendMail({
        from: config.smtp.from,
        to: inquiry.email,
        subject: `[Peace Haven] Inquiry Received: Ref ${inquiry.referenceNumber}`,
        text: `Dear ${inquiry.clientName},

Thank you for contacting Peace Haven Technologies. Your project inquiry has been registered in our engineering dispatch queue.

Tracking Reference Number: ${inquiry.referenceNumber}
Selected Service: ${inquiry.service}
Organization: ${inquiry.companyName}
Budget Tier: ${inquiry.budgetRange}
Timeline: ${inquiry.timeline}

Our senior engineering leads are reviewing your specifications and will respond with an architectural scoping assessment within 24-48 business hours.

Sincerely,
Peace Haven Technologies Inc.
Engineering Ideas. Empowering Industries.`,
        html: `<div style="font-family: Arial, sans-serif; background-color: #030712; color: #f1f5f9; padding: 24px; border-radius: 8px;">
          <h2 style="color: #22d3ee; margin-top: 0;">Peace Haven Technologies</h2>
          <p>Dear <strong>${inquiry.clientName}</strong>,</p>
          <p>Thank you for submitting your engineering requirements. Your inquiry has been registered under the following tracking reference:</p>
          <div style="background-color: #0c1733; padding: 16px; border: 1px solid #162447; border-radius: 6px; font-family: monospace; font-size: 16px; color: #67e8f9; margin: 16px 0;">
            Reference: <strong>${inquiry.referenceNumber}</strong>
          </div>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #94a3b8;">
            <tr><td style="padding: 6px 0;"><strong>Service:</strong></td><td style="color: #ffffff;">${inquiry.service}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Company:</strong></td><td style="color: #ffffff;">${inquiry.companyName}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Budget:</strong></td><td style="color: #ffffff;">${inquiry.budgetRange}</td></tr>
            <tr><td style="padding: 6px 0;"><strong>Timeline:</strong></td><td style="color: #ffffff;">${inquiry.timeline}</td></tr>
          </table>
          <p style="margin-top: 20px; font-size: 13px; color: #94a3b8;">Our principal architects are reviewing your specifications and will contact you within 24-48 business hours.</p>
          <hr style="border: none; border-top: 1px solid #1e293b; margin: 24px 0;" />
          <p style="font-size: 11px; color: #64748b; font-family: monospace;">Peace Haven Technologies Inc. &bull; Engineering Ideas. Empowering Industries.</p>
        </div>`,
      });
      console.log(`[Email] Client confirmation successfully dispatched for ref: ${inquiry.referenceNumber}`);
    } catch (err) {
      console.error(`[Email Failure] Could not send client confirmation for ref ${inquiry.referenceNumber}:`, err.message);
      // Handled without throwing so inquiry is never lost
    }
  },

  /**
   * Send notification to internal engineering inbox
   */
  async notifyTeamOfInquiry(inquiry) {
    try {
      const mailer = getTransporter();
      await mailer.sendMail({
        from: config.smtp.from,
        to: config.smtp.notificationEmail,
        subject: `[NEW LEAD] ${inquiry.service} - ${inquiry.companyName} (${inquiry.referenceNumber})`,
        text: `New Project Inquiry Received:
Ref: ${inquiry.referenceNumber}
Client: ${inquiry.clientName}
Company: ${inquiry.companyName}
Email: ${inquiry.email}
Phone: ${inquiry.phoneNumber || 'N/A'}
Service: ${inquiry.service}
Budget: ${inquiry.budgetRange}
Timeline: ${inquiry.timeline}

Requirements:
${inquiry.projectRequirements}`,
      });
      console.log(`[Email] Team notification dispatched for ref: ${inquiry.referenceNumber}`);
    } catch (err) {
      console.error(`[Email Failure] Could not send team notification for ref ${inquiry.referenceNumber}:`, err.message);
      // Handled safely without losing inquiry
    }
  },

  /**
   * Send Administrator Invitation Email with secure one-time activation link
   */
  async sendAdminInvitation({ email, name, role, token, expiresAt }) {
    try {
      const mailer = getTransporter();
      const inviteUrl = `${process.env.APP_URL || 'http://localhost:5155'}/admin/accept-invitation?token=${token}`;
      await mailer.sendMail({
        from: config.smtp.from,
        to: email,
        subject: `[Peace Haven] You have been invited to join the Administrative Portal`,
        text: `Hello ${name || 'Administrator'},

You have been invited to join the Peace Haven Technologies administrative platform with the role: ${role}.

To activate your account and set your secure password, please open the following link within 48 hours:
${inviteUrl}

If you did not expect this invitation, please contact security@peacehaven.tech.

Peace Haven Technologies Inc.
Engineering Ideas. Empowering Industries.`,
        html: `<div style="font-family: Arial, sans-serif; background-color: #07151e; color: #f1f5f9; padding: 28px; border-radius: 12px; border: 1px solid #1b3240;">
          <h2 style="color: #dfa561; margin-top: 0;">Peace Haven Technologies</h2>
          <p>Hello <strong>${name || 'Administrator'}</strong>,</p>
          <p>You have been invited to join the administrative team as a <strong>${role}</strong>.</p>
          <p>Please complete your account verification and set your password by clicking the button below:</p>
          <div style="margin: 24px 0;">
            <a href="${inviteUrl}" style="background-color: #dfa561; color: #07151e; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
              Activate Admin Account
            </a>
          </div>
          <p style="font-size: 12px; color: #94a3b8;">This secure one-time invitation link will expire at ${new Date(expiresAt).toUTCString()}.</p>
          <p style="font-size: 11px; color: #64748b; font-family: monospace;">If button doesn't work, copy and paste this URL into your browser:<br/>${inviteUrl}</p>
        </div>`,
      });
      console.log(`[Email] Admin invitation successfully dispatched to: ${email}`);
    } catch (err) {
      console.error(`[Email Failure] Could not send admin invitation to ${email}:`, err.message);
    }
  },
};
