# Admin Login System Guide

## Overview
The Bengaluru Vikas Portal now includes a comprehensive admin login system with email verification, captcha, and OTP authentication.

## Features

### 🔐 Admin Login System
- **Email & Password Authentication**: Secure login with email and password
- **Captcha Verification**: Visual captcha to prevent automated attacks
- **OTP Verification**: 6-digit OTP sent after successful initial login
- **Role-based Access**: Super Admin and Sub Admin roles
- **Session Management**: Secure session handling with logout functionality

### 👥 Admin Management
- **Add Admin Emails**: Super admins can add new admin email addresses
- **Generate OTPs**: Automatic OTP generation for new admins
- **Role Assignment**: Assign Super Admin or Sub Admin roles
- **Admin List Management**: View and remove admin accounts

## How to Use

### 1. Access Admin Login
Navigate to `/admin/login` to access the admin login page.

### 2. Demo Accounts (Pre-configured)
The system comes with demo accounts for testing:

**Super Admin:**
- Email: `superadmin@bda.gov.in`
- OTP: `123456`

**Sub Admin:**
- Email: `subadmin@bda.gov.in`
- OTP: `654321`

### 3. Login Process

#### Step 1: Initial Login
1. Enter your admin email address
2. Enter your password (any password works for demo)
3. Complete the captcha verification
4. Click "Send OTP"

#### Step 2: OTP Verification
1. Enter the 6-digit OTP that was generated when your email was added
2. Click "Verify OTP"
3. You'll be redirected to the admin dashboard

### 4. Adding New Admins (Super Admin Only)

1. Login as a Super Admin
2. Navigate to "Super Admin Email" in the sidebar
3. Fill in the email address and select the role
4. Click "Add Admin"
5. Share the generated OTP with the new admin

### 5. Admin Dashboard Features

#### Super Admin Access:
- Update Banner
- News Manager
- Sub Admins Management
- Super Admin Email Management

#### Sub Admin Access:
- Update Banner
- News Manager
- Sub Admins Management

## Security Features

### 🔒 Authentication Flow
1. **Email Validation**: Checks if email exists in admin list
2. **Captcha Protection**: Prevents automated login attempts
3. **OTP Verification**: Two-factor authentication with time-limited OTP
4. **Session Management**: Secure session handling with automatic logout

### 🛡️ Access Control
- **Protected Routes**: All admin routes are protected
- **Role-based Permissions**: Different access levels for Super and Sub admins
- **Session Validation**: Automatic redirect to login if session expires

## Technical Implementation

### Components Created:
- `AdminLogin.tsx`: Main login form with captcha and OTP verification
- `ProtectedRoute.tsx`: Route protection wrapper
- `SuperAdminEmail.tsx`: Admin management interface
- `SetupDemo.tsx`: Demo data initialization

### Key Features:
- **Responsive Design**: Works on all device sizes
- **Toast Notifications**: User feedback for all actions
- **Form Validation**: Client-side validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback
- **Timer Management**: OTP resend timer with countdown

## File Structure
```
src/admin/
├── AdminLogin.tsx          # Login form component
├── ProtectedRoute.tsx      # Route protection
├── AdminLayout.tsx         # Updated with logout functionality
├── SuperAdminEmail.tsx     # Admin management interface
└── SetupDemo.tsx          # Demo data setup
```

## Usage Instructions

### For Super Admins:
1. Login with super admin credentials
2. Use "Super Admin Email" to add new admins
3. Share the generated OTP with new admins
4. Manage existing admin accounts

### For Sub Admins:
1. Login with sub admin credentials
2. Access limited admin features
3. Cannot add or remove other admins

### For New Admins:
1. Get your email added by a Super Admin
2. Receive the OTP from the Super Admin
3. Use the login form to access the admin panel
4. Complete the OTP verification process

## Troubleshooting

### Common Issues:
1. **Invalid Captcha**: Refresh the captcha and try again
2. **OTP Expired**: Use the "Resend OTP" button (5-minute timer)
3. **Email Not Found**: Contact Super Admin to add your email
4. **Session Expired**: Login again to continue

### Support:
- Contact the Super Admin for account issues
- Check browser console for technical errors
- Ensure JavaScript is enabled

## Security Notes

⚠️ **Important Security Considerations:**
- This is a demo implementation using localStorage
- In production, implement proper backend authentication
- Use secure OTP delivery methods (SMS/Email)
- Implement proper session management
- Add rate limiting for login attempts
- Use HTTPS in production environment

## Future Enhancements

- Backend API integration
- SMS OTP delivery
- Email OTP delivery
- Advanced security features
- Audit logging
- Password reset functionality
