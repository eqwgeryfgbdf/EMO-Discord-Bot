# EMO-Discord-Bot

Discord 机器人项目，整合前端管理界面、Bot 核心功能和 Python AI 服务。

## 🚀 技术栈

### 核心架构

- **前端**: Next.js + TailwindCSS
- **后端 API**: Next.js API Routes
- **Bot 核心**: discord.js (v14.x)
- **Python 服务**: FastAPI + discord.py
- **数据库**: Cloudflare D1 (SQLite)
- **KV 存储**: Cloudflare Workers KV
- **部署**: Vercel + Railway + Cloudflare

### 主要技术

#### Node.js 生态
- `discord.js` - Discord Bot 框架
- `next` - React 框架，支持 SSR/SSG
- `tailwindcss` - CSS 框架
- `next-auth` - 身份验证
- `axios` - HTTP 客户端

#### Python 生态
- `fastapi` - 现代 Web 框架
- `uvicorn` - ASGI 服务器
- `discord.py` - Discord Python API
- `openai` - OpenAI API 客户端
- `pandas` - 数据分析
- `matplotlib` - 数据可视化

#### 数据库与存储
- Cloudflare D1 - SQLite 边缘数据库
- Cloudflare Workers KV - 键值存储
- Cloudflare R2 - 对象存储（可选）

## 📁 项目结构

```
EMO-Discord-Bot/
├── frontend/                 # Next.js 前端
│   ├── pages/
│   │   ├── api/             # API Routes
│   │   ├── dashboard/       # 管理界面
│   │   └── auth/            # OAuth 认证
│   ├── components/
│   ├── styles/
│   └── package.json
│
├── bot/                     # Discord.js Bot
│   ├── commands/
│   │   ├── moderation/
│   │   ├── fun/
│   │   └── utility/
│   ├── events/
│   ├── utils/
│   └── index.js
│
├── python-services/         # Python 服务
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── docs/                    # 文档
├── .env.example            # 环境变量示例
└── README.md
```

## 🛠️ 开发环境设置

### 前置要求

- Node.js 18+ 
- Python 3.10+
- Git
- Discord Developer Portal 账号

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd EMO-Discord-Bot
```

2. **安装 Node.js 依赖**
```bash
npm install
cd bot && npm install
```

3. **安装 Python 依赖**
```bash
cd python-services
pip install -r requirements.txt
```

4. **配置环境变量**
```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的配置
```

5. **启动开发服务器**
```bash
# 前端
npm run dev

# Bot (新终端)
cd bot
npm run dev

# Python 服务 (新终端)
cd python-services
uvicorn main:app --reload
```

## 📚 核心功能

### Bot 功能
- 命令系统（Slash Commands、Prefix Commands）
- 服务器管理与审核
- 等级与经济系统
- 角色管理
- 音乐播放
- AI 助理集成

### Python 服务功能
- AI 助理（OpenAI API）
- 内容审核
- 数据分析与可视化
- 机器学习模型
- 垃圾消息检测

### 前端功能
- Discord OAuth2 登录
- 服务器管理界面
- 数据统计与可视化
- 设置管理

## 🔐 环境变量

详细的环境变量配置请参考 `.env.example` 文件。

## 📖 文档

- [技术栈文档](./docs/TECH_STACK.md)
- [开发指南](./docs/DEVELOPMENT.md)
- [部署指南](./docs/DEPLOYMENT.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

[添加许可证信息]

