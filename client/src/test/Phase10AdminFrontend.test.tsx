import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminRolesPage } from '../pages/admin/AdminRolesPage';
import { AdminAuditLogsPage } from '../pages/admin/AdminAuditLogsPage';
import { AdminProfilePage } from '../pages/admin/AdminProfilePage';
import { PermissionGuard } from '../components/common/PermissionGuard';
import { AccessDenied } from '../components/common/AccessDenied';
import { AdminUser } from '../types';

const mockSuperAdmin: AdminUser = {
  id: 'usr-1',
  email: 'admin@peacehaven.tech',
  name: 'Executive Lead',
  role: 'superadmin',
  status: 'active',
};

const mockSalesManager: AdminUser = {
  id: 'usr-5',
  email: 'david.okafor@peacehaven.tech',
  name: 'David Okafor',
  role: 'sales_manager',
  status: 'active',
};

const mockViewer: AdminUser = {
  id: 'usr-6',
  email: 'elena.rostova@peacehaven.tech',
  name: 'Elena Rostova',
  role: 'viewer',
  status: 'active',
};

describe('Phase 10 — Advanced Admin Management, RBAC & Audit System', () => {
  describe('1. Enhanced Admin Dashboard (/admin)', () => {
    it('renders centralized administration headline and operational metric cards', async () => {
      render(
        <AuthContext.Provider
          value={{
            user: mockSuperAdmin,
            token: 'mock-token',
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <BrowserRouter>
            <AdminDashboardPage />
          </BrowserRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByText(/Centralized Administration Console/i)).toBeInTheDocument();
      expect(screen.getByText(/TOTAL INQUIRIES/i)).toBeInTheDocument();
      expect(screen.getByText(/ACTIVE ADMINISTRATORS/i)).toBeInTheDocument();
      expect(screen.getByText(/GOVERNED ROLES/i)).toBeInTheDocument();
      expect(screen.getByText(/Administrative Modules/i)).toBeInTheDocument();
      expect(screen.getByText(/Recent Admin Activities/i)).toBeInTheDocument();
      expect(screen.getByText(/Security & Auth Events/i)).toBeInTheDocument();
    });
  });

  describe('2. User Management (/admin/users)', () => {
    it('renders admin users table, role labels, and Invite Administrator button', async () => {
      render(
        <AuthContext.Provider
          value={{
            user: mockSuperAdmin,
            token: 'mock-token',
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <BrowserRouter>
            <AdminUsersPage />
          </BrowserRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByRole('heading', { name: /Admin User Management/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Invite Administrator/i })).toBeInTheDocument();
      expect(screen.getByText(/Registered Administrators/i)).toBeInTheDocument();
      expect(screen.getByText(/Pending Invitations/i)).toBeInTheDocument();

      // Open Invite modal
      fireEvent.click(screen.getByRole('button', { name: /Invite Administrator/i }));
      expect(screen.getByText(/Business Email \*/i)).toBeInTheDocument();
      expect(screen.getByText(/Assign RBAC Role \*/i)).toBeInTheDocument();
    });
  });

  describe('3. Roles & Permissions Matrix (/admin/roles-permissions)', () => {
    it('renders 7 RBAC roles and module-level permission table', async () => {
      render(
        <AuthContext.Provider
          value={{
            user: mockSuperAdmin,
            token: 'mock-token',
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <BrowserRouter>
            <AdminRolesPage />
          </BrowserRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByRole('heading', { name: /Roles & Permissions Matrix/i })).toBeInTheDocument();
      expect(screen.getByText(/Super Admin/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Content Manager/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText(/Administrative Module/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/User Management/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/CMS Pages/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('4. Audit Logs (/admin/audit-logs)', () => {
    it('renders immutable audit log table, filters, and Export Report button', async () => {
      render(
        <AuthContext.Provider
          value={{
            user: mockSuperAdmin,
            token: 'mock-token',
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <BrowserRouter>
            <AdminAuditLogsPage />
          </BrowserRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByText(/System Audit & Compliance Log/i)).toBeInTheDocument();
      expect(screen.getByText(/Append-Only Immutable/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Export Audit Report/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Search audit actions, summaries, or actor emails/i)).toBeInTheDocument();
    });
  });

  describe('5. Administrator Profile (/admin/profile)', () => {
    it('renders profile details, change password form, and active sessions manager', async () => {
      render(
        <AuthContext.Provider
          value={{
            user: mockSuperAdmin,
            token: 'mock-token',
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <BrowserRouter>
            <AdminProfilePage />
          </BrowserRouter>
        </AuthContext.Provider>
      );

      expect(screen.getByText(/Administrator Profile & Security/i)).toBeInTheDocument();
      expect(screen.getByText(/Change Password/i)).toBeInTheDocument();
      expect(screen.getByText(/Active Administrator Sessions/i)).toBeInTheDocument();
      expect(screen.getByText(/My Recent Activity History/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Save Profile/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Update Password/i })).toBeInTheDocument();
    });
  });

  describe('6. Permission Guard & Access Restriction', () => {
    it('allows authorized superadmin to access protected child', () => {
      render(
        <AuthContext.Provider
          value={{
            user: mockSuperAdmin,
            token: 'mock-token',
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <PermissionGuard module="users" action="view">
            <div>Authorized Content Visible</div>
          </PermissionGuard>
        </AuthContext.Provider>
      );

      expect(screen.getByText(/Authorized Content Visible/i)).toBeInTheDocument();
    });

    it('blocks sales manager from user management and displays Access Restricted card', () => {
      render(
        <AuthContext.Provider
          value={{
            user: mockSalesManager,
            token: 'mock-token',
            isAuthenticated: true,
            login: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <MemoryRouter>
            <PermissionGuard module="users" action="view" isPage>
              <div>Secret User Data</div>
            </PermissionGuard>
          </MemoryRouter>
        </AuthContext.Provider>
      );

      expect(screen.queryByText(/Secret User Data/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Access Restricted/i)).toBeInTheDocument();
      expect(screen.getByText(/users:view/i)).toBeInTheDocument();
    });
  });
});
