import { Group } from '../structures/group';
import { CommandBuilder, EventBuilder } from '../structures/builders';
import { Mirai } from '../structures/mirai';
import { BaseModule, MakedParameter } from '@types';
import { Channel, Message } from 'revolt.js';

export const data: BaseModule<EventBuilder> = {
    data: new EventBuilder()
        .setName('message')
        .setDescription('Triggered when a message is sended.')
        .setOnce(false),
    code: async (bot: Mirai, message: Message) => {
        if (message.author?.bot) return;
        let args = bot.commands.parser.quotedArguments(message.content?.slice(bot.prefix?.length).trim() ?? '');
        const command_name = args.shift()?.toLowerCase();
        const command = bot.commands.cache.get(command_name);
        const params = new Group<string, MakedParameter>();
        if (!command) return;
        const found = await bot.commands.parser.getData(bot, `${command_name}`, command, args, params, message.channel as Channel);
        if (!found) return;
        if (found.error.status === true) { bot.itself.emit("commandError", found.error.data); return; }
        args = found.args
        found.command.code?.({ args, bot, message, params })
    }
}