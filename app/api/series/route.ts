import { dbConnect } from '@/lib/db';
import Series from '@/models/series';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const series = await Series.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(series);
  } catch (error) {
    console.error('Error fetching series:', error);
    return NextResponse.json(
      { error: 'Failed to fetch series' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const series = await Series.create({
      ...body,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
    });

    return NextResponse.json(series, { status: 201 });
  } catch (error) {
    console.error('Error creating series:', error);
    return NextResponse.json(
      { error: 'Failed to create series' },
      { status: 400 }
    );
  }
}
