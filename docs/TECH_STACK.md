# 技术栈文档

本文档详细说明 EMO-Discord-Bot 项目使用的技术栈和工具。

## 📊 核心技术架构

### 前端技术栈

#### Next.js
- **版本**: 14.1.0+
- **用途**: React 框架，提供 SSR/SSG 支持
- **优势**: 
  - 与 Vercel 无缝集成，一键部署
  - 内置 API Routes，简化架构
  - 优秀的开发体验

#### TailwindCSS
- **版本**: 3.4.1+
- **用途**: 实用优先的 CSS 框架
- **优势**: 
  - 快速开发 UI
  - 响应式设计
  - 高度可定制

#### NextAuth.js
- **版本**: 4.24.5+
- **用途**: Discord OAuth2 身份验证
- **功能**: 
  - 安全的会话管理
  - Discord 登录集成
  - 权限控制

### Bot 核心

#### discord.js
- **版本**: 14.14.1+
- **用途**: Discord Bot 开发框架
- **特性**:
  - 完整的 Discord API 支持
  - TypeScript 支持
  - 事件驱动架构
  - Slash Commands 支持
  - 按钮和菜单交互

#### 核心功能模块
- **命令系统**: Slash Commands、Prefix Commands、Context Menu
- **事件处理**: messageCreate、guildMemberAdd、interactionCreate
- **语音支持**: @discordjs/voice（音乐播放）
- **嵌入消息**: EmbedBuilder
- **交互组件**: Button、Select Menu、Modal

### Python 服务

#### FastAPI
- **版本**: 0.109.0+
- **用途**: 现代、快速的 Web 框架
- **优势**:
  - 自动 API 文档生成
  - 类型提示支持
  - 异步支持
  - 高性能

#### discord.py
- **版本**: 2.3.2+
- **用途**: Discord Python API 封装
- **应用场景**: 
  - AI/ML 功能集成
  - 复杂数据处理
  - 高级 Bot 功能

#### OpenAI API
- **版本**: 1.12.0+
- **用途**: AI 功能集成
- **功能**:
  - ChatGPT 对话
  - DALL-E 图像生成
  - 内容审核
  - 情感分析

#### 数据处理库
- **pandas**: 数据分析与处理
- **numpy**: 数值计算
- **matplotlib**: 数据可视化
- **seaborn**: 统计可视化

### 数据库与存储

#### Cloudflare D1
- **类型**: SQLite 边缘数据库
- **优势**:
  - 全球边缘部署，低延迟
  - 自动备份与版本控制
  - 免费额度：10 GB 存储、每日 100K 读取
  - SQLite 兼容，熟悉的 SQL 语法

#### Cloudflare Workers KV
- **用途**: 键值存储
- **应用场景**:
  - Session 存储
  - 缓存频繁查询
  - 临时数据存储

#### Cloudflare R2
- **用途**: 对象存储（可选）
- **应用场景**: 
  - 文件存储
  - 图片存储
  - 静态资源

### 部署平台

#### Vercel
- **用途**: 前端和 Next.js API Routes 部署
- **优势**:
  - 免费方案可用
  - 自动 HTTPS
  - 全球 CDN
  - 零配置部署

#### Railway
- **用途**: Python 服务和 Bot 部署
- **优势**:
  - 免费试用额度
  - 支持 Docker
  - 自动部署
  - 环境变量管理

#### Cloudflare
- **用途**: 数据库和存储服务
- **服务**:
  - D1 数据库
  - Workers KV
  - R2 存储
  - Workers（无服务器计算）

## 🛠️ 开发工具

### 代码编辑器
- **Visual Studio Code** (推荐)
- **IntelliJ IDEA** (Java)
- **PyCharm** (Python)

### 版本控制
- **Git**
- **GitHub / GitLab**

### 包管理器
- **npm / yarn** (Node.js)
- **pip** (Python)

### 其他工具
- **Docker** (容器化)
- **Wrangler** (Cloudflare CLI)
- **Vercel CLI**

## 📚 核心功能开发技术

### 1. 命令系统
- **技术要点**:
  - Slash Commands（斜线命令）
  - Prefix Commands（前缀命令）
  - Context Menu Commands（右键菜单命令）
  - 命令参数解析
  - 权限检查

### 2. 事件处理
- **常见事件**:
  - `messageCreate` - 消息建立
  - `guildMemberAdd` - 成员加入
  - `interactionCreate` - 交互建立
  - `voiceStateUpdate` - 语音状态更新
  - `ready` - 机器人就绪

### 3. 数据库整合
- **ORM 工具**:
  - Prisma (TypeScript)
  - TypeORM (TypeScript)
  - SQLAlchemy (Python)

### 4. API 整合
- **常见整合**:
  - Twitch API (直播通知)
  - YouTube Data API (视频通知)
  - Twitter API (推文通知)
  - OpenAI API (ChatGPT 整合)
  - Weather API (天气查询)
  - 翻译 API (Google Translate、DeepL)

### 5. 音乐播放
- **技术堆栈**:
  - @discordjs/voice (Discord.js 语音支持)
  - ytdl-core (YouTube 下载)
  - play-dl (多平台音频)
  - FFmpeg (音频处理)

### 6. 安全与最佳实践
- **Token 保护**: 使用环境变量 (.env)
- **权限管理**: 最小权限原则
- **输入验证**: 防止 SQL Injection、XSS 攻击
- **速率限制**: 遵守 Discord API Rate Limits

## 🔗 相关资源

### 官方文档
- [Discord Developer Docs](https://discord.com/developers/docs)
- [discord.js Guide](https://discordjs.guide/)
- [discord.py Documentation](https://discordpy.readthedocs.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

### 学习资源
- Discord API Server (官方 Discord)
- Stack Overflow
- GitHub 开源项目
- YouTube 教学视频

