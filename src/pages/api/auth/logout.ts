import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    // Hapus cookie token dengan mengatur expired ke masa lalu
    const tokenCookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    });
    res.setHeader('Set-Cookie', tokenCookie);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
}