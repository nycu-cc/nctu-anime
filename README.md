# NCTU 動畫社 網站

就是個網站而已。

Contributed By ~~冠位非洲人~~ Claude Opus 4.6  
Powered By かなりあ

## 本機開發

本專案使用 Node.js + Express 作為**本機靜態檔案伺服器**，方便在開發時預覽頁面與 hot-reload。

```bash
npm install
npm run dev   # 啟動 server.js，預覽網址為 http://localhost:3000
```

> **注意**：`server.js` 僅供本機開發使用，正式部署（如 GitHub Pages）為純靜態 HTML，
> 不需要 Node.js 環境，`server.js`、`node_modules` 等也不會被部署。