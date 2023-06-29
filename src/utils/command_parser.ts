import { CommandBuilder } from "../structures/builders"
import { BaseModule, MakedParameter } from "@types"
import * as Errors from "../structures/errors";
import { Group } from "../structures/group";
import { Mirai } from "../structures/mirai";
import { Getters } from "./getters";
import { Channel } from "revolt.js";

export class CommandParser {

    /**
     * Returns the data of the found command.
     * @param name Parent command name.
     */
    async getData(client: Mirai, name: string, command: BaseModule<CommandBuilder>, args: string[], param_cacher: Group<string, MakedParameter>, channel: Channel) {
        const { data } = command, { childs, parameters } = data;
        if (childs.size > 0 && parameters.size > 0) return;
        else if (childs.size > 0) {
            const [sub_name, ...elargs] = args;
            const subcommand: BaseModule<CommandBuilder> = childs.get(sub_name.toLowerCase());
            if (!subcommand) return;
            if (subcommand.data.parameters.size > 0) return await this.parseArgs(client, subcommand.data.parameters, param_cacher, subcommand, elargs, channel);
            return { command: subcommand, args: elargs, error: { status: false, data: {} } };
        } else if (parameters.size > 0) {
            const d = await this.parseArgs(client, command.data.parameters, param_cacher, command, args, channel);
            return d;
        } else return { command, args, error: { status: false, data: {} } };
    }

    async parseArgs(client: Mirai, parameters: Group<string, MakedParameter>, param_cacher: Group<string, MakedParameter>, command: BaseModule<CommandBuilder>, args: string[], channel: Channel) {
        let d = { command, args, error: { status: false, data: {} } }
        const new_params = parameters.toArray<MakedParameter>();
        for (let i = 0; i <= new_params.length; i++) {
            const param = new_params.at(i);
            if (param?.required && !(args.at(i))) {
                d.error.status = true
                d.error.data = new Errors.MissingRequiredParam(channel, param);
                break;
            }
            switch(param?.type) {
                case "boolean":
                    if (!(["true", "yes", "si", "1"].includes(`${args.at(i)}`)) && !(["false", "no", "0"].includes(`${args.at(i)}`))) {
                        d.error.status = true
                        d.error.data = new Errors.InvalidBooleanParam(channel, param);
                        break;
                    }
                    param_cacher.set(param.name, ["true", "yes", "si", "1"].includes(`${args.at(i)}`))
                    break;
                case "channel":
                    const chn = await Getters.getChannel(client, `${args.at(i)}`);
                    if (!chn) {
                        d.error.status = true
                        d.error.data = new Errors.InvalidChannelParam(channel, param);
                        break;
                    }
                    param_cacher.set(param.name, chn);
                    break;
                case "number":
                    if (isNaN(Number(args.at(i)))) {
                        d.error.status = true
                        d.error.data = new Errors.InvalidNumberParam(channel, param);
                        break;
                    }
                    param_cacher.set(param.name, Number(args.at(i)));
                    break;
                case "user":
                    const user = await Getters.getUser(client, `${args.at(i)}`);
                    if (!user) {
                        d.error.status = true
                        d.error.data = new Errors.InvalidUserParam(channel, param);
                        break;
                    }
                    param_cacher.set(param.name, user);
                    break;
                default:
                    if (args.at(i) && new_params.length > i) param_cacher.set(param?.name, args.slice(i).join(" "));
                    else if (args.at(i) && i < new_params.length) param_cacher.set(param?.name, args.at(i));
                    break;
            }
            if (d.error.status) break;
        }
        return d;
    }

    /**
     * Split the given text into args.
     * @param text The text to split into args.
     * @returns 
     */
    quotedArguments(text: string): string[] {
        const args: string[] = [], chars = [...text.split("\n").map((char: string) => char.trim()).join("\n")]
        let writing = "", inside = false, type = ""
        for (const char of chars) {
            if (char === "\"" || char === "'") {
                if (inside && char === type) {
                    inside = false
                    type = ""
                } else if (!inside) {
                    inside = true
                    type = char
                } else writing += char
            } else if (char === " " && !inside) {
                if (writing !== "") {
                    args.push(writing)
                    writing = ""
                }
            } else writing += char
        }
        if (writing !== "") args.push(writing)
        return args
    }
}