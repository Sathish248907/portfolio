import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AccessDenied } from './AccessDenied';
import { FALLBACK_ROLES } from '../../services/api/adminApi';

interface PermissionGuardProps {
  module: string;
  action?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  isPage?: boolean;
}

export function checkUserPermission(
  userRole: string | undefined,
  module: string,
  action: string = 'view'
): boolean {
  if (!userRole) return false;
  if (userRole === 'superadmin') return true;

  const target = `${module}:${action}`;
  const matchedRole = FALLBACK_ROLES.find((r) => r.slug === userRole);
  if (!matchedRole) return false;

  return matchedRole.permissions.includes(target) || matchedRole.permissions.includes(`${module}:*`);
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  module,
  action = 'view',
  children,
  fallback = null,
  isPage = false,
}) => {
  const { user } = useAuth();
  const allowed = checkUserPermission(user?.role, module, action);

  if (!allowed) {
    if (isPage) {
      return (
        <AccessDenied
          moduleName={module}
          requiredPermission={`${module}:${action}`}
          userRole={user?.role || 'Guest'}
        />
      );
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

