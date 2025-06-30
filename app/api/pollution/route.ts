import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenWeatherMap API key is not configured" },
        { status: 500 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=en`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching pollution data:", error.message);

    if (error.response?.status === 401) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    if (error.response?.status === 429) {
      return NextResponse.json(
        { error: "API rate limit exceeded" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch pollution data" },
      { status: 500 }
    );
  }
}
