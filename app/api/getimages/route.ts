import { NextResponse } from "next/server";
import axios from "axios";

const PEXELS_API_KEY = "Your_API_KEY"; // Replace with your Pexels API key

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query: prompt,
        per_page: 6, // Number of images to fetch
      },
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });

    const images = response.data.photos.map((photo: any) => photo.src.medium);

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error fetching images from Pexels API", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
