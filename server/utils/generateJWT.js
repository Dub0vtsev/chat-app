import jwt from 'jsonwebtoken';

const generateJWT = (user, res) => {
    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Adjust expiration time as needed
    });

    // Send the token as a cookie and response
    res
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d in milliseconds
            sameSite: "strict"
        });
};

export default generateJWT;