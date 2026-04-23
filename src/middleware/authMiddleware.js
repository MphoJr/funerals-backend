import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains id and role
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// General token check (optional, if you want to use it later)
export function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded payload (id, role)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Admin-only check
export function verifyAdmin(req, res, next) {
  authenticate(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }
    next();
  });
}
