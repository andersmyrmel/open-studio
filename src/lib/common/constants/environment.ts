/**
 * Environment constants for Open-Studio
 */

// Always false - we're standalone, not Supabase Platform
export const IS_PLATFORM = false

// Check if we're in production
export const IS_PROD = process.env.NODE_ENV === 'production'

// Check if we're in development
export const IS_DEV = process.env.NODE_ENV === 'development'

// Database connection URL
export const DATABASE_URL = process.env.DATABASE_URL

// App port
export const PORT = process.env.PORT || '3000'
