import { dbConnect } from '@/lib/db';
import Product from '@/models/product';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const series = searchParams.get('series');
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = parseInt(searchParams.get('skip') || '0');

    const filter: any = { active: true };
    if (series) {
      filter.series = series;
    }

    const products = await Product.find(filter)
      .sort({ order: 1 })
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Product.countDocuments(filter);

    return NextResponse.json({
      products,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const product = await Product.create({
      ...body,
      slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 400 }
    );
  }
}
