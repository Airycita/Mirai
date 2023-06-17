import { Channel, Message } from "revolt.js";
import { CommandBuilder, EventBuilder } from "../classes/builders";
import { Mirai } from "../classes/mirai";
import { Event, MakedParameter } from "typings";
import { Group } from "../classes/group";
import { MissingRequiredParameter } from "../classes/errors";

function ParseArgs(args: string[], client: Mirai, params: MakedParameter[], cacher: Group<string, unknown>, command: CommandBuilder, message: Message): boolean {
    let final = false;
    for (let i = 0; i < params.length; i++) {
        const param = params.at(i);
        if (param?.required && !args.at(i)) {
            client.emit("commandError", new MissingRequiredParameter(command, param, message.channel as Channel));
            final = false;
        } else {
            cacher.set(param?.name, params.length === 1 ? args.join(" ") : args.at(i));
            final = true;
        }
    }
    return final;
}

export const data: Event = {
    data: new EventBuilder().setName("message"),
    code: async (client: Mirai, message: Message) => {
        if (message.author?.bot) return;
        if (!message.content?.startsWith(client._options?.prefix as string)) return;
        const prefix = client._options?.prefix;
        let args = message.content?.slice(prefix?.length).trim().split(/ +/g);
        const command_name = args?.shift()?.toLowerCase(),
            command = client.commands.get(command_name),
            params = new Group<string, unknown>();
        if (!command) return;
        const { data } = command;
        if (data.owner && client._options?.owners?.every((id: string) => id != message.author_id)) return;
        if (data.subcommands.length === 0 && data.params.length === 0) command.code({ client, message, args, params });
        else if (data.subcommands.length > 0 && data.params.length > 0) return;
        else if (data.params.length > 0) {
            const res = ParseArgs(args, client, data.params, params, data, message);
            if (!res) return;
            command.code({ client, message, args, params });
        } else if (data.subcommands.length > 0) {
            const [subcommand_name, ...elargs] = args;
            const subcommand = data.subcommands.find((sub) => sub.data.name === subcommand_name.toLowerCase());
            const res = ParseArgs(elargs, client, subcommand.data.params, params, subcommand.data, message);
            if (!res) return;
            args = elargs;
            subcommand.code({ client, message, args, params });
        }
    }
};