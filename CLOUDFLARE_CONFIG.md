# Cloudflare 配置資訊

本文檔記錄已建立的 Cloudflare 資源配置資訊。

## ✅ 已建立的資源

### 1. D1 資料庫

- **資料庫名稱**: `emo-discord-bot-db`
- **資料庫 ID**: `dad3977a-d5aa-41af-9366-63fd1616e290`
- **Binding**: `DB`
- **區域**: APAC
- **狀態**: ✅ 已創建並執行本地 Schema

### 2. Workers KV Namespace

- **Namespace 名稱**: `EMO_BOT_KV`
- **Namespace ID**: `2d35fd88262d4f90a0d9a3de94ac47e7`
- **Binding**: `KV`
- **狀態**: ✅ 已創建

## 📁 配置檔案

### wrangler.toml

位置: `/mnt/d/project/discord/EMO-Discord-Bot/wrangler.toml`

```toml
name = "emo-discord-bot"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "emo-discord-bot-db"
database_id = "dad3977a-d5aa-41af-9366-63fd1616e290"

[[kv_namespaces]]
binding = "KV"
id = "2d35fd88262d4f90a0d9a3de94ac47e7"
```

### database/schema.sql

位置: `/mnt/d/project/discord/EMO-Discord-Bot/database/schema.sql`

包含以下資料表：
- `guild_settings` - 伺服器設定
- `users` - 用戶資料
- `audit_logs` - 審核日誌
- `custom_commands` - 自定義命令

## 🔑 需要的環境變數

在部署平台設定以下環境變數：

```env
# Cloudflare 配置
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
D1_DATABASE_ID=dad3977a-d5aa-41af-9366-63fd1616e290
KV_NAMESPACE_ID=2d35fd88262d4f90a0d9a3de94ac47e7
```

## 📝 下一步操作

### 1. 執行遠程 Schema（生產環境）

```bash
wrangler d1 execute emo-discord-bot-db --remote --file=database/schema.sql
```

⚠️ 注意：執行時會提示確認，因為可能會暫時影響資料庫可用性。

### 2. 獲取 Account ID

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇您的帳號
3. 在右側邊欄複製 **Account ID**

### 3. 創建 API Token

1. 前往 [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 創建新 Token，權限包括：
   - Account > D1 > Edit
   - Account > Workers KV > Edit

### 4. 驗證配置

```bash
# 測試 D1 連接（本地）
wrangler d1 execute emo-discord-bot-db --local --command "SELECT name FROM sqlite_master WHERE type='table'"

# 測試 D1 連接（遠程）
wrangler d1 execute emo-discord-bot-db --remote --command "SELECT COUNT(*) as count FROM guild_settings"
```

## 📚 相關文檔

- [Cloudflare 設置指南](./docs/CLOUDFLARE_SETUP.md)
- [資料庫 README](./database/README.md)
- [架構文檔](./docs/ARCHITECTURE.md)

## 🔗 快速連結

- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [D1 資料庫管理](https://dash.cloudflare.com/?to=/:account/workers/d1)
- [Workers KV 管理](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)

