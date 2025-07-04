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
- Supabase account

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

4. **Set up Supabase:**

   a. Go to [https://supabase.com](https://supabase.com) and create a new project
   
   b. Copy your project URL and anon key from Settings > API
   
   c. Update the `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

5. **Run the database migrations:**

   a. In your Supabase dashboard, go to the SQL Editor
   
   b. Run each migration file in order:
      - `supabase/migrations/001_initial_setup.sql`
      - `supabase/migrations/002_seed_data.sql`
      - `supabase/migrations/003_additional_features.sql`

6. Start the development server:
```bash
npm run dev
```

## Database Setup

The project uses Supabase for the backend. The database schema includes:

### Tables:
- **profiles**: User profiles with role-based access
- **products**: Product catalog with full e-commerce features
- **categories**: Product categorization
- **orders**: Order management (future feature)
- **order_items**: Order details (future feature)

### Key Features:
- **Row Level Security (RLS)**: Enabled on all tables
- **Admin Role**: Special permissions for product management
- **Auto-generated profiles**: Created automatically on user signup
- **Full-text search**: Advanced product search capabilities
- **Inventory management**: Stock tracking and low-stock alerts

### Migration Files:

1. **001_initial_setup.sql**: Creates core tables (profiles, products) with RLS policies
2. **002_seed_data.sql**: Inserts sample product data
3. **003_additional_features.sql**: Adds categories, orders, search functions, and views

## Admin Access

- **Email**: admin@lucknowchikan.com
- **Password**: admin123 (Change this in production!)

The admin user is automatically assigned admin role when signing up with the configured admin email.

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
│   ├── admin/          # Admin-specific components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing page hero
│   ├── ProductGallery.tsx  # Product listing
│   └── ...
├── pages/              # Page components
│   └── admin/          # Admin pages
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx     # Authentication hook
│   └── useProducts.tsx # Product management hook
├── lib/                # Third-party library configurations
│   └── supabase.ts     # Supabase client setup
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and constants
├── data/               # Mock data and constants
└── index.css           # Global styles

supabase/
└── migrations/         # Database migration files
    ├── 001_initial_setup.sql
    ├── 002_seed_data.sql
    └── 003_additional_features.sql
```

## API Endpoints

The application uses Supabase's auto-generated REST API:

- `GET /rest/v1/products` - List all products
- `POST /rest/v1/products` - Create product (admin only)
- `PATCH /rest/v1/products?id=eq.{id}` - Update product (admin only)
- `DELETE /rest/v1/products?id=eq.{id}` - Delete product (admin only)
- `GET /rest/v1/profiles` - User profiles
- `GET /rest/v1/categories` - Product categories

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Common Issues:

1. **Supabase connection errors**: Verify your URL and anon key in `.env`
2. **Authentication issues**: Check if the admin email matches `VITE_ADMIN_EMAIL`
3. **Migration errors**: Run migrations in the correct order
4. **RLS policy errors**: Ensure user has proper role assigned

### Debug Mode:

The application includes extensive console logging. Check browser console for detailed error messages.

## License

This project is licensed under the MIT License.

## Support

For support, email info@chikankaribykanchan.com or contact us through WhatsApp.