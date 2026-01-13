"use server";

import { z } from 'zod';
import { db } from '@/lib/db/drizzle';
import { users, teamMembers, invitations, activityLogs } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { getUser, getTeamForUser } from '@/lib/db/queries';
import { ActivityType } from '@/lib/db/schema';
import { headers } from 'next/headers';
import { validatedActionWithUser, ActionState } from '@/lib/auth/middleware';

// Stub functions; implement real password/account logic here

export async function updatePassword(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Your password change logic here
  return { success: "Password updated (stub)" };
}

export async function deleteAccount(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Your account deletion logic here
  return { success: "Account deleted (stub)" };
}

// Update account information (name and email)
const updateAccountSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().max(255),
});

export async function updateAccount(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getUser();
  if (!user) {
    return { error: 'User not authenticated' };
  }

  const result = updateAccountSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { name, email } = result.data;

  try {
    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      
      if (existingUser.length > 0 && existingUser[0].id !== user.id) {
        return { error: 'Email is already taken' };
      }
    }

    // Update user
    await db
      .update(users)
      .set({
        name: name ?? user.name,
        email: email ?? user.email,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    // Log activity
    const team = await getTeamForUser();
    if (team) {
      const headersList = await headers();
      const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null;
      
      await db.insert(activityLogs).values({
        teamId: team.id,
        userId: user.id,
        action: ActivityType.UPDATE_ACCOUNT,
        ipAddress: ipAddress?.split(',')[0] || null,
      });
    }

    return { success: 'Account updated successfully', name: name ?? user.name };
  } catch (error) {
    return { error: 'Failed to update account' };
  }
}

// Remove team member
export async function removeTeamMember(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getUser();
  if (!user) {
    return { error: 'User not authenticated' };
  }

  const team = await getTeamForUser();
  if (!team) {
    return { error: 'Team not found' };
  }

  // Check if user is owner
  const userMember = team.teamMembers.find(m => m.userId === user.id);
  if (!userMember || userMember.role !== 'owner') {
    return { error: 'Only team owners can remove members' };
  }

  const memberId = formData.get('memberId');
  if (!memberId) {
    return { error: 'Member ID is required' };
  }

  const memberIdNum = parseInt(memberId.toString(), 10);
  if (isNaN(memberIdNum)) {
    return { error: 'Invalid member ID' };
  }

  try {
    // Find the member to remove
    const memberToRemove = team.teamMembers.find(m => m.id === memberIdNum);
    if (!memberToRemove) {
      return { error: 'Member not found' };
    }

    // Don't allow removing yourself
    if (memberToRemove.userId === user.id) {
      return { error: 'Cannot remove yourself from the team' };
    }

    // Remove the team member
    await db
      .delete(teamMembers)
      .where(eq(teamMembers.id, memberIdNum));

    // Log activity
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null;
    
    await db.insert(activityLogs).values({
      teamId: team.id,
      userId: user.id,
      action: ActivityType.REMOVE_TEAM_MEMBER,
      ipAddress: ipAddress?.split(',')[0] || null,
    });

    return { success: 'Team member removed successfully' };
  } catch (error) {
    return { error: 'Failed to remove team member' };
  }
}

// Invite team member
const inviteTeamMemberSchema = z.object({
  email: z.string().email().max(255),
  role: z.enum(['member', 'owner']),
});

export async function inviteTeamMember(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const user = await getUser();
  if (!user) {
    return { error: 'User not authenticated' };
  }

  const team = await getTeamForUser();
  if (!team) {
    return { error: 'Team not found' };
  }

  // Check if user is owner
  const userMember = team.teamMembers.find(m => m.userId === user.id);
  if (!userMember || userMember.role !== 'owner') {
    return { error: 'Only team owners can invite members' };
  }

  const result = inviteTeamMemberSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const { email, role } = result.data;

  try {
    // Check if user is already a team member
    const existingMember = team.teamMembers.find(
      m => m.user.email.toLowerCase() === email.toLowerCase()
    );
    if (existingMember) {
      return { error: 'User is already a team member' };
    }

    // Check if there's already a pending invitation
    const existingInvitation = await db
      .select()
      .from(invitations)
      .where(
        and(
          eq(invitations.teamId, team.id),
          eq(invitations.email, email.toLowerCase()),
          eq(invitations.status, 'pending')
        )
      )
      .limit(1);

    if (existingInvitation.length > 0) {
      return { error: 'Invitation already sent to this email' };
    }

    // Create invitation
    await db.insert(invitations).values({
      teamId: team.id,
      email: email.toLowerCase(),
      role,
      invitedBy: user.id,
      status: 'pending',
    });

    // Log activity
    const headersList = await headers();
    const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || null;
    
    await db.insert(activityLogs).values({
      teamId: team.id,
      userId: user.id,
      action: ActivityType.INVITE_TEAM_MEMBER,
      ipAddress: ipAddress?.split(',')[0] || null,
    });

    return { success: `Invitation sent to ${email}` };
  } catch (error) {
    return { error: 'Failed to send invitation' };
  }
}