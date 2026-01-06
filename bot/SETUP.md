# Bot 設置指南

本指南將幫助您設置和運行 EMO Discord Bot。

## 📋 前置要求

- Node.js 18+ 
- npm 或 yarn
- Discord Developer Portal 帳號
- Discord Bot Token

## 🔧 設置步驟

### 1. 創建 Discord Bot

1. 前往 [Discord Developer Portal](https://discord.com/developers/applications)
2. 點擊 "New Application" 創建新應用
3. 進入 "Bot" 頁面，點擊 "Add Bot"
4. 複製 Bot Token（稍後會用到）
5. 在 "OAuth2" > "URL Generator" 中：
   - 選擇 `bot` scope
   - 選擇必要的權限（見下方）
   - 使用生成的 URL 將 Bot 添加到您的伺服器

### 2. Bot 權限

建議的 Bot 權限：
- ✅ Read Messages/View Channels
- ✅ Send Messages
- ✅ Embed Links
- ✅ Attach Files
- ✅ Read Message History
- ✅ Use External Emojis
- ✅ Add Reactions
- ✅ Use Slash Commands

管理命令需要的額外權限：
- ✅ Manage Messages
- ✅ Kick Members
- ✅ Ban Members
- ✅ Manage Roles

### 3. 安裝依賴

```bash
cd bot
npm install
```

### 4. 配置環境變數

創建 `.env` 文件：

```env
DISCORD_BOT_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here  # 可選，開發模式建議設定
PREFIX=!
LOG_LEVEL=info
NODE_ENV=development
```

**如何獲取這些值：**
- `DISCORD_BOT_TOKEN`: Discord Developer Portal > Bot > Token
- `CLIENT_ID`: Discord Developer Portal > OAuth2 > Client ID
- `GUILD_ID`: 右鍵點擊伺服器 > 複製伺服器 ID（需啟用開發者模式）

### 5. 創建日誌目錄

```bash
mkdir -p logs
```

### 6. 啟動 Bot

開發模式（自動重載）：
```bash
npm run dev
```

生產模式：
```bash
npm run build
npm start
```

## ✅ 驗證設置

Bot 啟動後，您應該看到：
- ✅ Bot 已登入為 [Bot名稱]
- ✅ 已註冊 X 個 Slash Commands
- 🚀 Bot 已準備就緒

在 Discord 中測試：
- 輸入 `/ping` 或 `!ping` 測試回應
- 輸入 `/help` 或 `!help` 查看命令列表

## 🐛 常見問題

### Bot 無法登入

- 檢查 `DISCORD_BOT_TOKEN` 是否正確
- 確認 Token 沒有多餘的空格
- 確認 Bot 已添加到伺服器

### Slash Commands 不顯示

- 等待幾分鐘讓 Discord 同步命令
- 確認 `CLIENT_ID` 正確
- 如果設定了 `GUILD_ID`，命令只會在該伺服器顯示（開發模式）

### 命令無回應

- 檢查 Bot 是否有發送訊息的權限
- 確認頻道權限設定正確
- 查看日誌文件 `logs/combined.log` 或 `logs/error.log`

## 📚 下一步

- 閱讀 [README.md](./README.md) 了解開發規範
- 查看 `src/commands/` 目錄學習如何添加新命令
- 閱讀 [開發文檔](../docs/DEVELOPMENT.md) 了解更多資訊

