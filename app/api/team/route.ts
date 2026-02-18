/**
 * DescriptAI - Team Collaboration API
 * Manage team members for Agency tier accounts
 */

import { NextRequest, NextResponse } from 'next/server';

// In-memory team store (use database in production)
interface TeamMember {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  status: 'active' | 'pending' | 'invited';
  joinedAt: Date;
  lastActive: Date;
  creditsUsed: number;
}

interface Team {
  id: string;
  ownerId: string;
  name: string;
  plan: 'agency';
  members: TeamMember[];
  maxMembers: number;
  createdAt: Date;
}

// Simulated team data
const teams: Map<string, Team> = new Map();
const userTeams: Map<string, string> = new Map(); // userId -> teamId

// Create a demo team
const demoTeam: Team = {
  id: 'demo-team-1',
  ownerId: 'demo-owner',
  name: 'My Agency',
  plan: 'agency',
  maxMembers: 5,
  createdAt: new Date(),
  members: [
    {
      id: 'member-1',
      email: 'john@agency.com',
      name: 'John Smith',
      role: 'admin',
      status: 'active',
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastActive: new Date(),
      creditsUsed: 156,
    },
    {
      id: 'member-2',
      email: 'sarah@agency.com',
      name: 'Sarah Johnson',
      role: 'member',
      status: 'active',
      joinedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      creditsUsed: 89,
    },
    {
      id: 'member-3',
      email: 'mike@agency.com',
      name: 'Mike Wilson',
      role: 'member',
      status: 'pending',
      joinedAt: new Date(),
      lastActive: new Date(),
      creditsUsed: 0,
    },
  ],
};

teams.set(demoTeam.id, demoTeam);
userTeams.set(demoTeam.ownerId, demoTeam.id);
demoTeam.members.forEach(m => userTeams.set(m.id, demoTeam.id));

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId') || 'demo-user';

    if (action === 'my-team') {
      // Get user's team
      const teamId = userTeams.get(userId);
      
      if (!teamId) {
        // Create a new team for demo
        const newTeam: Team = {
          id: `team-${Date.now()}`,
          ownerId: userId,
          name: 'My Agency Team',
          plan: 'agency',
          maxMembers: 5,
          createdAt: new Date(),
          members: [],
        };
        
        teams.set(newTeam.id, newTeam);
        userTeams.set(userId, newTeam.id);
        
        return NextResponse.json({
          success: true,
          team: newTeam,
        });
      }

      const team = teams.get(teamId);
      
      if (!team) {
        return NextResponse.json(
          { error: 'Team not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        team: {
          ...team,
          members: team.members.map(m => ({
            ...m,
            // Don't expose sensitive data
            email: m.role === 'admin' ? m.email : '***@****.***',
          })),
        },
      });
    }

    if (action === 'members') {
      const teamId = userTeams.get(userId);
      
      if (!teamId) {
        return NextResponse.json(
          { error: 'No team found' },
          { status: 404 }
        );
      }

      const team = teams.get(teamId);
      
      return NextResponse.json({
        success: true,
        members: team?.members || [],
        isDemo: team?.id === 'demo-team-1',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Use ?action=my-team or ?action=members',
    });

  } catch (error) {
    console.error('[TEAM_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch team data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, email, name, role } = body;
    const teamId = userTeams.get(userId || 'demo-user');

    if (!teamId) {
      return NextResponse.json(
        { error: 'No team found. Please create a team first.' },
        { status: 404 }
      );
    }

    const team = teams.get(teamId);
    
    if (!team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      );
    }

    if (action === 'invite') {
      // Check if team is full
      if (team.members.length >= team.maxMembers) {
        return NextResponse.json(
          { error: 'Team is full. Upgrade to add more members.' },
          { status: 400 }
        );
      }

      // Check if email already exists
      if (team.members.some(m => m.email === email)) {
        return NextResponse.json(
          { error: 'This email is already a team member' },
          { status: 400 }
        );
      }

      // Create new member
      const newMember: TeamMember = {
        id: `member-${Date.now()}`,
        email,
        name: name || email.split('@')[0],
        role: role || 'member',
        status: 'pending',
        joinedAt: new Date(),
        lastActive: new Date(),
        creditsUsed: 0,
      };

      team.members.push(newMember);
      teams.set(teamId, team);

      return NextResponse.json({
        success: true,
        member: newMember,
        message: `Invitation sent to ${email}`,
      });
    }

    if (action === 'remove') {
      const memberId = body.memberId;
      
      const memberIndex = team.members.findIndex(m => m.id === memberId);
      
      if (memberIndex === -1) {
        return NextResponse.json(
          { error: 'Member not found' },
          { status: 404 }
        );
      }

      const member = team.members[memberIndex];
      
      // Can't remove owner
      if (member.role === 'admin' && member.email === team.ownerId) {
        return NextResponse.json(
          { error: 'Cannot remove team owner' },
          { status: 400 }
        );
      }

      team.members.splice(memberIndex, 1);
      teams.set(teamId, team);

      return NextResponse.json({
        success: true,
        message: `${member.name} removed from team`,
      });
    }

    if (action === 'update-role') {
      const { memberId, newRole } = body;
      
      const member = team.members.find(m => m.id === memberId);
      
      if (!member) {
        return NextResponse.json(
          { error: 'Member not found' },
          { status: 404 }
        );
      }

      member.role = newRole;
      teams.set(teamId, team);

      return NextResponse.json({
        success: true,
        member,
        message: `${member.name} role updated to ${newRole}`,
      });
    }

    if (action === 'create') {
      // Create a new team
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        ownerId: userId,
        name: body.teamName || 'My Team',
        plan: 'agency',
        maxMembers: 5,
        createdAt: new Date(),
        members: [
          {
            id: `admin-${Date.now()}`,
            email: body.email || 'admin@team.com',
            name: body.name || 'Team Admin',
            role: 'admin',
            status: 'active',
            joinedAt: new Date(),
            lastActive: new Date(),
            creditsUsed: 0,
          },
        ],
      };

      teams.set(newTeam.id, newTeam);
      userTeams.set(userId, newTeam.id);

      return NextResponse.json({
        success: true,
        team: newTeam,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('[TEAM_POST_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to process team action' },
      { status: 500 }
    );
  }
}
