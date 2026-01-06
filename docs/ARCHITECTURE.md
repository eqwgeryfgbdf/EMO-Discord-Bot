# 项目架构文档

本文档详细说明 EMO-Discord-Bot 的系统架构和通信流程。

## 🏗️ 系统架构图

```
┌─────────────────┐
│   用户浏览器     │
└────────┬────────┘
         │
    ┌────▼─────┐
    │  Next.js  │ (Vercel)
    │  前端+API  │
    └────┬─────┘
         │
    ┌────▼──────────────┐
    │                   │
┌───▼────┐      ┌──────▼─────┐
│discord.js│     │   FastAPI   │ (Railway)
│   Bot    │◄────┤Python 服务  │
└───┬────┘      └──────┬─────┘
    │                  │
    └────┬─────────────┘
         │
    ┌────▼─────────┐
    │ Cloudflare D1 │
    │  Workers KV   │
    └──────────────┘
```

## 📡 通信架构

### 1. Next.js ↔ discord.js Bot
- **通信方式**: RESTful API
- **协议**: HTTP/HTTPS
- **用途**: 
  - 前端获取 Bot 状态
  - 管理界面控制 Bot
  - 数据同步

### 2. discord.js ↔ Python 服务
- **通信方式**: HTTP API / Message Queue
- **协议**: HTTP/HTTPS
- **用途**:
  - AI 功能调用
  - 复杂数据处理
  - 内容审核

### 3. Python ↔ Cloudflare D1
- **通信方式**: Cloudflare API
- **协议**: HTTP/HTTPS
- **用途**:
  - 数据存储
  - 数据查询
  - 统计分析

## 🗄️ 数据库设计

### Cloudflare D1 数据表

#### guild_settings (服务器设置)
```sql
CREATE TABLE guild_settings (
  guild_id TEXT PRIMARY KEY,
  prefix TEXT DEFAULT '!',
  language TEXT DEFAULT 'zh-TW',
  welcome_channel TEXT,
  audit_channel TEXT,
  created_at INTEGER
);
```

#### users (用户数据)
```sql
CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  guild_id TEXT,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  warnings INTEGER DEFAULT 0,
  last_active INTEGER,
  FOREIGN KEY (guild_id) REFERENCES guild_settings(guild_id)
);
```

#### audit_logs (审核日志)
```sql
CREATE TABLE audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guild_id TEXT,
  user_id TEXT,
  action TEXT,
  reason TEXT,
  moderator_id TEXT,
  timestamp INTEGER,
  FOREIGN KEY (guild_id) REFERENCES guild_settings(guild_id)
);
```

#### custom_commands (自定义命令)
```sql
CREATE TABLE custom_commands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guild_id TEXT,
  command_name TEXT,
  response TEXT,
  created_by TEXT,
  usage_count INTEGER DEFAULT 0,
  FOREIGN KEY (guild_id) REFERENCES guild_settings(guild_id)
);
```

### Workers KV 使用场景

#### Session 存储
```javascript
await KV.put(`session:${userId}`, JSON.stringify(sessionData), {
  expirationTtl: 3600 // 1 小时过期
});
```

#### 缓存频繁查询
```javascript
await KV.put(`cache:guild:${guildId}`, guildData, {
  expirationTtl: 300 // 5 分钟
});
```

## 🔄 数据流

### 用户交互流程

1. **用户发送消息**
   ```
   用户 → Discord → discord.js Bot → 命令处理
   ```

2. **AI 功能调用**
   ```
   Bot → Python Service → OpenAI API → 返回结果 → Bot → 用户
   ```

3. **数据存储**
   ```
   Bot → Cloudflare D1 → 存储数据
   ```

4. **前端管理**
   ```
   用户浏览器 → Next.js → Discord OAuth2 → 管理界面 → API → Bot
   ```

## 🔐 安全架构

### 认证流程

1. **Discord OAuth2**
   - 用户通过 Discord 登录
   - NextAuth.js 处理会话
   - 验证用户权限

2. **Bot Token 保护**
   - 存储在环境变量
   - 不提交到版本控制
   - 定期更换

3. **API 安全**
   - 速率限制
   - 输入验证
   - CORS 配置

## 🚀 部署架构

### 生产环境

```
┌─────────────┐
│   Vercel    │ → Next.js 前端 + API Routes
└─────────────┘

┌─────────────┐
│   Railway    │ → discord.js Bot
└─────────────┘

┌─────────────┐
│   Railway    │ → Python FastAPI 服务
└─────────────┘

┌─────────────┐
│ Cloudflare   │ → D1 数据库 + Workers KV
└─────────────┘
```

### 环境变量管理

- **Vercel**: 通过 Dashboard 管理
- **Railway**: 通过 Dashboard 管理
- **Cloudflare**: 通过 Wrangler CLI 管理

## 📊 监控与日志

### 日志系统

- **Bot**: Winston (Node.js)
- **Python**: Loguru
- **前端**: Console + 错误追踪

### 监控指标

- Bot 在线状态
- API 响应时间
- 数据库查询性能
- 错误率统计

## 🔧 扩展性设计

### 水平扩展

- Bot 支持分片 (Sharding)
- Python 服务支持多实例
- 数据库支持读写分离

### 缓存策略

- Workers KV 用于热点数据
- 内存缓存用于频繁查询
- CDN 用于静态资源

## 📝 最佳实践

1. **模块化设计**
   - 命令分类管理
   - 事件处理器分离
   - 功能模块化

2. **错误处理**
   - 统一错误格式
   - 错误日志记录
   - 用户友好提示

3. **性能优化**
   - 数据库索引
   - 查询优化
   - 缓存策略

4. **安全性**
   - 最小权限原则
   - 输入验证
   - 速率限制

