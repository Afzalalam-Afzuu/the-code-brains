// lib/admin-auth.ts
"use server";

import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'thecodebrains_admin_session';
const SESSION_SECRET = 'authenticated_admin_token_2026';

export async function loginAdmin(pin: string): Promise<{ success: boolean; error?: string }> {
  const expectedPin = process.env.ADMIN_PIN || '1234';
  
  if (pin !== expectedPin) {
    return { success: false, error: 'Invalid security PIN. Access denied.' };
  }
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 days session
    path: '/'
  });

  return { success: true };
}

export async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === SESSION_SECRET;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
