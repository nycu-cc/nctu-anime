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

// Home page - redirect to welcome page during orientation period
app.get('/', (req, res) => {
  if (req.query.from === 'welcome' || req.query.home === '1' || req.query.skip === '1') {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.redirect('/pages/welcome.html');
  }
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Subpage route
app.get('/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'welcome.html'));
});

app.get('/pages/welcome.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'welcome.html'));
});

app.get('/pages/charter.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'charter.html'));
});

app.get('/pages/officers.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'officers.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
