/**
 * Role-based authorization middleware
 * Usage: requireRole("ADMIN")
 */
export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    // authMiddleware must run before this
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Unauthorized: user information missing",
      });
    }

    if (req.user.role !== requiredRole) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};
