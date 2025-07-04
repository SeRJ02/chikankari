# Chikankari by Kanchan

A beautiful e-commerce website showcasing authentic Lucknowi Chikankari kurtas, built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Product Gallery**: Beautiful product showcase with filtering and search
- **Admin Dashboard**: Complete product management system
- **Authentication**: Secure login system with role-based access
- **Database Integration**: Supabase backend for data management
- **Modern UI**: Clean, elegant design with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Real-time)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd chikankari-by-kanchan
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your Supabase credentials and other configuration.

5. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Contact Information
VITE_WHATSAPP_NUMBER=+91XXXXXXXXXX
VITE_COMPANY_EMAIL=info@chikankaribykanchan.com
VITE_COMPANY_ADDRESS=Lucknow, Uttar Pradesh, India

# Admin Configuration
VITE_ADMIN_EMAIL=admin@lucknowchikan.com

# Social Media Links
VITE_INSTAGRAM_URL=https://www.instagram.com/kanchanchikankari/?hl=en
VITE_FACEBOOK_URL=https://facebook.com/chikankaribykanchan
VITE_TWITTER_URL=https://twitter.com/chikankaribykanchan
VITE_YOUTUBE_URL=https://youtube.com/chikankaribykanchan
```

## Database Setup

The project uses Supabase for the backend. The database schema includes:

- **profiles**: User profiles with role-based access
- **products**: Product catalog with full e-commerce features

Migration files are included in the `supabase/migrations` directory.

## Admin Access

- **Email**: admin@lucknowchikan.com
- **Password**: admin123 (Change this in production!)

## Deployment

### Netlify Deployment

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `dist` directory.

3. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Third-party library configurations
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
├── data/               # Mock data and constants
└── index.css           # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email info@chikankaribykanchan.com or contact us through WhatsApp.