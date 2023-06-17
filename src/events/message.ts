import { Message } from "revolt.js";
import { EventBuilder } from "../classes/builders";
import { Mirai } from "../classes/mirai";
import { Event } from "typings";
import { Group } from "../classes/group";

export const data: Event = {
    data: new EventBuilder().setName("message"),
    code: async (client: Mirai, message: Message) => {
        if (message.author?.bot) return;
        if (!message.content?.startsWith(client._options?.prefix as string)) return;
        const prefix = client._options?.prefix,
            args = message.content?.slice(prefix?.length).trim().split(/ +/g),
            command_name = args?.shift()?.toLowerCase(),
            command = client.commands.get(command_name),
            params = new Group<string, unknown>();
        if (!command) return;
        if (command.data.owner && client._options?.owners?.every((id: string) => id != message.author_id)) return;
        if (command.data.subcommands.length === 0 && command.data.params.length === 0) command.code({ client, message, args, params });
        else if (command.data.subcommands.length > 0 && command.data.params.length > 0) return;
        else if (command.data.params.length) {
            for (let i = 0; i < command.data.params.length; i++) {
                const param = command.data.params.at(i);
                if (param.required && !args.at(i)) {
                    await message.channel?.sendMessage("Parámetro requerido faltante: " + param.name);
                    return;
                } else params.set(param.name, command.data.params.length === 1 ? args.join(" ") : args.at(i));
            }
            command.code({ client, message, args, params });
        }
        
    }
};