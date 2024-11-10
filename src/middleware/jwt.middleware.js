import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    let { token } = req.cookies;
    if(!token) {
        return res.status(401).json({error: 'Token not provided'});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_kEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'Invalid Token'});
    }

    
}