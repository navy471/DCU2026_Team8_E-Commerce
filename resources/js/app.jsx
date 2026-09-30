import '../css/app.css'; // Import Tailwind CSS ដើម្បីកុំឱ្យបាត់ Style
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { WishlistProvider } from '@/Context/WishlistContext';

const appName = import.meta.env.VITE_APP_NAME || 'G4 Auto Care';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <React.StrictMode>
        <WishlistProvider>
          <App {...props} />
        </WishlistProvider>
      </React.StrictMode>
    );
  },
  progress: {
    color: '#ef4444', // ប្តូរ Progress Bar ពណ៌ក្រហម Red-500
    showSpinner: true,
  },
});