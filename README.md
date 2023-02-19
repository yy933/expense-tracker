# 家庭記帳本
---
這是一個使用Node.js與Express所建立的簡易記帳本，使用者註冊帳號並登入後，可以紀錄支出並分類，也可以編輯、刪除自己喜愛的帳務紀錄。
<p align="center">
  <h3>登入頁面</h3>
  <img src="README_images\login page.jpg" width="100%" alt="login">
</p>

## 功能 Features
1. 使用者必須註冊帳號(亦可使用Facebook帳號登入)，並登入使用本網站的功能，管理屬於自己的餐廳清單
2. 使用者點擊餐廳，可以查看餐廳詳細資訊(包含店名、類型、地址、電話等)
3. 使用者可利用關鍵字搜尋功能進行搜尋
4. 使用者可以排序餐廳
5. 使用者可以新增一家餐廳
6. 使用者可以瀏覽一家餐廳的詳細資訊
7. 使用者可以瀏覽全部所有餐廳
8. 使用者可以修改一家餐廳的資訊
9. 使用者可以刪除一家餐廳
## 主要工具 Tools
1. "bcryptjs": "^2.4.3"
2. "body-parser": "^1.20.1",
3. "connect-flash": "^0.1.1",
4. "express": "^4.18.2",
5. "express-handlebars": "^6.0.7",
6. "express-session": "^1.17.1",
7. "method-override": "^3.0.0",
8. "moment": "^2.29.4",
9. "mongoose": "^6.9.1",
10. "passport": "^0.4.1",
11. "passport-facebook": "^3.0.0",
12. "passport-local": "^1.0.0"

## 安裝指南 Installation Guide
1. 打開終端機，複製此專案至本機
```
git clone https://github.com/yy933/expense-tracker.git
```
2. 進入此專案資料夾
```
cd expense-tracker
```
3. 安裝npm套件 

```
npm install
```
```
npm install <package name>@<version>
```
4. 匯入種子資料
```
npm run seed
```
當終端機顯示 `mongodb connected!` 、 `recordSeeder done!` 、 `categorySeeder done!` 表示已成功匯入種子資料，按 ctrl + c 結束執行

5. 啟動伺服器
```
npm run start
```
6. 當終端機顯示 `Express is running on http://localhost:3000` ，代表已成功啟動伺服器並執行app.js檔案，至瀏覽器輸入 http://localhost:3000 即可使用本網站

## 測試 Test
匯入種子資料後，可利用以下帳號進行測試：

* User 1:
email: root@example.com
password: 12345678





