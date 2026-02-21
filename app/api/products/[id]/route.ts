// app/api/products/[id]/route.ts
import { dbConnect } from '@/lib/db';
import Product from '@/models/product';
import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!Types.ObjectId.isValid(params.id)) {
            return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
        }

        await dbConnect();

        const formData = await req.formData();

        // Get fields
        const name = formData.get('name')?.toString();
        const series = formData.get('series')?.toString();
        const description = formData.get('description')?.toString();
        const deliveryInfo = formData.get('deliveryInfo')?.toString();
        const warrantyInfo = formData.get('warrantyInfo')?.toString();
        const slug = formData.get('slug')?.toString();

        // Handle features array
        const features: string[] = [];
        formData.forEach((value, key) => {
            if (key.startsWith('features[')) features.push(value.toString());
        });

        // Handle image upload (optional)
        const imageFile = formData.get('image') as File | null;
        let imageUrl: string | undefined;

        if (imageFile && imageFile.size > 0) {
            const buffer = Buffer.from(await imageFile.arrayBuffer());

            // Cloudinary upload using upload_stream
            const uploadResult = await new Promise<any>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'products' },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );
                stream.end(buffer);
            });

            imageUrl = uploadResult.secure_url;
        }

        // Build update object
        const updateData: any = {};
        if (name) updateData.name = name;
        if (series) updateData.series = series;
        if (description) updateData.description = description;
        if (deliveryInfo) updateData.deliveryInfo = deliveryInfo;
        if (warrantyInfo) updateData.warrantyInfo = warrantyInfo;
        if (slug) updateData.slug = slug;
        if (features.length > 0) updateData.features = features;
        if (imageUrl) updateData.image = imageUrl; // only update if new image uploaded

        // Update product
        const product = await Product.findByIdAndUpdate(params.id, updateData, { new: true });

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        if (!Types.ObjectId.isValid(params.id)) {
            return NextResponse.json(
                { error: 'Invalid product ID' },
                { status: 400 }
            );
        }

        await dbConnect();
        const product = await Product.findByIdAndDelete(params.id);

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
