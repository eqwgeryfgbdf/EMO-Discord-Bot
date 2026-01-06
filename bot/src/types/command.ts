import {
  ChatInputCommandInteraction,
  Message,
  SlashCommandBuilder,
} from 'discord.js';

/**
 * 命令執行結果
 */
export interface CommandResult {
  success: boolean;
  message?: string;
  error?: string;
}

/**
 * 命令介面
 */
export interface Command {
  /**
   * 命令名稱
   */
  name: string;

  /**
   * 命令描述
   */
  description: string;

  /**
   * Slash Command 定義
   */
  data?: SlashCommandBuilder;

  /**
   * 執行 Slash Command
   */
  executeSlash?: (
    interaction: ChatInputCommandInteraction
  ) => Promise<CommandResult | void>;

  /**
   * 執行 Prefix Command
   */
  executePrefix?: (
    message: Message,
    args: string[]
  ) => Promise<CommandResult | void>;

  /**
   * 是否需要管理員權限
   */
  requiresAdmin?: boolean;

  /**
   * 是否僅限於伺服器（非 DM）
   */
  guildOnly?: boolean;
}

