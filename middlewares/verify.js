import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function verify(request,response,next){
    console.log(request.headers.authorization);
    // let token=request.headers.authorization;
    // if (!token){return res.status(403).send({ auth: false, message: 'No token provided.' });}
    // jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    //     if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    //     next()
    // });
    const token = request.body.token || request.query.token || request.headers["x-access-token"]||request.headers.authorization;

    if (!token) {
        return response.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // request.user = decoded;
    } catch (err) {
        return response.status(401).send("Invalid Token");
    }
    return next();
}