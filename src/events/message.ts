import { Channel, Member, Message, Server, User } from "revolt.js";
import { CommandBuilder, EventBuilder } from "../classes/builders";
import { Mirai } from "../classes/mirai";
import { Command, Event, MakedParameter } from "typings";
import { Group } from "../classes/group";
import { InvalidBooleanParam, InvalidChannelParam, InvalidNumberParam, InvalidUserParam, MissingRequiredParameter } from "../classes/errors";
import { Util } from "../classes/util";

const util = Util;

async function ParseArgs(args: string[], client: Mirai, params: MakedParameter[], cacher: Group<string, unknown>, command: CommandBuilder, message: Message): Promise<boolean> {
    let final = false;
    for (let i = 0; i < params.length; i++) {
        const param = params.at(i);
        if (param?.required && !args.at(i)) {
            client.emit("commandError", new MissingRequiredParameter(command, param, message.channel as Channel));
            final = false;
        } else {
            switch (param?.type) {
            case "string":
                cacher.set(param?.name, params.length === 1 ? args.join(" ") : args.at(i));
                break;
            case "user":
                if (!(await util.getUser(client, args.at(i)!.toString()))) {
                    client.emit("commandError", new InvalidUserParam(command, param));
                    return false;
                }
                cacher.set(param?.name, await util.getUser(client, args.at(i)!.toString()));
                break;
            case "number":
                if (isNaN(Number(args.at(i)))) {
                    client.emit("commandError", new InvalidNumberParam(command, param));
                    return false;
                }
                cacher.set(param?.name, Number(args.at(i)));
                break;
            case "channel":
                if (!(await util.getChannel(client, args.at(i)!.toString()))) {
                    client.emit("commandError", new InvalidChannelParam(command, param));
                    return false;
                }
                cacher.set(param?.name, await util.getChannel(client, args.at(i)!.toString()));
                break;
            case "boolean":
                if (!(["yes", "true", "si", "1"].includes(args.at(i)!)) && !(["no", "false", "0"].includes(args.at(i)!))) {
                    client.emit("commandError", new InvalidBooleanParam(command, param));
                    return false;
                }
                cacher.set(param.name, ["yes", "true", "si", "1"].includes(args.at(i)!));
                break;
            }
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
            params = new Group<string, string | User | Server | Member>();
        if (!command) return;
        const { data } = command;
        if (data.owner && client._options?.owners?.every((id: string) => id != message.author_id)) return;
        if (data.subcommands.length === 0 && data.params.length === 0) command.code({ client, message, args, params });
        else if (data.subcommands.length > 0 && data.params.length > 0) return;
        else if (data.params.length > 0) {
            const res = await ParseArgs(args, client, data.params, params, data, message);
            if (!res) return;
            command.code({ client, message, args, params, util });
        } else if (data.subcommands.length > 0) {
            const [subcommand_name, ...elargs] = args;
            const subcommand: Command = data.subcommands.find((sub: Command) => sub.data.name === subcommand_name.toLowerCase());
            if (!subcommand) return;
            const res = await ParseArgs(elargs, client, subcommand.data.params, params, subcommand.data, message);
            if (!res) return;
            args = elargs;
            subcommand.code?.({ client, message, args, params, util });
        }
    }
};