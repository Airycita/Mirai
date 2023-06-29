import { BaseModule, MakedParameter, ParameterData } from "@types";
import { SendableEmbed } from "revolt-api";
import { Group } from "./group";

export class CommandBuilder {
    name: string | null = null;
    description: string | null = null;
    category: string | null = null;
    childs: Group<string, this> = new Group;
    parameters: Group<string, MakedParameter> = new Group;

    /**
     * Set the command name.
     * @param n name => Command name
     * @returns 
     */
    setName(n: string) {
        this.name = n;
        return this;
    }

    /**
     * Set the command description.
     * @param d description => Command description.
     * @returns 
     */
    setDescription(d: string) {
        this.description = d;
        return this;
    }

    /**
     * Set the command category.
     * @param c category => Command category.
     * @returns 
     */
    setCategory(c: string) {
        this.category = c;
        return this;
    }

    /**
     * Add a subcommand to the parent command.
     * @param options 
     * @returns 
     */
    addSubCommand(options: BaseModule<this>) {
        this.childs.set(options.data.name, options);
        return this;
    }

    /**
     * Append parameters to the command.
     * @param option Parameter callback.
     */
    appendParameters(option: (d: Parameter) => Parameter) {
        const param = option(new Parameter(this));
        return this;
    }
}

export class EventBuilder {
    name: string | null = null;
    description: string | null = null;
    once: boolean | null = null;

    /**
     * Set the command name.
     * @param n name => Command name
     * @returns 
     */
    setName(n: string) {
        this.name = n;
        return this;
    }

    /**
     * Set the command description.
     * @param d description => Command description.
     * @returns 
     */
    setDescription(d: string) {
        this.description = d;
        return this;
    }

    /**
     * Selects whether the event must be called once or not.
     * @param o once => Event once type.
     * @returns 
     */
    setOnce(o: boolean) {
        this.once = o;
        return this;
    }
}

class Parameter {
    private command: CommandBuilder
    private _idx: number = 0;
    constructor(c: CommandBuilder) {
        this.command = c;
    }

    addBooleanOption(options: ParameterData) {
        this.command.parameters.set(options.name, { ...options, index: this._idx, type: "boolean" });
        return this;
    }

    addChannelOption(options: ParameterData) {
        this.command.parameters.set(options.name, { ...options, index: this._idx, type: "channel" });
        return this;
    }

    addNumberOption(options: ParameterData) {
        this.command.parameters.set(options.name, { ...options, index: this._idx, type: "number" });
        return this;
    }

    addStringOption(options: ParameterData) {
        this.command.parameters.set(options.name, { ...options, index: this._idx, type: "string" });
        return this;
    }

    addUserOption(options: ParameterData) {
        this.command.parameters.set(options.name, { ...options, index: this._idx, type: "user" });
        return this;
    }
}

export class EmbedBuilder {
    /**
     * Class taken from "revolt.io"
     * https://github.com/revolt-io/revolt.io/blob/stable/src/structures/MessageEmbed.ts
     */
    #url?: string;
    #title?: string;
    #description?: string;
    #icon_url?: string;
    #color?: string;
    #media?: string;

    setTitle(title: string): this {
        this.#title = title;
        return this;
    }

    setIcon(iconURL: string): this {
        this.#icon_url = iconURL;
        return this;
    }

    setColor(color: string): this {
        this.#color = color;
        return this;
    }

    setDescription(description: string): this {
        this.#description = description;
        return this;
    }

    setURL(url: string): this {
        this.#url = url;
        return this;
    }

    setMedia(media: string): this {
        this.#media = media;
        return this;
    }

    toJSON(): SendableEmbed {
        return {
            title: this.#title,
            description: this.#description,
            url: this.#url,
            icon_url: this.#icon_url,
            colour: this.#color,
            media: this.#media,
        };
    }
}