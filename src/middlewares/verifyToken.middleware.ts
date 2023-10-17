import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { LogInfo } from '../utils/logger'
import dotenv from 'dotenv'

dotenv.config()
const secret = process.env.SECRETKEY || 'secret'

/**
 * @param req Original request previous verification
 * @param res Response to verification of JWT
 * @param next Next function
 * @returns Error verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Check token in HEADER 'x-access-token'
    const token: any = req.headers['x-access-token']

    if (!token) {
        return res.status(403).send({
            authenticationError: 'Missing jwt in request',
            message: 'Missing jwt in request'
        })
    }
    // Verify token
    jwt.verify(token, secret, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                authenticationError: 'JWT verification failed',
                message: 'Error in JWT verification'
            })
        }
        LogInfo(decoded)
        // If JWT is OK
        next()
    })
}
