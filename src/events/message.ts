import { Channel, Message } from "revolt.js";
import { EventBuilder } from "../classes/builders";
import { Mirai } from "../classes/mirai";
import { Event } from "typings";
import { Group } from "../classes/group";
import { MissingRequiredParameter } from "../classes/errors";

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
        const { data } = command;
        if (data.owner && client._options?.owners?.every((id: string) => id != message.author_id)) return;
        if (data.subcommands.length === 0 && data.params.length === 0) command.code({ client, message, args, params });
        else if (data.subcommands.length > 0 && data.params.length > 0) return;
        else if (data.params.length > 0) {
            for (let i = 0; i < data.params.length; i++) {
                const param = data.params.at(i);
                if (param.required && !args.at(i)) {
                    client.emit("commandError", new MissingRequiredParameter(command.data, param, message.channel as Channel));
                    return;
                } else params.set(param.name, data.params.length === 1 ? args.join(" ") : args.at(i));
            }
            command.code({ client, message, args, params });
        }
        
    }
};