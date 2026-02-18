import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { dbConnect } from '@/lib/db';
import { Admin } from '@/models/admin';

export async function POST() {
  await dbConnect();

  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  const exists = await Admin.findOne({ email: adminEmail });
  if (exists) {
    return NextResponse.json(
      { message: 'Admin already exists' },
      { status: 200 }
    );
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await Admin.create({
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
  });

  return NextResponse.json(
    { message: 'Admin seeded successfully' },
    { status: 201 }
  );
}
