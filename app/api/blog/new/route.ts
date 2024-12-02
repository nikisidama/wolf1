import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/utils/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { subject, detail, userId } = req.body;

        if (!subject || !detail || !userId) {
            return res.status(400).json({ error: 'All fields (subject, detail, userId) are required.' });
        }

        try {
            const post = await prisma.post.create({
                data: {
                    subject,
                    detail,
                    userId,
                },
            });

            return res.status(201).json(post);
        } catch (error) {
            console.error('Error creating post:', error);
            return res.status(500).json({ error: 'An error occurred while creating the post.' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }
}
