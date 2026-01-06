# 开发指南

本文档提供 EMO-Discord-Bot 项目的开发指南和最佳实践。

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- Python 3.10+
- Git
- Discord Developer Portal 账号

### 项目设置

1. **克隆仓库**
```bash
git clone <repository-url>
cd EMO-Discord-Bot
```

2. **安装依赖**
```bash
# 安装前端依赖
npm install

# 安装 Bot 依赖
cd bot && npm install && cd ..

# 安装 Python 依赖
cd python-services
pip install -r requirements.txt
cd ..
```

3. **配置环境变量**

复制 `.env.example` 并填入必要的配置：
```bash
cp .env.example .env
```

编辑 `.env` 文件，填入以下信息：
```env
# Discord Bot
DISCORD_BOT_TOKEN=your_bot_token
CLIENT_ID=your_client_id
GUILD_ID=your_guild_id

# Next.js
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
D1_DATABASE_ID=your_database_id

# Python Service
PYTHON_SERVICE_URL=http://localhost:8000
OPENAI_API_KEY=your_openai_key
```

4. **启动开发服务器**

```bash
# 终端 1: 启动 Next.js 前端
npm run dev

# 终端 2: 启动 Discord Bot
cd bot
npm run dev

# 终端 3: 启动 Python 服务
cd python-services
uvicorn main:app --reload
```

## 📁 项目结构

```
EMO-Discord-Bot/
├── frontend/                 # Next.js 前端
│   ├── pages/
│   │   ├── api/             # API Routes
│   │   │   ├── auth/        # 认证相关
│   │   │   ├── bot/         # Bot API
│   │   │   └── data/        # 数据 API
│   │   ├── dashboard/       # 管理界面
│   │   └── auth/            # OAuth 认证页面
│   ├── components/          # React 组件
│   │   ├── ui/             # UI 组件
│   │   └── layout/         # 布局组件
│   ├── lib/                # 工具函数
│   ├── styles/             # 样式文件
│   └── package.json
│
├── bot/                     # Discord.js Bot
│   ├── commands/           # 命令模块
│   │   ├── moderation/     # 审核命令
│   │   ├── fun/            # 娱乐命令
│   │   └── utility/        # 工具命令
│   ├── events/             # 事件处理器
│   │   ├── ready.js        # Bot 就绪事件
│   │   ├── interactionCreate.js
│   │   └── messageCreate.js
│   ├── utils/             # 工具函数
│   │   ├── database.js     # 数据库工具
│   │   ├── logger.js       # 日志工具
│   │   └── validators.js    # 验证工具
│   ├── config/             # 配置文件
│   │   └── config.js
│   └── index.js            # Bot 入口文件
│
├── python-services/         # Python 服务
│   ├── main.py             # FastAPI 入口
│   ├── routers/             # API 路由
│   │   ├── ai.py           # AI 相关路由
│   │   ├── analytics.py    # 数据分析路由
│   │   └── moderation.py   # 内容审核路由
│   ├── services/            # 业务逻辑
│   │   ├── openai_service.py
│   │   └── data_service.py
│   ├── models/              # 数据模型
│   ├── utils/               # 工具函数
│   └── requirements.txt
│
├── docs/                    # 文档
│   ├── TECH_STACK.md
│   ├── DEVELOPMENT.md
│   └── DEPLOYMENT.md
│
├── .env.example            # 环境变量示例
├── .gitignore
└── README.md
```

## 💻 开发规范

### 代码风格

#### JavaScript/TypeScript
- 使用 **camelCase** 命名变量和函数
- 使用 **PascalCase** 命名类型和组件
- 文件名称使用 **kebab-case**
- 使用 ESLint 和 Prettier 保持代码一致性

#### Python
- 遵循 PEP 8 代码风格
- 使用 **snake_case** 命名函数和变量
- 使用 **PascalCase** 命名类
- 使用类型提示 (Type Hints)

### 错误处理

- **始终显式处理错误**
- **避免静默捕获**
- **返回描述性错误消息**

示例：
```typescript
try {
  const result = await someAsyncOperation();
  return { success: true, data: result };
} catch (error) {
  console.error('操作失败:', error);
  return { 
    success: false, 
    error: error instanceof Error ? error.message : '未知错误' 
  };
}
```

### 类型安全

- **使用强类型 (TypeScript)**
- **优先使用函数式组件**
- **使用一致的命名约定**
- **包含简要文档注释**

示例：
```typescript
/**
 * 获取用户信息
 * @param userId - Discord 用户 ID
 * @returns 用户信息对象
 */
async function getUserInfo(userId: string): Promise<UserInfo> {
  // 实现
}
```

## 🧪 测试

### 单元测试

```bash
# Node.js 测试
npm test

# Python 测试
cd python-services
pytest
```

### 集成测试

在测试 Discord 服务器中测试 Bot 功能。

## 📝 Git 工作流

### 分支策略

- `main` - 生产环境代码
- `develop` - 开发分支
- `feature/*` - 功能分支
- `fix/*` - 修复分支

### 提交信息

使用清晰的提交信息：
```
feat: 添加等级系统
fix: 修复音乐播放错误
docs: 更新 README
refactor: 重构命令处理器
```

## 🔍 调试

### Bot 调试

```bash
# 启用详细日志
DEBUG=* npm run dev

# 使用 Node.js 调试器
node --inspect bot/index.js
```

### Python 服务调试

```bash
# 启用调试模式
uvicorn main:app --reload --log-level debug
```

## 📚 常用命令

### 前端
```bash
npm run dev          # 开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查
```

### Bot
```bash
npm run dev          # 开发模式
npm run start        # 生产模式
```

### Python
```bash
uvicorn main:app --reload    # 开发服务器
python -m pytest             # 运行测试
```

## 🐛 常见问题

### Bot 无法连接
- 检查 `DISCORD_BOT_TOKEN` 是否正确
- 确认 Bot 已添加到服务器
- 检查网络连接

### 数据库连接失败
- 确认 Cloudflare D1 配置正确
- 检查 `CLOUDFLARE_API_TOKEN` 是否有效
- 验证数据库 ID 是否正确

### Python 服务无法启动
- 检查 Python 版本 (需要 3.10+)
- 确认所有依赖已安装
- 检查端口是否被占用

## 📖 相关文档

- [技术栈文档](./TECH_STACK.md)
- [部署指南](./DEPLOYMENT.md)
- [Discord.js 文档](https://discordjs.guide/)
- [FastAPI 文档](https://fastapi.tiangolo.com/)

