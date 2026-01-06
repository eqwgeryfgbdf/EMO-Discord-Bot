import { Client, Events } from 'discord.js';
import { logger } from '../utils/logger';
import { getSlashCommands } from '../commands';

/**
 * Bot 就緒事件處理器
 */
export function handleReady(client: Client) {
  client.once(Events.ClientReady, async (readyClient) => {
    logger.info(`✅ Bot 已登入為 ${readyClient.user.tag}`);

    try {
      // 註冊 Slash Commands
      const commands = getSlashCommands();
      
      if (commands.length > 0) {
        // 如果設定了 GUILD_ID，則僅在該伺服器註冊（開發模式）
        if (process.env.GUILD_ID) {
          const guild = readyClient.guilds.cache.get(process.env.GUILD_ID);
          if (guild) {
            await guild.commands.set(commands);
            logger.info(
              `✅ 已在伺服器 ${guild.name} 註冊 ${commands.length} 個 Slash Commands`
            );
          }
        } else {
          // 全域註冊（生產模式）
          await readyClient.application?.commands.set(commands);
          logger.info(
            `✅ 已全域註冊 ${commands.length} 個 Slash Commands`
          );
        }
      }

      // 設定 Bot 狀態
      readyClient.user.setActivity('使用 /help 查看命令', {
        type: 0, // Playing
      });

      logger.info('🚀 Bot 已準備就緒');
    } catch (error) {
      logger.error('註冊 Slash Commands 時發生錯誤:', error);
    }
  });
}

