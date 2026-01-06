# EMO Discord Bot

Discord Bot 核心模組，使用 discord.js 14.x 和 TypeScript 開發。

## 📁 專案結構

```
bot/
├── src/
│   ├── commands/          # 命令模組
│   │   └── utility/       # 工具命令
│   ├── events/            # 事件處理器
│   ├── utils/             # 工具函數
│   ├── config/            # 配置文件
│   ├── types/             # TypeScript 類型定義
│   └── index.ts           # 入口文件
├── dist/                  # 編譯輸出
├── logs/                  # 日誌文件
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 配置環境變數

創建 `.env` 文件（參考 `.env.example`）：

```env
DISCORD_BOT_TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id  # 可選，開發模式使用
PREFIX=!                 # 命令前綴，預設為 !
LOG_LEVEL=info          # 日誌級別
PYTHON_SERVICE_URL=http://localhost:8000  # 可選
```

### 3. 開發模式

```bash
npm run dev
```

### 4. 編譯和生產模式

```bash
# 編譯 TypeScript
npm run build

# 啟動生產版本
npm start
```

## 📝 命令系統

### 目前可用的命令

- `/ping` 或 `!ping` - 測試 Bot 回應時間
- `/help` 或 `!help` - 顯示幫助訊息

### 新增命令

1. 在 `src/commands/` 目錄下創建命令文件
2. 實現 `Command` 介面
3. 在 `src/commands/index.ts` 中註冊命令

範例：

```typescript
import { Command } from '../types/command';

export const myCommand: Command = {
  name: 'mycommand',
  description: '我的命令',
  // ... 實現
};
```

## 🔧 開發規範

- 使用 **camelCase** 命名變數和函數
- 使用 **PascalCase** 命名類型和介面
- 文件名稱使用 **kebab-case**
- 使用 TypeScript 嚴格模式
- 始終處理錯誤，避免靜默捕獲

## 📚 相關文檔

- [Discord.js 指南](https://discordjs.guide/)
- [Discord.js 文檔](https://discord.js.org/)
- [TypeScript 文檔](https://www.typescriptlang.org/)

