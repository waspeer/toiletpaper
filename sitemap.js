const sitemap = require('nextjs-sitemap-generator');
const { resolve } = require('path');

sitemap({
  baseUrl: 'https://toiletpaper.klangstof.com',
  pagesDirectory: resolve(__dirname, 'src', 'pages'),
  targetDirectory: 'static/',
  nextConfigPath: resolve(__dirname, 'next.config.js'),
});
