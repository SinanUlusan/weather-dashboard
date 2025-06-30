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
    const search = searchParams.get("search");

    if (!search) {
      return NextResponse.json(
        { error: "Search parameter is required" },
        { status: 400 }
      );
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}&lang=en`;

    const res = await axios.get(url);

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error fetching geocoded data:", error.message);

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
      { error: "Failed to fetch geocoded data" },
      { status: 500 }
    );
  }
}
