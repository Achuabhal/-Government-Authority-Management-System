# BDA - Government Authority Management System

A modern, full-featured government authority website with public-facing pages and a role-based admin dashboard system.

## 🌟 Features

### Public Website
- **Homepage** - Professional landing page
- **News & Articles** - Full-featured blog system with article management
- **Photo Gallery** - Image gallery with admin controls
- **Department Pages**:
  - Brand Bengaluru
  - EODB (Ease of Doing Business)
  - E-Auction Platform
  - Finance Department
  - Land Acquisition
  - CAT-DR Services
  - Administration
  - Engineering
  - Town Planning
- **Information Portal** - RTI (Right to Information) system
- **Ongoing Projects** - Track current initiatives
- **Contact System** - Direct communication channel
- **About Us** - Organization information

### Admin Dashboard (Multi-Role System)
Four different admin levels with progressive permissions:

1. **Super Admin** (`/admin`) - Full system control
   - Manage all sub-admins
   - Control all content
   - View activity logs
   - Email settings management

2. **Lead Admin** (`/admin1`) - Secondary management
   - Limited sub-admin management
   - Content control
   - Email configuration

3. **Sub Admin** (`/admin2`) - Department level
   - Department-specific content
   - Limited permissions

4. **Update Admin** (`/admin3`) - Content updates only
   - Basic content modifications
   - Restricted access

### Shared Admin Features (All Roles)
- 🎨 **Banner Management** - Hero section customization
- 📝 **News Management** - Create, edit, publish articles
- 🖼️ **Photo Gallery** - Upload and organize images
- 👥 **User Management** - Sub-admin creation and control
- 📧 **Email Configuration** - Communication settings
- 📊 **Activity Logs** - Track system changes (Super Admin)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components (Radix UI based)

### State Management & Data
- **Zustand** - Lightweight state management
- **React Query** - Server state management
- **React Router v6** - Client-side routing

### Forms & Validation
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation

### Additional Libraries
- **Axios** - HTTP client for API calls
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Next Themes** - Dark mode support
- **Embla Carousel** - Carousel component
- **Sonner** - Toast notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm (or use nvm)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Achuabhal/test1.git

# Navigate to frontend directory
cd test1/frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── admin/              # Super Admin pages
│   ├── leadadmin/          # Lead Admin pages
│   ├── subadmin/           # Sub Admin pages
│   ├── superadminupdate/   # Update Admin pages
│   ├── pages/              # Public pages
│   ├── components/         # Reusable components
│   ├── contexts/           # React contexts (Theme, Translation)
│   ├── hooks/              # Custom React hooks
│   ├── store/              # Zustand store
│   ├── lib/                # Utility functions
│   ├── assets/             # Static assets
│   └── App.tsx             # Main app component
├── public/                 # Static files
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS config
└── index.html              # HTML entry point
```

## 🔐 Authentication & Access

### Admin Login
- Navigate to `/admin/login`
- Protected routes require authentication
- Different admin levels have different feature access
- Session management via Zustand store

*Refer to `ADMIN_LOGIN_GUIDE.md` for detailed login credentials and setup*


### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=https://your-api-endpoint.com
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-key
```

### Other Hosting Options
- **Netlify** - Drag and drop the `dist/` folder
- **GitHub Pages** - Configure for static hosting
- **Traditional Server** - Serve `dist/` folder via any web server

## 📖 Documentation

- **Admin Setup Guide**: See `frontend/ADMIN_LOGIN_GUIDE.md`
- **Photo Gallery Guide**: See `frontend/PHOTO_GALLERY_GUIDE.md`

## 🎨 Theme & Localization

### Dark Mode
- Automatic theme detection via `next-themes`
- Manual theme toggle support
- CSS variables for easy customization

### Multi-Language Support
- Translation context for i18n
- Easy to extend for new languages

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # Build for production
npm run build:dev    # Build in development mode

# Linting
npm run lint         # Check code quality

# Preview
npm run preview      # Preview production build
```

## 🔧 Configuration Files

- **vite.config.ts** - Vite build configuration
- **tailwind.config.ts** - Tailwind CSS customization
- **tsconfig.json** - TypeScript compiler options
- **eslint.config.js** - Code linting rules
- **postcss.config.js** - CSS processing

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Push to your branch
5. Create a Pull Request

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Known Issues & Troubleshooting

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Run on different port
npm run dev -- --port 3000
```

## 📞 Support & Contact

For issues, questions, or suggestions:
- Create an issue on GitHub
- Check existing documentation
- Review admin guides

## 📄 License

This project is proprietary. All rights reserved.



## ✨ Version History

- **v1.0.0** - Initial release with public website and admin dashboard

---

**Last Updated**: December 2025

Built with ❤️ using React, TypeScript, and Tailwind CSS
