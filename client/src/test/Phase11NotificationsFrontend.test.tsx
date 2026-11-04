import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { NotificationDropdown } from '../components/common/NotificationDropdown';
import { AdminNotificationsPage } from '../pages/admin/AdminNotificationsPage';
import { AdminRemindersPage } from '../pages/admin/AdminRemindersPage';
import { AdminNotificationSettingsPage } from '../pages/admin/AdminNotificationSettingsPage';
import { AuthProvider } from '../context/AuthContext';

describe('Phase 11 — Notifications, Email Automation & Communication Management (Frontend)', () => {
  describe('1. NotificationDropdown Component', () => {
    it('renders bell trigger button and unread badge', async () => {
      render(
        <MemoryRouter>
          <NotificationDropdown />
        </MemoryRouter>
      );

      const trigger = screen.getByLabelText(/View notifications/i);
      expect(trigger).toBeInTheDocument();

      await waitFor(() => {
        const badge = screen.getByTestId('notification-badge');
        expect(badge).toBeInTheDocument();
      });
    });

    it('opens dropdown and displays recent notifications upon click', async () => {
      render(
        <MemoryRouter>
          <NotificationDropdown />
        </MemoryRouter>
      );

      const trigger = screen.getByLabelText(/View notifications/i);
      fireEvent.click(trigger);

      await waitFor(() => {
        const dropdown = screen.getByTestId('notification-dropdown');
        expect(dropdown).toBeInTheDocument();
        expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
        expect(screen.getByText(/Open Notification Center/i)).toBeInTheDocument();
      });
    });
  });

  describe('2. AdminNotificationsPage (/admin/notifications)', () => {
    it('renders dashboard heading, metric cards, and category tabs', async () => {
      render(
        <MemoryRouter>
          <AdminNotificationsPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Centralized Communication & Alerts/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Alerts/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed Deliveries/i)).toBeInTheDocument();

      // Verify Tabs exist
      expect(screen.getByRole('button', { name: /In-App Notifications/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Email Delivery Logs/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Email Templates/i })).toBeInTheDocument();
    });

    it('displays in-app notifications feed with category badges', async () => {
      render(
        <MemoryRouter>
          <AdminNotificationsPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/New Enterprise Lead: Vanguard Global Financials/i)).toBeInTheDocument();
        expect(screen.getAllByText(/Inquiry/i)[0]).toBeInTheDocument();
      });
    });

    it('switches to Email Templates tab and shows core templates with preview buttons', async () => {
      render(
        <MemoryRouter>
          <AdminNotificationsPage />
        </MemoryRouter>
      );

      const templatesTab = screen.getByRole('button', { name: /Email Templates/i });
      fireEvent.click(templatesTab);

      await waitFor(() => {
        expect(screen.getByText(/Client Inquiry Confirmation/i)).toBeInTheDocument();
        const previewBtns = screen.getAllByText(/Preview & Test/i);
        expect(previewBtns.length).toBeGreaterThan(0);
      });
    });
  });

  describe('3. AdminRemindersPage (/admin/reminders)', () => {
    it('renders reminder metric counters and filter tabs', async () => {
      render(
        <MemoryRouter>
          <AdminRemindersPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Lead Follow-Up & Reminders/i)).toBeInTheDocument();
      expect(screen.getByText(/Due Today/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Overdue/i)[0]).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Schedule Follow-Up/i })).toBeInTheDocument();
    });

    it('renders scheduled follow-up items with priority and inquiry references', async () => {
      render(
        <MemoryRouter>
          <AdminRemindersPage />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(screen.getByText(/Client Scoping Review with Apex Robotics/i)).toBeInTheDocument();
        expect(screen.getByText(/Ref: PH-MW1O45EI-3345/i)).toBeInTheDocument();
      });
    });

    it('opens the Schedule Follow-Up modal when button clicked', async () => {
      render(
        <MemoryRouter>
          <AdminRemindersPage />
        </MemoryRouter>
      );

      const scheduleBtn = screen.getByRole('button', { name: /Schedule Follow-Up/i });
      fireEvent.click(scheduleBtn);

      expect(screen.getByText(/Schedule Follow-Up Reminder/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/e\.g\. Follow-up on pricing proposal/i)).toBeInTheDocument();
    });
  });

  describe('4. AdminNotificationSettingsPage (/admin/notification-settings)', () => {
    it('renders category routing matrix and mandatory security locks', async () => {
      render(
        <MemoryRouter>
          <AdminNotificationSettingsPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Notification & Alert Settings/i)).toBeInTheDocument();
      expect(screen.getByText(/New Client Inquiries/i)).toBeInTheDocument();
      expect(screen.getByText(/Security & System Alerts/i)).toBeInTheDocument();
      expect(screen.getByText(/Mandatory/i)).toBeInTheDocument();
    });

    it('renders delivery frequency selection and save button', async () => {
      render(
        <MemoryRouter>
          <AdminNotificationSettingsPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Immediate Alerts \(Recommended\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Daily Digest Summary/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Save Notification Preferences/i })).toBeInTheDocument();
    });
  });
});
