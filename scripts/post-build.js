import fs from 'fs';
import path from 'path';

const clientBuildDir = path.join(process.cwd(), 'build/client');

// Copier index.html vers 404.html pour GitHub Pages
const indexHtmlPath = path.join(clientBuildDir, 'index.html');
const notFoundHtmlPath = path.join(clientBuildDir, '404.html');

// Lire le contenu généré par Vite
if (fs.existsSync(indexHtmlPath)) {
  const indexContent = fs.readFileSync(indexHtmlPath, 'utf-8');
  
  // Copier vers 404.html (pour GitHub Pages SPA routing)
  fs.writeFileSync(notFoundHtmlPath, indexContent, 'utf-8');
  console.log('✓ Created build/client/404.html for GitHub Pages routing');
} else {
  console.warn('⚠ index.html not found in build/client');
}
