import { NextResponse } from "next/server";
import { execSync } from "child_process";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    // Run prisma db push
    const result = execSync("npx prisma db push --accept-data-loss", {
      encoding: "utf-8",
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL
      },
      timeout: 60000
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Database schema pushed successfully!",
      output: result 
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
      success: false, 
      error: errorMessage 
    }, { status: 500 });
  }
}
