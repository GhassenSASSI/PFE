require('../../dotenv-config');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Middleware function to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Verification error:', err);
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};