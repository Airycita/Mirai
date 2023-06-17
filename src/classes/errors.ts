import { CommandBuilder } from "./builders";
import { MakedParameter } from "typings";
import { Channel } from "revolt.js";

export class MissingRequiredParameter {
    public channel: Channel;
    public command: CommandBuilder;
    public param: MakedParameter;
    constructor(command: CommandBuilder, param: MakedParameter, channel: Channel) {
        this.channel = channel;
        this.command = command;
        this.param = param;
    }
}