export function auditLogger(action) {
  return (req, res, next) => {
    const userEmail = req.user?.email || 'unauthenticated';
    const ip = req.ip || req.connection.remoteAddress;
    console.log(`[AUDIT] Action: ${action} | User: ${userEmail} | IP: ${ip} | Path: ${req.originalUrl} | Time: ${new Date().toISOString()}`);
    next();
  };
}
