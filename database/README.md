# 資料庫設置指南

## Cloudflare D1 資料庫

### 資料庫資訊

- **資料庫名稱**: `emo-discord-bot-db`
- **資料庫 ID**: `dad3977a-d5aa-41af-9366-63fd1616e290`
- **Binding**: `DB`

### 執行 Schema

#### 本地測試環境

```bash
wrangler d1 execute emo-discord-bot-db --file=database/schema.sql
```

#### 生產環境（遠程）

```bash
wrangler d1 execute emo-discord-bot-db --remote --file=database/schema.sql
```

⚠️ **注意**: 遠程執行時，資料庫可能會暫時無法提供查詢服務。

### 驗證 Schema

```bash
# 查看所有表
wrangler d1 execute emo-discord-bot-db --remote --command "SELECT name FROM sqlite_master WHERE type='table'"

# 查看表結構
wrangler d1 execute emo-discord-bot-db --remote --command "PRAGMA table_info(guild_settings)"
```

### 資料表說明

1. **guild_settings** - 伺服器設定
   - 儲存每個伺服器的配置（前綴、語言、頻道等）

2. **users** - 用戶資料
   - 儲存用戶的 XP、等級、警告次數等

3. **audit_logs** - 審核日誌
   - 記錄所有管理操作

4. **custom_commands** - 自定義命令
   - 儲存伺服器自定義的命令

## Workers KV

### KV Namespace 資訊

- **Namespace 名稱**: `EMO_BOT_KV`
- **Namespace ID**: `2d35fd88262d4f90a0d9a3de94ac47e7`
- **Binding**: `KV`

### 使用場景

- Session 儲存（1 小時過期）
- 快取頻繁查詢的資料（5 分鐘過期）
- 臨時資料儲存

### 操作範例

```typescript
// 儲存資料
await env.KV.put(`session:${userId}`, JSON.stringify(sessionData), {
  expirationTtl: 3600 // 1 小時
});

// 讀取資料
const data = await env.KV.get(`session:${userId}`);

// 刪除資料
await env.KV.delete(`session:${userId}`);
```

## 相關文件

- [Cloudflare D1 文檔](https://developers.cloudflare.com/d1/)
- [Workers KV 文檔](https://developers.cloudflare.com/workers/runtime-apis/kv/)

