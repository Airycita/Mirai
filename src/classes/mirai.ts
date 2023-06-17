import { Group } from "./group";
import { Client } from "revolt.js";
import { Command, MiraiOptions } from "typings";

export class Mirai extends Client {
    public commands: Group<string, Command> = new Group;
    public _options: MiraiOptions | null = null;
    public color = "FFFFFF";

    /**
     * Set client options.
     * @param options Options object.
     */
    construct(options: MiraiOptions) {
        this._options = options;
    }
}