"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
  name: string;
  plan: string;
  maxMembers: number;
  members: TeamMember[];
}

export default function TeamPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/team?action=my-team');
      const data = await response.json();
      
      if (data.success) {
        setTeam(data.team);
      }
    } catch (error) {
      console.error('Failed to fetch team:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteEmail) return;

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'invite',
          email: inviteEmail,
          name: inviteName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Invitation sent to ${inviteEmail}`);
        setShowInviteModal(false);
        setInviteEmail('');
        setInviteName('');
        fetchTeam();
      } else {
        alert(data.error || 'Failed to send invitation');
      }
    } catch (error) {
      console.error('Failed to invite:', error);
      alert('Failed to send invitation');
    }
  };

  const handleRemove = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'remove',
          memberId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchTeam();
      } else {
        alert(data.error || 'Failed to remove member');
      }
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: 'admin' | 'member') => {
    try {
      const response = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-role',
          memberId,
          newRole,
        }),
      });

      const data = await response.json();

      if (data.success) {
        fetchTeam();
      } else {
        alert(data.error || 'Failed to update role');
      }
    } catch (error) {
      console.error('Failed to update role:', error);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                DescriptAI
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/generate" className="text-white/70 hover:text-white transition">Generate</Link>
                <Link href="/history" className="text-white/70 hover:text-white transition">History</Link>
                <Link href="/pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
                <Link href="/team" className="text-cyan-400 font-medium">Team</Link>
              </div>
            </div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="text-white/70 hover:text-white">Sign In</Link>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            👥 Team Collaboration
          </h1>
          <p className="text-xl text-white/70">
            Manage your agency team members and credits
          </p>
        </div>

        {isLoading ? (
          <div className="text-center text-white">Loading team...</div>
        ) : team ? (
          <>
            {/* Team Info */}
            <div className="bg-white/10 rounded-2xl p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{team.name}</h2>
                  <p className="text-white/60 capitalize">{team.plan} Plan</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-400">
                    {team.members.length} / {team.maxMembers}
                  </div>
                  <div className="text-white/60 text-sm">Team Members</div>
                </div>
              </div>

              {/* Invite Button */}
              {team.members.length < team.maxMembers && (
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition"
                >
                  + Invite Member
                </button>
              )}
            </div>

            {/* Demo Banner */}
            {isDemo && (
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8 text-center">
                <span className="text-yellow-400">👥 Demo Team</span>
                <span className="text-white/60 mx-2">|</span>
                <span className="text-white/70">Upgrade to Agency to create your own team</span>
              </div>
            )}

            {/* Members List */}
            <div className="bg-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Team Members</h2>
              
              <div className="space-y-4">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{member.name}</span>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            member.role === 'admin' 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {member.role}
                          </span>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            member.status === 'active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {member.status}
                          </span>
                        </div>
                        <div className="text-white/50 text-sm">{member.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-white">{member.creditsUsed}</div>
                        <div className="text-white/50 text-xs">credits used</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-white/70 text-sm">
                          {formatDate(member.lastActive)}
                        </div>
                        <div className="text-white/40 text-xs">last active</div>
                      </div>

                      {member.role !== 'admin' && (
                        <div className="flex gap-2">
                          <select
                            value={member.role}
                            onChange={(e) => handleUpdateRole(member.id, e.target.value as 'admin' | 'member')}
                            className="bg-white/10 text-white text-sm rounded px-2 py-1 border border-white/20"
                          >
                            <option value="member">Member</option>
                            <option value="admin">Admin</option>
                          </select>
                          <button
                            onClick={() => handleRemove(member.id)}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {team.members.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👥</div>
                  <h3 className="text-xl text-white mb-2">No team members yet</h3>
                  <p className="text-white/60 mb-6">Invite your team members to collaborate</p>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg"
                  >
                    + Invite First Member
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-white">
            <p>No team found. Upgrade to Agency to create a team.</p>
            <Link href="/pricing" className="text-cyan-400 hover:underline mt-2 inline-block">
              View Pricing
            </Link>
          </div>
        )}

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-semibold text-white mb-6">Invite Team Member</h3>
              
              <form onSubmit={handleInvite}>
                <div className="mb-4">
                  <label className="block text-white/70 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    required
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-white/70 mb-2">Name (Optional)</label>
                  <input
                    type="text"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
