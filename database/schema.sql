-- EMO Discord Bot 資料庫結構
-- Cloudflare D1 (SQLite)

-- 伺服器設定表
CREATE TABLE IF NOT EXISTS guild_settings (
  guild_id TEXT PRIMARY KEY,
  prefix TEXT DEFAULT '!',
  language TEXT DEFAULT 'zh-TW',
  welcome_channel TEXT,
  audit_channel TEXT,
  created_at INTEGER
);

-- 用戶資料表
CREATE TABLE IF NOT EXISTS users (
  user_id TEXT NOT NULL,
  guild_id TEXT NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  warnings INTEGER DEFAULT 0,
  last_active INTEGER,
  PRIMARY KEY (user_id, guild_id),
  FOREIGN KEY (guild_id) REFERENCES guild_settings(guild_id)
);

-- 審核日誌表
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guild_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  action TEXT NOT NULL,
  reason TEXT,
  moderator_id TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  FOREIGN KEY (guild_id) REFERENCES guild_settings(guild_id)
);

-- 自定義命令表
CREATE TABLE IF NOT EXISTS custom_commands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guild_id TEXT NOT NULL,
  command_name TEXT NOT NULL,
  response TEXT NOT NULL,
  created_by TEXT NOT NULL,
  usage_count INTEGER DEFAULT 0,
  FOREIGN KEY (guild_id) REFERENCES guild_settings(guild_id),
  UNIQUE(guild_id, command_name)
);

-- 創建索引以提升查詢效能
CREATE INDEX IF NOT EXISTS idx_users_guild ON users(guild_id);
CREATE INDEX IF NOT EXISTS idx_audit_guild ON audit_logs(guild_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_custom_commands_guild ON custom_commands(guild_id);

