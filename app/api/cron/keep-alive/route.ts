import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This endpoint keeps the database active by doing a simple query
// Call this via Vercel Cron job every 3 days to prevent Supabase pause
export async function GET() {
  try {
    // Do a simple query to keep database active
    await prisma.user.count();
    
    return NextResponse.json({ 
      status: 'ok', 
      message: 'Database keep-alive ping successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed' 
    }, { status: 500 });
  }
}
