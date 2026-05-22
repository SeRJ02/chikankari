import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId =
  (import.meta.env?.VITE_SANITY_PROJECT_ID as string) || 'k7a2zjl7';
const dataset =
  (import.meta.env?.VITE_SANITY_DATASET as string) || 'production';

export default defineConfig({
  name: 'default',
  title: 'Chikankari by Kanchan',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
