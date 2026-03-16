const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const app = express();
const PORT = process.env.PORT || 3000;

// LiveReload - enabled only in development mode
if (process.env.NODE_ENV !== 'production') {
  const lrServer = livereload.createServer({
    exts: ['html', 'css', 'js'],
    delay: 100,
  });

  // Watch the project directories (excluding node_modules)
  lrServer.watch([
    path.join(__dirname, 'public'),
    path.join(__dirname, 'images'),
    path.join(__dirname, 'pages'),
    path.join(__dirname, 'index.html'),
  ]);
  app.use(connectLiveReload());
}

// Serve static files
// Use the project root as the static root to match GitHub Pages paths
// (Example: public/js/shared.js -> GET /public/js/shared.js)
app.use(express.static(path.join(__dirname)));

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Subpage route
app.get('/pages/charter.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'charter.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
