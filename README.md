# NCTU 動畫社 網站

就是個網站而已。

Contributed By ~~冠位非洲人~~ Claude Opus 4.6  
Powered By かなりあ

## 本機開發

本專案使用 Node.js + Express 作為**本機靜態檔案伺服器**，方便在開發時預覽頁面與 hot-reload。

```bash
npm install
npm run dev   # Start server.js, preview at http://localhost:3000
```

迎新時間集中設定於 `public/js/welcome-config.js`。目前宣傳期間為 2026/9/1 至 9/23 21:30，活動於 19:00 開始、20:40 移至社辦交流、21:30 結束；倒數狀態與行事曆時間應配合此設定維護。

首頁的迎新導向由瀏覽器統一處理，本機預覽與靜態網站使用相同規則。帶有區塊定位（例如 `index.html#contact`）、站內來源、已進入過首頁，或 `?home=1`、`?skip=1`、`?from=welcome` 的訪客會保留在首頁。`/welcome` 是本機迎新入口，會轉址至 `/pages/welcome.html`。

執行 `npm test` 可驗證首頁導向、活動狀態與行事曆時間、主題切換及本機導覽路由。
