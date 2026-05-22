import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// The project id is not a secret; it ships in the client bundle of every
// Sanity-powered site. Defaulting to it lets the storefront work without
// any env vars configured.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'k7a2zjl7';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

// Check if Sanity is properly configured
export const isSanityConfigured = () => {
  return !!(
    projectId &&
    projectId !== 'your_sanity_project_id' &&
    projectId !== 'YOUR_SANITY_PROJECT_ID'
  );
};

if (!isSanityConfigured()) {
  console.warn('Sanity not configured. Using mock data.');
}

export const sanityClient = isSanityConfigured()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

// Resolve a Sanity image reference (or asset object) to a URL
export const urlForImage = (source: unknown): string => {
  if (!builder || !source) return '';
  try {
    return builder.image(source as never).url();
  } catch {
    return '';
  }
};
