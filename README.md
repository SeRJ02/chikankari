# Chikankari by Kanchan

A beautiful e-commerce website showcasing authentic Lucknowi Chikankari kurtas, built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Product Gallery**: Beautiful product showcase with filtering and search
- **Sanity CMS**: Product catalog managed through Sanity's hosted Studio
- **Sample Data Fallback**: Runs out of the box with sample products when Sanity is not configured
- **Modern UI**: Clean, elegant design with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Content**: Sanity.io (headless CMS)
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

4. Start the development server:
```bash
npm run dev
```

The app runs immediately with bundled sample products. Configure Sanity (below) to serve a live, editable catalog.

## Sanity Setup

The product catalog is sourced from a [Sanity.io](https://www.sanity.io/) project. Until it is configured, the app falls back to the sample data in `src/data/products.ts`.

1. Create a project at [https://www.sanity.io/](https://www.sanity.io/).
2. Copy your **Project ID** from the project settings.
3. Add the values to your `.env` file:
   ```env
   VITE_SANITY_PROJECT_ID=your_sanity_project_id
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2024-01-01
   ```
4. In Sanity, create a `product` document type with the following fields, matching the app's `Product` type:

   | Field                | Type            |
   |----------------------|-----------------|
   | `name`               | string          |
   | `price`              | number          |
   | `originalPrice`      | number          |
   | `images`             | array of images |
   | `description`        | text            |
   | `fabric`             | string          |
   | `embroideryTechnique`| string          |
   | `sizes`              | array of strings|
   | `careInstructions`   | array of strings|
   | `heritageStory`      | text            |
   | `inStock`            | boolean         |
   | `stockCount`         | number          |
   | `category`           | string          |
   | `featured`           | boolean         |

5. Add products in your Sanity Studio. They appear on the site automatically.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Sanity Configuration
VITE_SANITY_PROJECT_ID=your_sanity_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01

# Contact Information
VITE_WHATSAPP_NUMBER=+91XXXXXXXXXX
VITE_COMPANY_EMAIL=info@chikankaribykanchan.com
VITE_COMPANY_ADDRESS=Lucknow, Uttar Pradesh, India

# Social Media Links
VITE_INSTAGRAM_URL=https://www.instagram.com/kanchanchikankari/?hl=en
VITE_FACEBOOK_URL=https://facebook.com/chikankaribykanchan
VITE_TWITTER_URL=https://twitter.com/chikankaribykanchan
VITE_YOUTUBE_URL=https://youtube.com/chikankaribykanchan
```

## Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify.
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add the environment variables above in the Netlify dashboard.

The site loads with sample data even if no environment variables are set, so a missing configuration will not produce a blank page.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Landing page hero
│   ├── ProductGallery.tsx  # Product listing
│   └── ...
├── hooks/               # Custom React hooks
│   └── useProducts.tsx  # Loads products from Sanity (with fallback)
├── lib/                 # Third-party library configurations
│   └── sanity.ts        # Sanity client setup
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and constants
├── data/                # Sample product data
└── index.css            # Global styles
```

## Troubleshooting

1. **No products / sample data shown**: Verify `VITE_SANITY_PROJECT_ID` is set and a `product` document type exists in Sanity.
2. **Images not loading**: Ensure the `images` field uses Sanity image assets, or raw image URLs.
3. **Debug mode**: The app logs product-loading status to the browser console.

## License

This project is licensed under the MIT License.

## Support

For support, email info@chikankaribykanchan.com or contact us through WhatsApp.
