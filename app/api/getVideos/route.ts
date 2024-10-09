import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ message: 'Query is required' }, { status: 400 });
  }

  try {
    const response = await axios.get('https://api.pexels.com/videos/search', {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY, // Make sure your API key is set correctly in your environment
      },
      params: {
        query: query,
        per_page: 5,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: 'Error fetching videos', error: error.response?.data || error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'An unexpected error occurred', error: (error as Error).message }, { status: 500 });
  }
}
