import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

// In-memory storage for team invites (persists while server is running)
const teamInvites = new Map<string, {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  joinedAt: Date;
  lastActive: Date;
  creditsUsed: number;
}[]>();

// User tier cache (in production, this would be in the database)
const userTiers = new Map<string, string>();

// Helper to generate ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Get team members
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const members = teamInvites.get(userId) || [];
    const userTier = userTiers.get(userId) || "free";
    const maxMembers = userTier === "agency" ? 10 : userTier === "pro" ? 3 : 1;

    return NextResponse.json({ 
      success: true,
      team: {
        id: userId,
        name: "My Team",
        plan: userTier,
        maxMembers,
        members: members
      }
    });
  } catch (error) {
    console.error("[TEAM_GET_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to get team members" },
      { status: 500 }
    );
  }
}

// Invite team member
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, name, role } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    const userTier = userTiers.get(userId) || "free";
    const maxMembers = userTier === "agency" ? 10 : userTier === "pro" ? 3 : 1;

    if (userTier !== "agency" && userTier !== "pro") {
      return NextResponse.json(
        { error: "Team collaboration is only available for Pro and Agency plans. Please upgrade to invite team members." },
        { status: 403 }
      );
    }

    const members = teamInvites.get(userId) || [];

    if (members.length >= maxMembers) {
      return NextResponse.json(
        { error: `Team limit reached (${maxMembers} members). Upgrade for more.` },
        { status: 400 }
      );
    }

    // Check if member already exists
    const existingIndex = members.findIndex(m => m.email === email);
    if (existingIndex >= 0) {
      return NextResponse.json(
        { error: "This email is already in your team" },
        { status: 400 }
      );
    }

    // Add new member
    const newMember = {
      id: generateId(),
      email,
      name,
      role: role || "member",
      status: "active",
      joinedAt: new Date(),
      lastActive: new Date(),
      creditsUsed: 0
    };

    members.push(newMember);
    teamInvites.set(userId, members);

    return NextResponse.json({
      success: true,
      member: newMember,
      message: `${name} added to your team!`
    });
  } catch (error) {
    console.error("[TEAM_INVITE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to add team member" },
      { status: 500 }
    );
  }
}

// Remove team member
export async function DELETE(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("id");

    if (!memberId) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 }
      );
    }

    const members = teamInvites.get(userId) || [];
    const filtered = members.filter(m => m.id !== memberId);
    
    if (filtered.length === members.length) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }
    
    teamInvites.set(userId, filtered);

    return NextResponse.json({
      success: true,
      message: "Team member removed"
    });
  } catch (error) {
    console.error("[TEAM_REMOVE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to remove team member" },
      { status: 500 }
    );
  }
}

// Update team member role
export async function PUT(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { memberId, role } = await req.json();

    if (!memberId || !role) {
      return NextResponse.json(
        { error: "Member ID and role are required" },
        { status: 400 }
      );
    }

    const members = teamInvites.get(userId) || [];
    const memberIndex = members.findIndex(m => m.id === memberId);
    
    if (memberIndex < 0) {
      return NextResponse.json(
        { error: "Member not found or unauthorized" },
        { status: 404 }
      );
    }

    members[memberIndex].role = role;
    teamInvites.set(userId, members);

    return NextResponse.json({
      success: true,
      member: members[memberIndex],
      message: `Role updated to ${role}`
    });
  } catch (error) {
    console.error("[TEAM_UPDATE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

// Set user tier (called when user upgrades)
export async function PATCH(req: Request) {
  try {
    const { userId, tier } = await req.json();

    if (!userId || !tier) {
      return NextResponse.json(
        { error: "User ID and tier are required" },
        { status: 400 }
      );
    }

    userTiers.set(userId, tier);

    return NextResponse.json({
      success: true,
      message: `User tier updated to ${tier}`
    });
  } catch (error) {
    console.error("[TEAM_PATCH_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to update user tier" },
      { status: 500 }
    );
  }
}
