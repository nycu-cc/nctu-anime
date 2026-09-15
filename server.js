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

// Both local preview and GitHub Pages use the front-end welcome redirect.
// URL fragments and sessionStorage are only available in the browser.
app.get(['/', '/index.html'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Subpage route
app.get('/welcome', (req, res) => {
  res.redirect('/pages/welcome.html');
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

// Keep explicit routes before static middleware.
app.use(express.static(path.join(__dirname)));

// Start the server when launched directly; allow isolated HTTP checks on import.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
