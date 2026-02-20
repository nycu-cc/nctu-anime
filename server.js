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
  // 監視 public 資料夾及根目錄 HTML 檔案
  lrServer.watch([
    path.join(__dirname, 'public'),
    path.join(__dirname),
  ]);
  app.use(connectLiveReload());
}

// 提供靜態文件
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'public')));

// 首頁
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 子頁面路由 — 根目錄的 HTML 檔案
const pages = ['activity', 'topics', 'gallery', 'officers', 'contact'];
pages.forEach(page => {
  app.get(`/${page}.html`, (req, res) => {
    res.sendFile(path.join(__dirname, `${page}.html`));
  });
});

// 啟動服務器
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
