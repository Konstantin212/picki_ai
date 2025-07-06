import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({ message: 'API is working!' });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    return NextResponse.json({ message: 'Data received', data });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
