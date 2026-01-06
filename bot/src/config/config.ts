import dotenv from 'dotenv';

dotenv.config();

/**
 * Bot 配置介面
 */
export interface BotConfig {
  token: string;
  clientId: string;
  guildId?: string;
  prefix: string;
  pythonServiceUrl?: string;
}

/**
 * 從環境變數載入配置
 */
export function loadConfig(): BotConfig {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.CLIENT_ID;
  const guildId = process.env.GUILD_ID;
  const prefix = process.env.PREFIX || '!';
  const pythonServiceUrl = process.env.PYTHON_SERVICE_URL;

  if (!token) {
    throw new Error('DISCORD_BOT_TOKEN 環境變數未設定');
  }

  if (!clientId) {
    throw new Error('CLIENT_ID 環境變數未設定');
  }

  return {
    token,
    clientId,
    guildId,
    prefix,
    pythonServiceUrl,
  };
}

export const config = loadConfig();

