# Aaroham - Event Planning Platform

## Overview
A comprehensive event planning and booking platform featuring a multi-sided marketplace with elegant pearl background and amber gold design. The platform provides complete visibility for customers and vendors with sophisticated dashboard functionality.

## Recent Changes
- **January 23, 2025**: Migrated from Lovable to Replit environment
  - Converted from Supabase to PostgreSQL with Drizzle ORM
  - Created comprehensive API layer to replace Supabase client calls
  - Implemented new authentication context for user management
  - Updated all hooks to use API client instead of direct Supabase calls
  - Removed all Supabase dependencies and code
  - Established pearl white and amber gold design system

## Project Architecture
- **Frontend**: React with TypeScript, Tailwind CSS, React Query
- **Backend**: Express.js with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Custom implementation with JWT and OTP verification
- **Design**: Pearl background with amber gold accents, premium typography

## Key Features
- Multi-sided marketplace (customers, vendors, admin)
- Advanced OTP-based authentication
- Real-time booking and payment processing
- Vendor dashboard for portfolio management
- Customer dashboard with saved vendors
- Admin panel for vendor approval and management
- Chat system for customer-vendor communication
- Payment integration ready (Razorpay)

## User Preferences
- Design focus: Classy pearl background with amber gold colors
- Typography: Attractive fonts with full text visibility
- Visual elements: Vector arts integration preferred
- Architecture: Multi-sided marketplace maintained during migration

## Development Status
- ✅ Database migration complete
- ✅ API layer implemented  
- ✅ Authentication system replaced
- ✅ All hooks updated to use new API
- ✅ Supabase code removed
- 🔄 Currently finalizing migration and testing

## Next Steps
- Complete UI component updates for API integration
- Test authentication flows
- Verify vendor and customer dashboards
- Deploy for production use