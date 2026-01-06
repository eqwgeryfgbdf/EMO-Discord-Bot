import { Collection } from 'discord.js';
import { Command } from '../types/command';
import { pingCommand } from './utility/ping';
import { helpCommand } from './utility/help';

/**
 * 命令註冊表
 */
export const commands = new Collection<string, Command>();

// 註冊所有命令
commands.set(pingCommand.name, pingCommand);
commands.set(helpCommand.name, helpCommand);

/**
 * 獲取所有 Slash Commands 的定義
 */
export function getSlashCommands() {
  return Array.from(commands.values())
    .map((cmd) => cmd.data)
    .filter((data) => data !== undefined);
}

