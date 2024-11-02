import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    let token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({error: 'Token not provided'});
    }

    token = token.split(" ")[1];
    console.log(token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_kEY);
        req.email = decoded.email;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: 'Invalid Token'});
    }

    
}