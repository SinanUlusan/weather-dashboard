import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1&lang=en`;

    const res = await fetch(url, {
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const uvData = await res.json();

    return NextResponse.json(uvData);
  } catch (error: any) {
    console.error("Error fetching UV data:", error.message);

    return NextResponse.json(
      { error: "Failed to fetch UV data" },
      { status: 500 }
    );
  }
}
