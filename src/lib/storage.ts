import { Business } from '@/types';

const STORAGE_KEY = 'grimsby-hbb-portal';

export function saveBusiness(business: Business): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(business));
}

export function getBusiness(): Business | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearBusiness(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isRegistered(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(STORAGE_KEY) !== null;
}
