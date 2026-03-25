import jwt from "jsonwebtoken";

export const authenticateClient = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.clientId = decoded.id; // attach client ID to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
