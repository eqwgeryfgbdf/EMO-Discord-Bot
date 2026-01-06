import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config } from './config/config';
import { logger } from './utils/logger';
import { handleReady } from './events/ready';
import { handleInteractionCreate } from './events/interactionCreate';
import { handleMessageCreate } from './events/messageCreate';

/**
 * 創建 Discord 客戶端
 */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel],
});

// 註冊事件處理器
handleReady(client);
handleInteractionCreate(client);
handleMessageCreate(client);

// 錯誤處理
client.on('error', (error) => {
  logger.error('Discord 客戶端錯誤:', error);
});

process.on('unhandledRejection', (error) => {
  logger.error('未處理的 Promise 拒絕:', error);
});

process.on('uncaughtException', (error) => {
  logger.error('未捕獲的異常:', error);
  process.exit(1);
});

// 啟動 Bot
client
  .login(config.token)
  .then(() => {
    logger.info('正在登入 Discord...');
  })
  .catch((error) => {
    logger.error('登入失敗:', error);
    process.exit(1);
  });

