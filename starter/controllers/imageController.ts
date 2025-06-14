import { Request, Response } from "express"

export const uploadImage = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            throw new Error('No File Uploaded')
        }
        res.status(200).json({message: 'Image Uploaded', __filename: req.file.filename})
    } catch (error: any) {
        res.status(400).json({error: error.message})
    }
}