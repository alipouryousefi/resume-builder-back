import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import config from "../config/config";

declare global {
    namespace Express {
        interface Request {
            user?: any; // You can replace 'any' with your User model type if available
        }
    }
}

interface JwtPayload {
    id: string;
}

const protect = async(req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.headers.authorization;
        if(token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } else {
            res.status(401).json({message: "Unauthorized"}); 
        }
    } catch(err) {
        res.status(401).json({message: "Unauthorized"}); 
    }
}

export default protect;