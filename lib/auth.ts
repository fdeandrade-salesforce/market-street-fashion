/**
 * Authentication state management
 * Handles user login, logout, and session persistence
 */

const AUTH_KEY = 'market_street_user'
const REMEMBER_ME_KEY = 'market_street_remember_me'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  loyaltyStatus?: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  loyaltyPoints?: number
  emailVerified?: boolean
  phoneVerified?: boolean
}

/**
 * Get current user from localStorage
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    if (!stored) return null
    
    const user = JSON.parse(stored) as User
    return user
  } catch (error) {
    console.error('Error reading user from localStorage:', error)
    return null
  }
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null
}

/**
 * Login user and save to localStorage
 */
export function login(user: User, rememberMe: boolean = false): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    
    if (rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true')
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY)
    }
    
    // Dispatch custom event for components to react to login
    window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: user }))
  } catch (error) {
    console.error('Error saving user to localStorage:', error)
  }
}

/**
 * Logout user and clear localStorage
 */
export function logout(): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(AUTH_KEY)
    // Keep remember me preference, just remove the user
    // localStorage.removeItem(REMEMBER_ME_KEY)
    
    // Dispatch custom event for components to react to logout
    window.dispatchEvent(new CustomEvent('userLoggedOut'))
  } catch (error) {
    console.error('Error removing user from localStorage:', error)
  }
}

/**
 * Update user information
 */
export function updateUser(updates: Partial<User>): void {
  const currentUser = getCurrentUser()
  if (!currentUser) return
  
  const updatedUser = { ...currentUser, ...updates }
  login(updatedUser, localStorage.getItem(REMEMBER_ME_KEY) === 'true')
}
