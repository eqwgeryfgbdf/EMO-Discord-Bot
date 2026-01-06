# Cloudflare 設置指南

本指南說明如何設置 Cloudflare D1 資料庫和 Workers KV。

## 📋 前置要求

- Cloudflare 帳號
- Wrangler CLI 已安裝

## 🗄️ D1 資料庫設置

### 1. 創建 D1 資料庫

```bash
wrangler d1 create emo-discord-bot-db
```

輸出範例：
```
✅ Successfully created DB 'emo-discord-bot-db' in region APAC
Created your new D1 database.

To access your new D1 Database in your Worker, add the following snippet to your configuration file:
{
  "d1_databases": [
    {
      "binding": "emo_discord_bot_db",
      "database_name": "emo-discord-bot-db",
      "database_id": "dad3977a-d5aa-41af-9366-63fd1616e290"
    }
  ]
}
```

### 2. 執行資料庫 Schema

```bash
# 本地測試
wrangler d1 execute emo-discord-bot-db --file=database/schema.sql

# 生產環境
wrangler d1 execute emo-discord-bot-db --remote --file=database/schema.sql
```

### 3. 驗證資料表

```bash
wrangler d1 execute emo-discord-bot-db --remote --command "SELECT name FROM sqlite_master WHERE type='table'"
```

## 📦 Workers KV 設置

### 1. 創建 KV Namespace

```bash
wrangler kv namespace create "EMO_BOT_KV"
```

輸出範例：
```
✨ Success!
To access your new KV Namespace in your Worker, add the following snippet to your configuration file:
[[kv_namespaces]]
binding = "EMO_BOT_KV"
id = "2d35fd88262d4f90a0d9a3de94ac47e7"
```

### 2. 創建預覽環境 Namespace（可選）

```bash
wrangler kv namespace create "EMO_BOT_KV" --preview
```

## ⚙️ 配置檔案

### wrangler.toml

已創建的配置檔案包含：

```toml
name = "emo-discord-bot"
compatibility_date = "2024-01-01"

# D1 資料庫綁定
[[d1_databases]]
binding = "DB"
database_name = "emo-discord-bot-db"
database_id = "dad3977a-d5aa-41af-9366-63fd1616e290"

# Workers KV 綁定
[[kv_namespaces]]
binding = "KV"
id = "2d35fd88262d4f90a0d9a3de94ac47e7"
```

## 🔑 獲取必要的資訊

### Account ID

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 選擇您的帳號
3. 在右側邊欄找到 **Account ID**
4. 複製 Account ID

### API Token

1. 前往 [My Profile > API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. 點擊 **Create Token**
3. 使用 **Edit Cloudflare Workers** 模板
4. 或自定義權限：
   - Account > D1 > Edit
   - Account > Workers KV > Edit
5. 複製生成的 Token

## 🔐 環境變數設定

在您的部署平台（Railway、Vercel 等）設定以下環境變數：

```env
# Cloudflare 配置
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
D1_DATABASE_ID=dad3977a-d5aa-41af-9366-63fd1616e290
KV_NAMESPACE_ID=2d35fd88262d4f90a0d9a3de94ac47e7
```

## 📊 資料庫結構

詳細的資料庫結構請參考 `database/schema.sql`。

### 主要資料表

1. **guild_settings** - 伺服器設定
2. **users** - 用戶資料
3. **audit_logs** - 審核日誌
4. **custom_commands** - 自定義命令

## 🧪 測試連接

### 本地測試 D1

```bash
# 查詢資料
wrangler d1 execute emo-discord-bot-db --local --command "SELECT * FROM guild_settings LIMIT 1"

# 插入測試資料
wrangler d1 execute emo-discord-bot-db --local --command "INSERT INTO guild_settings (guild_id, prefix, created_at) VALUES ('test123', '!', 1234567890)"
```

### 遠程測試 D1

```bash
wrangler d1 execute emo-discord-bot-db --remote --command "SELECT COUNT(*) as count FROM guild_settings"
```

## 📚 相關資源

- [Cloudflare D1 文檔](https://developers.cloudflare.com/d1/)
- [Workers KV 文檔](https://developers.cloudflare.com/workers/runtime-apis/kv/)
- [Wrangler CLI 文檔](https://developers.cloudflare.com/workers/wrangler/)

## 🐛 常見問題

### D1 資料庫連接失敗

- 確認 `database_id` 正確
- 檢查 API Token 權限
- 確認 Account ID 正確

### KV Namespace 無法訪問

- 確認 `id` 正確
- 檢查 wrangler.toml 配置
- 確認 API Token 有 KV 權限

### Schema 執行失敗

- 檢查 SQL 語法
- 確認資料表名稱不衝突
- 查看錯誤訊息詳細資訊

