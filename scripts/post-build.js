import fs from 'fs';
import path from 'path';

const clientBuildDir = path.join(process.cwd(), 'build/client');

// Copier index.html vers 404.html pour GitHub Pages
const indexHtmlPath = path.join(clientBuildDir, 'index.html');
const notFoundHtmlPath = path.join(clientBuildDir, '404.html');

// Créer index.html s'il n'existe pas
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/esspo/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ESSPO</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/esspo/assets/entry.client-DSbOaAbg.js"></script>
  </body>
</html>`;

if (!fs.existsSync(indexHtmlPath)) {
  fs.writeFileSync(indexHtmlPath, htmlTemplate, 'utf-8');
  console.log('✓ Created build/client/index.html');
}

// Copier index.html vers 404.html (pour GitHub Pages SPA routing)
if (fs.existsSync(indexHtmlPath)) {
  fs.copyFileSync(indexHtmlPath, notFoundHtmlPath);
  console.log('✓ Created build/client/404.html for GitHub Pages routing');
}
