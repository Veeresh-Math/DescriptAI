import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Force dynamic rendering - do not prerender at build time
export const dynamic = 'force-dynamic';

// Extend serverless function timeout to 30 seconds
// This allows time for a paused Supabase database to wake up
export const maxDuration = 30;

// This endpoint keeps the database active by doing a simple query
// Call this via Vercel Cron job every 3 days to prevent Supabase pause

// Retry configuration for waking Supabase database
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000; // 5 seconds between retries

/**
 * Analyze error to determine the type of failure
 */
function getErrorType(error: unknown): { type: string; message: string; hint: string } {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    // DNS/Network resolution failure
    if (message.includes('enotfound') || message.includes('dns') || message.includes('getaddrinfo')) {
      return {
        type: 'DNS_FAILURE',
        message: 'Cannot resolve database host',
        hint: 'Check if DATABASE_URL is correct and Supabase project exists. The host may be mistyped or the project was deleted.'
      };
    }
    
    // Connection timeout (database paused or network issue)
    if (message.includes('timeout') || message.includes('etimedout')) {
      return {
        type: 'CONNECTION_TIMEOUT',
        message: 'Connection timeout',
        hint: 'Database may be paused. Wait 30-60 seconds and retry, or check if Supabase project is active.'
      };
    }
    
    // Authentication failure
    if (message.includes('password') || message.includes('authentication') || message.includes('invalid credentials')) {
      return {
        type: 'AUTH_FAILURE',
        message: 'Authentication failed',
        hint: 'Check database password in DATABASE_URL. Ensure it is correct and URL-encoded if it contains special characters.'
      };
    }
    
    // Prisma P1001: Can't reach database
    if (message.includes('p1001') || message.includes("can't reach database")) {
      return {
        type: 'DATABASE_UNREACHABLE',
        message: 'Database server unreachable',
        hint: 'Check Supabase project status, network connectivity, and connection string. The database may be paused or the host is incorrect.'
      };
    }
  }
  
  return {
    type: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : String(error),
    hint: 'Check the error message for details. Verify DATABASE_URL and Supabase project status.'
  };
}

/**
 * Perform a database query with retry logic
 * Useful for waking up paused Supabase databases
 */
async function pingDatabaseWithRetry(attempt: number = 1): Promise<boolean> {
  try {
    // Simple query to check database connectivity
    await db.user.count();
    return true;
  } catch (error) {
    console.error(`[Keep-Alive] Database ping attempt ${attempt} failed:`, error);

    // If we have retries left, wait and try again
    if (attempt < MAX_RETRIES) {
      const delay = RETRY_DELAY_MS * attempt; // Exponential backoff
      console.log(`[Keep-Alive] Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return pingDatabaseWithRetry(attempt + 1);
    }

    // All retries exhausted
    throw error;
  }
}

export async function GET() {
  const startTime = Date.now();
  
  try {
    // Attempt to ping database with retries
    const success = await pingDatabaseWithRetry();
    
    if (success) {
      const duration = Date.now() - startTime;
      console.log(`[Keep-Alive] Database ping successful in ${duration}ms`);
      
      return NextResponse.json({ 
        status: 'ok', 
        message: 'Database keep-alive ping successful',
        timestamp: new Date().toISOString(),
        duration: `${duration}ms`
      });
    }
    
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed after retries' 
    }, { status: 500 });
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorInfo = getErrorType(error);
    
    console.error(`[Keep-Alive] Cron job failed after ${duration}ms:`, {
      type: errorInfo.type,
      message: errorInfo.message,
      hint: errorInfo.hint,
      originalError: error
    });
    
    return NextResponse.json({ 
      status: 'error', 
      message: errorInfo.message,
      type: errorInfo.type,
      hint: errorInfo.hint,
      error: error instanceof Error ? error.message : String(error),
      duration: `${duration}ms`,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
