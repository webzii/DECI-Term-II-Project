// Import Request and Response types from Express
import {Request, Response} from 'express'

// Health check handler that returns "pong"
export const ping = (req: Request, res: Response) => {
    // Health check handler that returns "pong"
    res.status(200).json({message: `pong`})
}