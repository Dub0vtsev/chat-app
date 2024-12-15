import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ error: `Error: no token` });
        } else {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ error: `Error: invalid token` });
            } else {
                const user = await User.findById(decoded.userId);
                if (!user) {
                    return res.status(404).json({ error: `Error: no user found` });
                } else {
                    req.user = user;
                    next();
                }
            }
        }
    } catch (err) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export default isAuth;