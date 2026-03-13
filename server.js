const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const app = express();
const PORT = process.env.PORT || 3000;

// LiveReload - 僅在開發模式下啟用
if (process.env.NODE_ENV !== 'production') {
  const lrServer = livereload.createServer({
    exts: ['html', 'css', 'js'],
    delay: 100,
  });

  // 監視整個專案目錄（排除 node_modules）
  lrServer.watch([
    path.join(__dirname, 'public'),
    path.join(__dirname, 'images'),
    path.join(__dirname, 'pages'),
    path.join(__dirname, 'index.html'),
  ]);
  app.use(connectLiveReload());
}

// 提供靜態檔案
// 以專案根目錄為靜態根，使路徑與 GitHub Pages 一致
// (例：public/js/shared.js → GET /public/js/shared.js)
app.use(express.static(path.join(__dirname)));

// 首頁
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 子頁面路由
app.get('/pages/charter.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'charter.html'));
});

// 啟動服務器
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
