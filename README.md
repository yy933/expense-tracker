# 家庭記帳本 Mini Expense Tracker
---
<div style="display:flex;">
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"></div>

<br>

## See live demo [here](https://mini-expense-tracker.onrender.com)

這是一個使用Node.js（Express框架）搭配MongoDB資料庫所建立的簡易記帳本，使用者註冊帳號並登入後（也可透過Google帳號快速登入），可以新增支出並分類，也可以編輯、刪除帳務紀錄；亦可以根據分類、日期、金額大小等條件篩選帳務記錄。
<br> 
同時，也可以經由消費分析檢視各分類支出占總支出金額的比例，亦可以自訂分析日期的範圍。
<p>
  <h3 style="text-align:center;">登入頁面</h3>
  <img src="./public/README_images/login page.png" width="100%" alt="login">
  <h3 style="text-align:center;">首頁</h3>
  <img src="./public/README_images/index page.png" width="100%" alt="index">
  <h3 style="text-align:center;">消費分析</h3>
  <img src="./public/README_images/stats page.png" width="100%" alt="stats">
</p>

## 功能 Features
1. 使用者必須註冊帳號(亦可使用Google帳號登入)，並登入使用本網站的功能，管理屬於自己的支出記錄
2. 使用者可以新增支出，並詳細記錄該筆支出細節(包含名稱、分類、日期、金額等)
3. 使用者可利用篩選功能排序或篩選所有或選定的支出記錄，篩選條件包含日期、金額、分類等
4. 使用者可以修改支出記錄
5. 使用者可以刪除支出記錄
6. 使用者可以利用消費分析功能，查看選定的日期範圍內，各分類的消費總額、及其所佔總消費金額的百分比

## 環境 Pre-requisites
1. Node.js @16.14.1
2. npm @8.5.0
3. MongoDB @6.0.8


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
4. 建立.env檔案（細節可參考.env.example）
5. 匯入種子資料
```
npm run seed
```
當終端機顯示 `mongodb connected!` 、 `User seeder done!` 、 `Category seeder done!`、`Record seeder done!` 表示已成功匯入種子資料，按 ctrl + c 結束執行

5. 啟動伺服器
```
npm run start
```
6. 當終端機顯示 `App is running on http://localhost:3000` ，代表已成功啟動伺服器並執行app.js檔案，至瀏覽器輸入 http://localhost:3000 即可使用本網站

## 測試帳號 Test Accounts
匯入種子資料後，可利用以下帳號進行測試：

email: root@example.com
<br>
password: 12345678





