import { OAuth2Client } from 'google-auth-library';
import generateJWT from '../utils/generateJWT.js';
import User from '../models/userModel.js';

import jwt from 'jsonwebtoken';

const client = new OAuth2Client();

export const login = (req, res) => {
    res.send("User login"); // TODO manual log in
};

export const signup = (req, res) => {
    res.send("User signup"); // TODO manual sign up
};

export const verifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ valid: true, user: decoded });
    } catch (err) {
        res.status(401).json({ valid: false, error: "Invalid or expired token" });
    }
};

export const googleAuth = async (req, res) => {
    const { credential, clientId } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: clientId,
        });

        const payload = ticket.getPayload();

        const { email, name, picture } = payload;

        // Check if the user already exists in the database
        let user = await User.findOne({ email });
        if (!user) {
            // Create a new user if they don't exist
            user = await User.create({
                email,
                fullName: `${name}`,
                profilePicture: `${picture}`,
                authSource: 'google',
            });
        }

        if (!user) {
            throw new Error('User creation or retrieval failed.');
        }

        payload.token = generateJWT(user, res);
        res.status(200).json({ payload });
    } catch (err) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};

export const logout = async (req, res) => {

    try {
        res.cookie("token", "", {
            maxAge: 0
        });
        res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        res.status(400).json({ error: `Error: ${err.message}` });
    }
};