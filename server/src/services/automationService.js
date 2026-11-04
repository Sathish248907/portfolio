import { emailService } from './emailService.js';
import { notificationService } from './notificationService.js';

export const automationService = {
  /**
   * Centralized application event dispatcher
   */
  async emitEvent(eventType, payload = {}) {
    try {
      switch (eventType) {
        case 'INQUIRY_CREATED': {
          const { inquiry } = payload;
          if (!inquiry) break;

          // 1. Client Confirmation Email & 2. Admin Alert Email
          await Promise.all([
            emailService.sendClientInquiryConfirmation(inquiry),
            emailService.notifyTeamOfInquiry(inquiry),
          ]).catch((err) => console.warn('[AUTOMATION EMAIL WARNING]:', err.message));

          // 3. In-App Notification to Sales & Admins
          await notificationService.createNotification({
            recipientRole: 'sales_manager',
            title: `New Project Inquiry: ${inquiry.companyName || inquiry.clientName}`,
            message: `${inquiry.service} inquiry received with budget tier ${inquiry.budgetRange}. Reference: ${inquiry.referenceNumber}`,
            category: 'inquiry',
            type: 'info',
            relatedResourceId: inquiry.referenceNumber,
            relatedResourceType: 'inquiry',
            actionUrl: `/admin/inquiries?search=${inquiry.referenceNumber}`,
          });
          break;
        }

        case 'INQUIRY_ASSIGNED': {
          const { inquiry, assignee, assignedBy } = payload;
          if (!inquiry || !assignee) break;

          await notificationService.createNotification({
            recipientId: assignee._id,
            recipientRole: assignee.role,
            title: `Inquiry Assigned: Ref ${inquiry.referenceNumber}`,
            message: `Assigned to you by ${assignedBy?.name || 'an administrator'} for ${inquiry.companyName} (${inquiry.service}).`,
            category: 'inquiry',
            type: 'info',
            relatedResourceId: inquiry.referenceNumber,
            relatedResourceType: 'inquiry',
            actionUrl: `/admin/inquiries?search=${inquiry.referenceNumber}`,
          });
          break;
        }

        case 'INQUIRY_STATUS_CHANGED': {
          const { inquiry, prevStatus, newStatus, user, notifyClient, clientNotes } = payload;
          if (!inquiry) break;

          // In-App Notification
          await notificationService.createNotification({
            recipientRole: 'sales_manager',
            title: `Lead Status Updated: ${inquiry.referenceNumber}`,
            message: `Status transitioned from ${prevStatus || 'NEW'} to ${newStatus} by ${user?.name || 'Administrator'}.`,
            category: 'inquiry',
            type: newStatus === 'CONVERTED' ? 'success' : 'info',
            relatedResourceId: inquiry.referenceNumber,
            relatedResourceType: 'inquiry',
            actionUrl: `/admin/inquiries?search=${inquiry.referenceNumber}`,
          });

          // Optional Client Status Email
          if (notifyClient && inquiry.email) {
            await emailService.sendInquiryStatusUpdate({
              inquiry,
              newStatus,
              statusDescription: `Your engineering project inquiry has advanced to the '${newStatus}' phase.`,
              notes: clientNotes || 'Our senior architects are reviewing your specifications.',
            }).catch((err) => console.warn('[STATUS EMAIL WARNING]:', err.message));
          }
          break;
        }

        case 'ADMIN_INVITED': {
          const { email, name, role, token, expiresAt, invitedByName } = payload;
          await emailService.sendAdminInvitation({
            email,
            name,
            role,
            token,
            expiresAt,
            invitedByName,
          }).catch((err) => console.warn('[INVITATION EMAIL WARNING]:', err.message));

          await notificationService.createNotification({
            recipientRole: 'superadmin',
            title: `New Administrator Invited: ${email}`,
            message: `Invitation issued for role '${role}' by ${invitedByName || 'Super Admin'}.`,
            category: 'user_management',
            type: 'info',
            relatedResourceId: email,
            relatedResourceType: 'user',
            actionUrl: `/admin/users`,
          });
          break;
        }

        case 'INVITATION_ACCEPTED': {
          const { user, invitation } = payload;
          await notificationService.createNotification({
            recipientRole: 'superadmin',
            title: `Staff Invitation Accepted: ${user.name}`,
            message: `${user.email} completed account activation as ${user.role}.`,
            category: 'user_management',
            type: 'success',
            relatedResourceId: user._id.toString(),
            relatedResourceType: 'user',
            actionUrl: `/admin/users`,
          });
          break;
        }

        case 'USER_LOCKED': {
          const { user, ipAddress, attempts } = payload;
          await emailService.sendSecurityAlert({
            eventTitle: `Administrative Account Locked: ${user.email}`,
            accountEmail: user.email,
            ipAddress,
            details: `Account temporarily locked for 15 minutes following ${attempts || 5} consecutive invalid authentication attempts.`,
            actionRequired: 'Verify whether this is authorized staff attempting access or an unauthorized brute-force anomaly.',
          }).catch((err) => console.warn('[SECURITY EMAIL WARNING]:', err.message));

          await notificationService.createNotification({
            recipientRole: 'superadmin',
            title: `Security Lockout: ${user.email}`,
            message: `Account locked after repeated failed login attempts from IP: ${ipAddress}.`,
            category: 'security',
            type: 'urgent',
            relatedResourceId: user._id?.toString() || user.email,
            relatedResourceType: 'security',
            actionUrl: `/admin/audit-logs?search=${user.email}`,
          });
          break;
        }

        case 'CMS_PUBLISHED': {
          const { entityType, title, id, user } = payload;
          await notificationService.createNotification({
            recipientRole: 'content_manager',
            title: `Content Published: ${title}`,
            message: `${entityType} '${title}' was published to live website by ${user?.name || 'Editor'}.`,
            category: 'cms',
            type: 'success',
            relatedResourceId: id,
            relatedResourceType: entityType === 'page' ? 'page' : 'post',
            actionUrl: `/admin/cms`,
          });
          break;
        }

        default:
          console.log(`[Automation Engine] Unhandled event type: ${eventType}`);
      }
    } catch (err) {
      console.error(`[Automation Engine Error] Failed processing ${eventType}:`, err.message);
    }
  },
};

