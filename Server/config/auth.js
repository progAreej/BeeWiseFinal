const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);

        // Ensure these fields exist in the token payload
        if (!verified.id || !verified.role) {
            return res.status(403).json({ message: 'Invalid token structure.' });
        }

      
        req.user = { id: verified.id, role: verified.role };

        console.log("req.user: ", req.user);
       

        next(); // Call the next middleware
    } catch (err) {
        console.error('Token verification failed:', err.message);
        return res.status(403).json({ message: 'Invalid token.' });
    }
};
