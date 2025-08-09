import { NextResponse } from 'next/server';

export class ApiError extends Error {
  status: number;
  code?: string | undefined;
  constructor(status: number, message: string, code?: string | undefined) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function errorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
  }
  const message = (error as Error)?.message || 'Internal Server Error';
  return NextResponse.json({ error: 'Internal Server Error', message }, { status: 500 });
}
