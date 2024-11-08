import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();
  const { prompt } = body;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`; // Update with the correct endpoint

  try {
    const response = await axios.post(url, { prompt }, {
      headers: {
        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Here, we can access error.response and other properties safely
      console.error('Error response:', error.response?.data);
      return NextResponse.json({ message: 'Error calling Gemini API', error: error.response?.data }, { status: error.response?.status || 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ message: 'An unexpected error occurred', error: 'Unknown error' }, { status: 500 });
    }
  }
}
