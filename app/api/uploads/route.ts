import {mkdirSync, existsSync} from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // console.log("FORMDATA:: ", formData);
  const file: File | null = formData.get('image') as unknown as File;

  // console.log("FILE:: ", file);
  if (!file) {
    return NextResponse.json(
      {error: "No file uploaded!"},
      {status: 400}
    );
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, {recursive: true});
  }

  const filePath = path.join(uploadDir, file.name);
  await writeFile(filePath, buffer);

  return NextResponse.json(
    {message: 'File upload successfully', url: `/uploads/${file.name}`}
  );
};
