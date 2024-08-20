import { NextResponse } from 'next/server';
import { writeFile, readFile, readdir } from 'fs';
import { promises as fs } from 'fs';
import path from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);

export async function POST(request: Request) {
  try {
    const { fileData, fileName } = await request.json();
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);

    await writeFileAsync(filePath, fileData, 'base64');
    return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 });

  } catch (error:any) {
    return NextResponse.json({ message: 'Error uploading file', error: error.message }, { status: 500 });
  }
}

const filePath = path.join(process.cwd(), 'public/uploads');

export async function GET(request: Request) {
  try {
    // Read the files from the directory using fs.promises.readdir
    const fileNames = await fs.readdir(filePath);
    const filteredFileNames = fileNames.filter(fileName => !fileName.endsWith('.webp'));
    // console.log(filteredFileNames);
    return NextResponse.json({ files: filteredFileNames }, { status: 200 });
  } catch (err:any) {
    return NextResponse.json({ message: 'Error reading directory', error: err.message }, { status: 500 });
  }
}

