import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Schema, model } from 'mongoose';

// Simple contact schema
const contactSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    message: String,
  },
  { timestamps: true }
);

const Contact = model('Contact', contactSchema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    // Here you could send an email notification to admin
    // For now, just return success

    return NextResponse.json(
      { message: 'Message received', id: contact._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
}
