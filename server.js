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
  lrServer.watch(path.join(__dirname, 'public'));
  app.use(connectLiveReload());
}

// 提供靜態文件
app.use(express.static(path.join(__dirname, 'public')));

// 路由處理
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 啟動服務器
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
