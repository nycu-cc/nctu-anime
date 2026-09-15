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

首頁的迎新導向由瀏覽器統一處理，本機預覽與靜態網站使用相同規則。帶有區塊定位（例如 `index.html#contact`）、站內來源、已進入過首頁，或 `?home=1`、`?skip=1`、`?from=welcome` 的訪客會保留在首頁。`/welcome` 是迎新短網址：本機由伺服器轉址，正式靜態網站透過 `welcome/index.html` 入口前往 `/pages/welcome.html`。新增入口需部署後才會在正式網址生效。

執行 `npm test` 可驗證首頁導向、活動狀態與行事曆時間、主題切換及本機導覽路由。

網站直接使用原圖，不需要製作縮圖。首頁第一張大圖立即載入，其餘社課、活動剪影、幹部頭像與迎新海報使用 `loading="lazy"`、`decoding="async"`，讓瀏覽器在接近圖片時下載，並安排非同步解碼。放大檢視仍使用原圖，點擊時立即載入。

新增圖片時可沿用 `index.html` 內的社課範本，保留載入設定，並將 `width`、`height` 改為原圖實際像素尺寸（可在檔案內容／詳細資料查看）。這兩個數值用來預留比例，畫面上的大小仍由 CSS 決定。只要加入原圖與 HTML，不需要增加其他圖片檔案。捲完整頁後，總下載量仍與原圖合計大小相近。
