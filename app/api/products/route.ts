import { dbConnect } from '@/lib/db';
import Product from '@/models/product';
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const name = formData.get('name') as string;
    const series = formData.get('series') as string;
    const description = formData.get('description') as string;
    const deliveryInfo = formData.get('deliveryInfo') as string;
    const warrantyInfo = formData.get('warrantyInfo') as string;
    const slug =
      (formData.get('slug') as string) ||
      name.toLowerCase().replace(/\s+/g, '-');

    // Collect features array
    const features: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('features[')) {
        features.push(value as string);
      }
    });

    let imageUrl = '';

    const imageFile = formData.get('image') as File | null;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploaded = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: 'products' }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer);
      });


      imageUrl = uploaded.secure_url;
    }

    const product = await Product.create({
      name,
      series,
      description,
      deliveryInfo,
      warrantyInfo,
      slug,
      features,
      thumbnailImage: imageUrl,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 400 }
    );
  }
}


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

    return NextResponse.json({ products, total, limit, skip });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
